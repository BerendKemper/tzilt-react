export type RichTextBlock = {
  id: string;
  type: "richText";
  active: boolean;
  sortOrder: number;
  title: string;
  intro?: string;
  body: string[];
};

export type DocumentItem = {
  active: boolean;
  title: string;
  description?: string;
  previewUrl: string;
  openUrl: string;
  downloadUrl?: string;
};

export type DocumentsBlock = {
  id: string;
  type: "documents";
  active: boolean;
  sortOrder: number;
  title?: string;
  items: DocumentItem[];
};

export type ContentBlock = RichTextBlock | DocumentsBlock;

export type SitePage = {
  slug: string;
  contentBlocks: ContentBlock[];
};

export type OpeningHoursEntry = {
  dayLabel: string;
  schemaDay: string;
  opens: string | null;
  closes: string | null;
};

export type SiteData = {
  site: {
    name: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
    latitude: string;
    longitude: string;
    reservationUrl: string;
    menuUrl: string;
    siteUrl: string;
    priceRange: string;
    servesCuisine: string[];
    sameAs: string[];
  };
  navigation: Array<{ label: string; path: string }>;
  pages: Record<string, SitePage>;
  openingHours: OpeningHoursEntry[];
};

export const EMPTY_SITE_DATA: SiteData = {
  site: {
    name: "",
    tagline: "",
    phone: "",
    email: "",
    address: "",
    streetAddress: "",
    addressLocality: "",
    addressRegion: "",
    postalCode: "",
    addressCountry: "",
    latitude: "",
    longitude: "",
    reservationUrl: "",
    menuUrl: "",
    siteUrl: "",
    priceRange: "",
    servesCuisine: [],
    sameAs: []
  },
  navigation: [],
  pages: {},
  openingHours: []
};

