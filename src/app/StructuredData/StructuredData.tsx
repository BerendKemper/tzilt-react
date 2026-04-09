import type { SiteData } from "../../data/siteContent";

type StructuredDataProps = {
  siteData: SiteData;
};

export function StructuredData({ siteData }: StructuredDataProps) {
  if (!siteData.site.siteUrl || !siteData.site.name) {
    return null;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteData.site.siteUrl}/#website`,
        url: siteData.site.siteUrl,
        name: siteData.site.name,
        inLanguage: "nl-NL"
      },
      {
        "@type": "Restaurant",
        "@id": `${siteData.site.siteUrl}/#restaurant`,
        url: siteData.site.siteUrl,
        name: siteData.site.name,
        description: siteData.site.tagline,
        telephone: siteData.site.phone,
        email: siteData.site.email,
        menu: siteData.site.menuUrl,
        acceptsReservations: true,
        priceRange: siteData.site.priceRange,
        servesCuisine: siteData.site.servesCuisine,
        sameAs: siteData.site.sameAs,
        geo: {
          "@type": "GeoCoordinates",
          latitude: siteData.site.latitude,
          longitude: siteData.site.longitude
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: siteData.site.streetAddress,
          addressLocality: siteData.site.addressLocality,
          addressRegion: siteData.site.addressRegion,
          postalCode: siteData.site.postalCode,
          addressCountry: siteData.site.addressCountry
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: siteData.site.email,
          telephone: siteData.site.phone,
          contactType: "customer service",
          availableLanguage: ["Dutch", "English"]
        },
        openingHoursSpecification: siteData.openingHours
          .filter((entry) => entry.opens && entry.closes)
          .map((entry) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${entry.schemaDay}`,
            opens: entry.opens,
            closes: entry.closes
          }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
