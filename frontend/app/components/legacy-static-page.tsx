import type { ParsedLegacyPage } from "@/app/lib/legacy-page";

type LegacyStaticPageProps = {
  page: ParsedLegacyPage;
};

export function LegacyStaticPage({ page }: LegacyStaticPageProps) {
  return (
    <>
      {page.fontPreloads.map((href) => (
        <link
          key={`font-preload-${href}`}
          rel="preload"
          href={href}
          as="font"
          crossOrigin=""
        />
      ))}

      {page.stylesheets.map((href) => (
        <link key={`legacy-style-${href}`} rel="stylesheet" href={href} />
      ))}

      <div
        className={page.bodyClass}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
      />
    </>
  );
}
