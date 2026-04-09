import type { ContentBlock } from "../data/siteContent";
import "./MenukaartenPage.css";

type PageBlocksProps = {
  blocks: ContentBlock[];
};

export function PageBlocks({ blocks }: PageBlocksProps) {
  return (
    <article className="page-blocks">
      {blocks
        .filter(block => block.active)
        .sort((left, right) => left.sortOrder - right.sortOrder)
        .map(block => (
          <BlockRenderer block={block} key={block.id} />
        ))}
    </article>
  );
}

function BlockRenderer({ block }: { block: ContentBlock }) {
  if (block.type === `documents`) {
    const activeItems = block.items.filter(item => item.active);

    return (
      <section className="menu-page__grid" aria-label={block.title || `Documenten`}>
        {activeItems.map(document => (
          <section className="menu-card" key={document.title}>
            <div className="menu-card__content">
              <p className="menu-card__label">Document</p>
              <h3>{document.title}</h3>
              {document.description ? <p>{document.description}</p> : null}
              <div className="menu-card__actions">
                <a href={document.openUrl} target="_blank" rel="noreferrer">
                  Openen
                </a>
                {document.downloadUrl ? (
                  <a href={document.downloadUrl} target="_blank" rel="noreferrer">
                    Downloaden
                  </a>
                ) : null}
              </div>
            </div>

            <div className="menu-card__viewer">
              <iframe
                title={document.title}
                src={document.previewUrl}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </section>
        ))}
      </section>
    );
  }

  return (
    <section className="text-page">
      <h2>{block.title}</h2>
      {block.intro ? <p className="page-intro">{block.intro}</p> : null}
      {block.body.map(line => (
        <p key={line}>{line}</p>
      ))}
    </section>
  );
}
