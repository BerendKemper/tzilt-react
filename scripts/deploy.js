import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(childProcess.exec);
loadEnvFile(path.resolve(`.env.local`));
const configPath = path.resolve(`config.json`);
const config = JSON.parse(await fs.promises.readFile(configPath, `utf-8`));
const cloudflareApiToken = process.env.CLOUDFLARE_API_TOKEN ?? ``;
const cloudflareZoneId = process.env.CLOUDFLARE_ZONE_ID ?? ``;

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;

  const fileContent = fs.readFileSync(filePath, `utf-8`);
  for (const rawLine of fileContent.split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith(`#`)) continue;

    const separatorIndex = line.indexOf(`=`);
    if (separatorIndex <= 0) continue;

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    if (!key || process.env[key] !== undefined) continue;

    process.env[key] = value.replace(/^(['"])(.*)\1$/u, `$2`);
  }
}

async function run(command) {
  const { stdout, stderr } = await execAsync(command);
  return { stdout, stderr };
}

async function runQuiet(command) {
  try {
    await execAsync(command);
    return true;
  } catch {
    return false;
  }
}

function toSiteUrl(relativePath) {
  return new URL(relativePath, `https://${config.siteDomain}`).toString();
}

const application = {
  async currentBranch() {
    const { stdout, stderr } = await run(`git branch --show-current`);
    if (stderr) throw new Error(`Unexpected error at "git branch --show-current"\n${stderr}`);
    return stdout.trim();
  },

  /** Validate and build the static site before touching gh-pages. */
  async typecheck() {
    const { stdout, stderr } = await run(`npm run typecheck`);
    console.log(`typecheck`, stdout, stderr);
  },

  async build() {
    const { stdout, stderr } = await run(`npm run build`);
    console.log(`build`, stdout, stderr);
  },

  /** Add the custom-domain marker into dist before publishing. */
  async makeCNAME() {
    // GitHub Pages needs a CNAME file in the published branch root.
    const cnamePath = path.join(`dist`, `CNAME`);
    await fs.promises.mkdir(path.dirname(cnamePath), { recursive: true });
    await fs.promises.writeFile(cnamePath, config.siteDomain, `utf-8`);
  },

  async makeDeployGitIgnore() {
    // gh-pages should ignore local/dev artifacts in its branch root before we
    // stage the generated site output.
    const gitIgnoreContent = [
      `dist/`,
      `node_modules/`,
      `package-lock.json`,
      `.vscode/`,
      `.vite/`,
      `.env`,
      `.env.*`,
      ``
    ].join(`\n`);

    await fs.promises.writeFile(`.gitignore`, gitIgnoreContent, `utf-8`);
  },

  async hasLocalBranch(branchName) {
    return runQuiet(`git show-ref --verify --quiet refs/heads/${branchName}`);
  },

  async hasAnyCommit() {
    return runQuiet(`git rev-parse --verify HEAD`);
  },

  /** Switch to gh-pages or create it on first deploy. */
  async ensureGhPagesBranch() {
    const hasGhPages = await this.hasLocalBranch(`gh-pages`);
    if (hasGhPages) {
      // Normal deploy path: reuse the existing publish branch.
      await run(`git checkout gh-pages`);
      return;
    }

    const hasCurrentCommit = await this.hasAnyCommit();
    if (hasCurrentCommit) {
      // First deploy path: create a history-light orphan branch and clear the
      // tracked main-branch files from this working tree before copying dist.
      await run(`git checkout --orphan gh-pages`);
      await run(`git rm -rf .`);
      return;
    }

    // Extra safety for a repo with no commits yet.
    await run(`git checkout --orphan gh-pages`);
  },

  async stageBuiltSite() {
    const entries = await fs.promises.readdir(`.`, { withFileTypes: true });
    await Promise.all(
      entries
        .filter(
          entry =>
            entry.name !== `.git` &&
            entry.name !== `dist` &&
            entry.name !== `node_modules` &&
            entry.name !== `.vscode` &&
            !entry.name.startsWith(`.env`)
        )
        .map(entry => fs.promises.rm(entry.name, {
          recursive: entry.isDirectory(),
          force: true
        }))
    );
    await fs.promises.cp(`dist`, `.`, { recursive: true });
    await this.makeDeployGitIgnore();
    await run(`git add .`);
  },

  /** Replace the existing deploy commit, or create the first one. */
  async createOrReplaceDeployCommit() {
    const hasCommit = await this.hasAnyCommit();
    if (hasCommit) {
      // Keep gh-pages as a single disposable deploy commit instead of growing
      // history over time.
      await run(`git reset --soft HEAD`);
      await this.stageBuiltSite();
      await run(`git commit --amend -m "Deploy site"`);
      return;
    }

    // First publish on a brand-new gh-pages branch.
    await this.stageBuiltSite();
    await run(`git commit -m "Deploy site"`);
  },

  async purgeCloudflareCache() {
    if (!cloudflareApiToken || !cloudflareZoneId) {
      console.log(`cloudflare purge skipped: CLOUDFLARE_API_TOKEN or CLOUDFLARE_ZONE_ID is not set`);
      return;
    }

    const purgeUrls = [
      toSiteUrl(`/`),
      toSiteUrl(`/index.html`)
    ];

    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${cloudflareZoneId}/purge_cache`,
      {
        method: `POST`,
        headers: {
          Authorization: `Bearer ${cloudflareApiToken}`,
          "Content-Type": `application/json`
        },
        body: JSON.stringify({ files: purgeUrls })
      }
    );

    const payload = await response.json();
    if (!response.ok || payload.success !== true) {
      throw new Error(`Cloudflare purge failed: ${JSON.stringify(payload)}`);
    }

    console.log(`cloudflare purge`, purgeUrls);
  },

  async process() {
    // Deploys must start from main so we always publish the intended source.
    const currentBranch = await this.currentBranch();
    if (currentBranch !== `main`) {
      throw new Error(`Deploy aborted: you must be on 'main' branch, current branch is '${currentBranch}'`);
    }

    // Refuse to deploy with uncommitted changes so published output always maps
    // back to a clean repo state.
    await run(`git diff --quiet`);

    await this.typecheck();

    await this.build();

    await this.makeCNAME();

    await this.ensureGhPagesBranch();

    await this.createOrReplaceDeployCommit();

    // Force-push the disposable publish branch, then return to main.
    await run(`git push origin gh-pages --force`);

    await run(`git checkout main`);

    await this.purgeCloudflareCache();
  }
};

application.process();
