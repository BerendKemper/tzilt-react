import { NavLink } from "react-router-dom";
import type { SiteData } from "../../data/siteContent";
import logoUrl from "../../assets/colorless-zilt.svg";
import "./Header.css";

type HeaderProps = {
  siteData: SiteData;
};

export function Header({ siteData }: HeaderProps) {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Hoofdnavigatie">
        <NavLink className="header-brand" to="/" end aria-label={siteData.site.name}>
          <img className="header-logo" src={logoUrl} alt={siteData.site.name} />
          <span className="sr-only">{siteData.site.name}</span>
        </NavLink>
        <div className="header-links">
          {siteData.navigation.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"}>
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}


