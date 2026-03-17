import { loadParsedLegacyPage } from "@/app/lib/legacy-page";
import { load } from "cheerio";

type LegacyPageMeta = {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  bodyClass: string;
  stylesheets: string[];
  fontPreloads: string[];
};

export type CseAimlMainSections = {
  header: string;
  overview: string;
  infrastructure: string;
  placement: string;
  roadmap: string;
  coe: string;
  clubs: string;
  deanMessage: string;
  faculty: string;
  testimonials: string;
  publications: string;
  syllabus: string;
  footer: string;
  floatingWidgets: string;
};

export type CseAimlFacultySections = {
  header: string;
  intro: string;
  facultyGrid: string;
  footer: string;
  floatingWidgets: string;
};

function getHtmlMeta(relativeHtmlPath: string): {
  meta: LegacyPageMeta;
  bodyHtml: string;
} {
  const page = loadParsedLegacyPage(relativeHtmlPath);
  const { bodyHtml, ...meta } = page;
  return { meta, bodyHtml };
}

function pickOuterHtml($: ReturnType<typeof load>, selector: string): string {
  return $(selector).first().prop("outerHTML") ?? "";
}

function pickCombinedOuterHtml(
  $: ReturnType<typeof load>,
  selectors: string[],
): string {
  return selectors
    .map((selector) => pickOuterHtml($, selector))
    .filter((html) => html.length > 0)
    .join("\n");
}

export function loadCseAimlMainPageData(relativeHtmlPath: string): {
  meta: LegacyPageMeta;
  sections: CseAimlMainSections;
} {
  const { meta, bodyHtml } = getHtmlMeta(relativeHtmlPath);
  const $ = load(bodyHtml);

  const sections: CseAimlMainSections = {
    header: pickOuterHtml($, "header.edu-header"),
    overview: pickOuterHtml($, "#overview"),
    infrastructure: pickOuterHtml($, "#infrastructure"),
    placement: pickOuterHtml($, "#placement"),
    roadmap: pickOuterHtml($, "#roadmap"),
    coe: pickOuterHtml($, "#coe"),
    clubs: pickOuterHtml($, "#clubs"),
    deanMessage: pickOuterHtml($, "#dean-message"),
    faculty: pickOuterHtml($, "#faculty"),
    testimonials: pickOuterHtml($, "#testimonials"),
    publications: pickOuterHtml($, "#publications"),
    syllabus: pickOuterHtml($, "#syllabus"),
    footer: pickOuterHtml($, "footer.edu-footer"),
    floatingWidgets: pickCombinedOuterHtml($, [
      ".right-rotate-90",
      ".whatsapp-rotate",
    ]),
  };

  return { meta, sections };
}

export function loadCseAimlFacultyPageData(relativeHtmlPath: string): {
  meta: LegacyPageMeta;
  sections: CseAimlFacultySections;
} {
  const { meta, bodyHtml } = getHtmlMeta(relativeHtmlPath);
  const $ = load(bodyHtml);

  const sections: CseAimlFacultySections = {
    header: pickOuterHtml($, "header.edu-header"),
    intro: pickOuterHtml($, "div.blog-details-area header"),
    facultyGrid: pickOuterHtml($, "div.blog-details-area main"),
    footer: pickOuterHtml($, "footer.edu-footer"),
    floatingWidgets: pickCombinedOuterHtml($, [
      ".right-rotate-90",
      ".whatsapp-rotate",
    ]),
  };

  return { meta, sections };
}
