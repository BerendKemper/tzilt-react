import { useSiteData } from "../app/site/useSiteData";
import "./OpeningstijdenPage.css";

export function OpeningstijdenPage() {
  const siteData = useSiteData();

  return (
    <article className="opening-hours-page">
      <header className="opening-hours-header">
        <h2>Openingstijden</h2>
        <p className="opening-hours-note">
          Openingstijden kunnen variëren door weer en drukte. Bel bij twijfel
          even vooraf.
        </p>
      </header>

      <section className="opening-hours-card" aria-labelledby="opening-hours-table-title">
        <h3 id="opening-hours-table-title">Actuele openingstijden</h3>

        <table className="opening-hours-table">
          <caption className="sr-only">
            Wekelijkse openingstijden van {siteData.site.name}
          </caption>
          <thead>
            <tr>
              <th scope="col">Dag</th>
              <th scope="col">Tijden</th>
            </tr>
          </thead>
          <tbody>
            {siteData.openingHours.map(entry => (
              <tr key={entry.schemaDay}>
                <th scope="row">{entry.dayLabel}</th>
                <td>
                  {entry.opens && entry.closes ? (
                    <>
                      <time dateTime={entry.opens}>{entry.opens}</time>
                      {` - `}
                      <time dateTime={entry.closes}>{entry.closes}</time>
                    </>
                  ) : (
                    <span className="opening-hours-closed">Gesloten</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="opening-hours-contact">
          Vragen over openingstijden of groepsreserveringen?{` `}
          <a href={`tel:${siteData.site.phone.replaceAll(` `, ``)}`}>
            {siteData.site.phone}
          </a>
        </p>
      </section>
    </article>
  );
}
