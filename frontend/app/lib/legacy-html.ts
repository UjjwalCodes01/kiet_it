import { readFileSync } from "node:fs";
import path from "node:path";

function rewriteLegacyAssetPaths(html: string): string {
  return html
    .replaceAll("../../../../_next/", "/legacy_next/")
    .replaceAll("../../../_next/", "/legacy_next/")
    .replaceAll('"/_next/', '"/legacy_next/')
    .replaceAll("'/_next/", "'/legacy_next/")
    .replaceAll(/(\.css)%3[Ff]dpl=[^"'\s<)]+/g, "$1")
    .replaceAll(/(\.js)%3[Ff]dpl=[^"'\s<)]+/g, "$1")
    .replaceAll(/(\.css)\?dpl=[^"'\s<)]+/g, "$1")
    .replaceAll(/(\.js)\?dpl=[^"'\s<)]+/g, "$1");
}

export function loadLegacyHtml(relativeHtmlPath: string): string {
  const htmlPath = path.join(process.cwd(), "legacy-html", relativeHtmlPath);
  const rawHtml = readFileSync(htmlPath, "utf-8");
  return rewriteLegacyAssetPaths(rawHtml);
}
