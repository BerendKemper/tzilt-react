import { useSiteData } from "../app/site/useSiteData";
import { PageBlocks } from "./PageBlocks";

type PageViewProps = {
  path: string;
};

export function PageView({ path }: PageViewProps) {
  const siteData = useSiteData();
  const page = siteData.pages[path];

  if (!page) {
    return (
      <article className="text-page">
        <h2>Pagina niet gevonden</h2>
        <p>Deze pagina bestaat nog niet.</p>
      </article>
    );
  }

  return (
    <PageBlocks blocks={page.contentBlocks} />
  );
}
