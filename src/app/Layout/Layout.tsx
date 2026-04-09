import { Header } from "../Header/Header";
import { Content } from "../Content/Content";
import { Footer } from "../Footer/Footer";
import { StructuredData } from "../StructuredData/StructuredData";
import type { SiteData } from "../../data/siteContent";
import "./Layout.css";

type LayoutProps = {
  siteData: SiteData;
};

export function Layout({ siteData }: LayoutProps) {
  return (
    <div id="page-layout">
      <div id="left" className="layout-column" aria-hidden="true" />
      <div id="center" className="layout-column">
        <StructuredData siteData={siteData} />
        <Header siteData={siteData} />
        <Content siteData={siteData} />
        <Footer siteData={siteData} />
      </div>
      <div id="right" className="layout-column" aria-hidden="true" />
    </div>
  );
}


