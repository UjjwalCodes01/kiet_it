import { NextResponse } from "next/server";

import { loadLegacyHtml } from "@/app/lib/legacy-html";

export function GET() {
  const html = loadLegacyHtml(
    "programs/undergraduate-programs/cse-aiml/faculty/index.html",
  );

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
