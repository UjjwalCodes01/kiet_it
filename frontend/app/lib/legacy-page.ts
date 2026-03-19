import { loadLegacyHtml } from "@/app/lib/legacy-html";

export type ParsedLegacyPage = {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  bodyClass: string;
  stylesheets: string[];
  fontPreloads: string[];
  bodyHtml: string;
};

const SCRIPT_TAG_REGEX = /<script\b[\s\S]*?<\/script>/gi;
const NOSCRIPT_TAG_REGEX = /<noscript[\s\S]*?<\/noscript>/gi;

function normalizeLegacyRelativePaths(html: string): string {
  return html
    .replaceAll("../../../../assets/", "/assets/")
    .replaceAll("../../../assets/", "/assets/")
    .replaceAll("../../../../cse-ai-assets/", "/cse-ai-assets/")
    .replaceAll("../../../cse-ai-assets/", "/cse-ai-assets/")
    .replaceAll("../../../../favicon.ico", "/favicon.ico")
    .replaceAll("../../../favicon.ico", "/favicon.ico")
    .replaceAll("../../../../robots.txt", "/robots.txt")
    .replaceAll("../../../robots.txt", "/robots.txt");
}

function extractHead(html: string): string {
  const match = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
  return match?.[1] ?? "";
}

function extractBody(html: string): { attrs: string; content: string } {
  const match = html.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);

  return {
    attrs: match?.[1] ?? "",
    content: match?.[2] ?? "",
  };
}

function getAttrValue(tag: string, attrName: string): string | undefined {
  const regex = new RegExp(`${attrName}\\s*=\\s*["']([^"']+)["']`, "i");
  const match = tag.match(regex);
  return match?.[1];
}

function getMetaContent(head: string, name: string): string | undefined {
  const metaTags = head.match(/<meta\b[^>]*>/gi) ?? [];

  for (const tag of metaTags) {
    const metaName = getAttrValue(tag, "name")?.toLowerCase();
    if (metaName === name.toLowerCase()) {
      return getAttrValue(tag, "content");
    }
  }

  return undefined;
}

function getCanonical(head: string): string | undefined {
  const linkTags = head.match(/<link\b[^>]*>/gi) ?? [];

  for (const tag of linkTags) {
    const rel = getAttrValue(tag, "rel")?.toLowerCase();
    if (rel === "canonical") {
      return getAttrValue(tag, "href");
    }
  }

  return undefined;
}

function getStylesheets(head: string): string[] {
  const linkTags = head.match(/<link\b[^>]*>/gi) ?? [];
  const stylesheets = new Set<string>();

  for (const tag of linkTags) {
    const rel = getAttrValue(tag, "rel")?.toLowerCase();
    const href = getAttrValue(tag, "href");

    if (rel === "stylesheet" && href) {
      stylesheets.add(href);
    }
  }

  return [...stylesheets];
}

function getFontPreloads(head: string): string[] {
  const linkTags = head.match(/<link\b[^>]*>/gi) ?? [];
  const preloads = new Set<string>();

  for (const tag of linkTags) {
    const rel = getAttrValue(tag, "rel")?.toLowerCase();
    const as = getAttrValue(tag, "as")?.toLowerCase();
    const href = getAttrValue(tag, "href");

    if (rel === "preload" && as === "font" && href) {
      preloads.add(href);
    }
  }

  return [...preloads];
}

function stripRuntimeScripts(html: string): string {
  return html
    .replaceAll(SCRIPT_TAG_REGEX, "")
    .replaceAll(NOSCRIPT_TAG_REGEX, "")
    .replaceAll(/<link[^>]+rel=["']preload["'][^>]+as=["']script["'][^>]*>/gi, "");
}

function secureBlankTargets(html: string): string {
  return html.replace(/<a\b([^>]*\btarget=["']_blank["'][^>]*)>/gi, (full, attrs) => {
    if (/\brel\s*=\s*["'][^"']*["']/i.test(attrs)) {
      return full;
    }

    return `<a${attrs} rel="noopener noreferrer">`;
  });
}

function cleanupLegacyMarkers(html: string): string {
  return html
    .replaceAll("<!--$-->", "")
    .replaceAll("<!--/$-->", "")
    .replaceAll("<!-- -->", "");
}

export function loadParsedLegacyPage(relativeHtmlPath: string): ParsedLegacyPage {
  const legacyHtml = normalizeLegacyRelativePaths(loadLegacyHtml(relativeHtmlPath));
  const scriptFreeHtml = stripRuntimeScripts(legacyHtml);

  const head = extractHead(scriptFreeHtml);
  const body = extractBody(scriptFreeHtml);
  const bodyClass = getAttrValue(`<body${body.attrs}>`, "class") ?? "";

  const title =
    head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ??
    "KIET University";

  const description =
    getMetaContent(head, "description") ??
    "KIET is a Deemed to be University known for academic excellence.";

  const keywords = getMetaContent(head, "keywords");
  const canonical = getCanonical(head);
  const stylesheets = getStylesheets(head);
  const fontPreloads = getFontPreloads(head);

  const bodyHtml = secureBlankTargets(cleanupLegacyMarkers(body.content));

  return {
    title,
    description,
    keywords,
    canonical,
    bodyClass,
    stylesheets,
    fontPreloads,
    bodyHtml,
  };
}
