import { API_BASE } from "./siteConfig";
import type { SiteData } from "./siteContent";

let siteDataPromise: Promise<SiteData> | null = null;

export function loadSiteData(): Promise<SiteData> {
  if (!siteDataPromise) {
    siteDataPromise = fetch(`${API_BASE}/api/site`).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch site data");
      }

      return response.json() as Promise<SiteData>;
    });
  }

  return siteDataPromise;
}

export function resetSiteDataCache() {
  siteDataPromise = null;
}
