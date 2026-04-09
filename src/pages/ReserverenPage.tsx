import { useSiteData } from "../app/site/useSiteData";
import { GUEST_WIDGET_URL } from "../data/siteConfig";
import { PageBlocks } from "./PageBlocks";
import "./ReserverenPage.css";

export function ReserverenPage() {
  const siteData = useSiteData();
  const page = siteData.pages[`/reserveren`];

  return (
    <section className="reservation-page">
      {page ? <PageBlocks blocks={page.contentBlocks} /> : null}

      <section className="reservation-embed" aria-labelledby="reservation-widget-title">
        <div className="reservation-embed__header">
          <p className="reservation-embed__kicker">Online reserveren</p>
          <h2 id="reservation-widget-title">Plaats direct een reservering</h2>
          <p className="reservation-embed__intro">
            Kies uw gewenste datum, tijd en arrangement. Uw aanvraag komt direct binnen bij
            ons team van {siteData.site.name}.
          </p>
        </div>

        <div className="reservation-embed__frame">
          <iframe
            title={`Reserveringswidget voor ${siteData.site.name}`}
            src={GUEST_WIDGET_URL}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
    </section>
  );
}
