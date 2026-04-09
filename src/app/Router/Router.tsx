import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { useSiteDataLoader } from "../site/useSiteData";
import { HomePage } from "../../pages/HomePage";
import { OverOnsPage } from "../../pages/OverOnsPage";
import { OpeningstijdenPage } from "../../pages/OpeningstijdenPage";
import { MenukaartenPage } from "../../pages/MenukaartenPage";
import { ReserverenPage } from "../../pages/ReserverenPage";
import { GroepenEventsPage } from "../../pages/GroepenEventsPage";

export function Router() {
  const siteData = useSiteDataLoader();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout siteData={siteData} />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<OverOnsPage />} />
          <Route path="/reserveren" element={<ReserverenPage />} />
          <Route path="/opening-hours" element={<OpeningstijdenPage />} />
          <Route path="/menukaart" element={<MenukaartenPage />} />
          <Route path="/groepen-en-partijen" element={<GroepenEventsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
