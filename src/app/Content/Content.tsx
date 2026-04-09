import { Outlet } from "react-router-dom";
import type { SiteData } from "../../data/siteContent";
import type { SiteDataOutletContext } from "../site/useSiteData";
import "./Content.css";

type ContentProps = {
  siteData: SiteData;
};

export function Content({ siteData }: ContentProps) {
  const outletContext: SiteDataOutletContext = { siteData };

  return (
    <main id="content">
      <section id="top" />
      <Outlet context={outletContext} />
      <section id="bottom" />
    </main>
  );
}
