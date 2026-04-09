import type { SiteData } from "../../data/siteContent";
import "./Footer.css";

type FooterProps = {
  siteData: SiteData;
};

export function Footer({ siteData }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <strong>{siteData.site.name}</strong>
        <p>{siteData.site.tagline}</p>
      </div>
      <p>{siteData.site.address}</p>
      <p>
        <a href={`tel:${siteData.site.phone.replaceAll(" ", "")}`}>{siteData.site.phone}</a>
        {" | "}
        <a href={`mailto:${siteData.site.email}`}>{siteData.site.email}</a>
      </p>
    </footer>
  );
}


