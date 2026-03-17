import type {
  CseAimlFacultySections,
  CseAimlMainSections,
} from "@/app/lib/cse-aiml-sections";

type BaseLegacyPageProps = {
  bodyClass: string;
  stylesheets: readonly string[];
  fontPreloads: readonly string[];
};

function LegacyHeadAssets({
  stylesheets,
  fontPreloads,
}: Pick<BaseLegacyPageProps, "stylesheets" | "fontPreloads">) {
  return (
    <>
      {fontPreloads.map((href) => (
        <link key={href} rel="preload" href={href} as="font" crossOrigin="" />
      ))}
      {stylesheets.map((href) => (
        <link key={href} rel="stylesheet" href={href} />
      ))}
    </>
  );
}

function HtmlFragment({ html }: { html: string }) {
  if (!html) {
    return null;
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export function ProgramMainLegacyPage({
  bodyClass,
  stylesheets,
  fontPreloads,
  sections,
}: BaseLegacyPageProps & {
  sections: CseAimlMainSections;
}) {
  return (
    <>
      <LegacyHeadAssets stylesheets={stylesheets} fontPreloads={fontPreloads} />
      <div className={bodyClass}>
        <header>
          <HtmlFragment html={sections.header} />
        </header>
        <section aria-label="Overview">
          <HtmlFragment html={sections.overview} />
        </section>
        <section aria-label="Infrastructure">
          <HtmlFragment html={sections.infrastructure} />
        </section>
        <section aria-label="Placements">
          <HtmlFragment html={sections.placement} />
        </section>
        <section aria-label="Roadmap">
          <HtmlFragment html={sections.roadmap} />
        </section>
        <section aria-label="Centers of Excellence">
          <HtmlFragment html={sections.coe} />
        </section>
        <section aria-label="Clubs">
          <HtmlFragment html={sections.clubs} />
        </section>
        <section aria-label="Dean Message">
          <HtmlFragment html={sections.deanMessage} />
        </section>
        <section aria-label="Faculty Highlights">
          <HtmlFragment html={sections.faculty} />
        </section>
        <section aria-label="Testimonials">
          <HtmlFragment html={sections.testimonials} />
        </section>
        <section aria-label="Publications">
          <HtmlFragment html={sections.publications} />
        </section>
        <section aria-label="Syllabus and Curriculum">
          <HtmlFragment html={sections.syllabus} />
        </section>
        <footer>
          <HtmlFragment html={sections.footer} />
        </footer>
        <HtmlFragment html={sections.floatingWidgets} />
      </div>
    </>
  );
}

export function ProgramFacultyLegacyPage({
  bodyClass,
  stylesheets,
  fontPreloads,
  sections,
}: BaseLegacyPageProps & {
  sections: CseAimlFacultySections;
}) {
  return (
    <>
      <LegacyHeadAssets stylesheets={stylesheets} fontPreloads={fontPreloads} />
      <div className={bodyClass}>
        <header>
          <HtmlFragment html={sections.header} />
        </header>
        <section aria-label="Faculty Intro">
          <HtmlFragment html={sections.intro} />
        </section>
        <section aria-label="Faculty Grid">
          <HtmlFragment html={sections.facultyGrid} />
        </section>
        <footer>
          <HtmlFragment html={sections.footer} />
        </footer>
        <HtmlFragment html={sections.floatingWidgets} />
      </div>
    </>
  );
}
