import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { SiteData } from "../../data/siteContent";
import { EMPTY_SITE_DATA } from "../../data/siteContent";
import { loadSiteData } from "../../data/siteDataApi";

export type SiteDataOutletContext = {
  siteData: SiteData;
};

export function useSiteData() {
  const { siteData } = useOutletContext<SiteDataOutletContext>();
  return siteData;
}

export function useSiteDataLoader() {
  const [siteData, setSiteData] = useState<SiteData>(EMPTY_SITE_DATA);

  useEffect(() => {
    let active = true;

    loadSiteData()
      .then(data => {
        if (active) {
          setSiteData(data);
        }
      })
      .catch(() => {
        // Keep empty state when backend is unavailable.
      });

    return () => {
      active = false;
    };
  }, []);

  return siteData;
}
