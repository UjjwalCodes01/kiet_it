import type { Metadata } from "next";

import { DepartmentMainPage } from "@/app/components/DepartmentMainPage";
import { CSE_AIML_MAIN_DATA } from "@/app/data/cse-aiml-main";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: CSE_AIML_MAIN_DATA.meta.title,
  description: CSE_AIML_MAIN_DATA.meta.description,
  keywords: CSE_AIML_MAIN_DATA.meta.keywords,
  alternates: {
    canonical: "/programs/undergraduate-programs/cse-aiml",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CseAimlPage() {
  return (
    <DepartmentMainPage
      bodyClass={CSE_AIML_MAIN_DATA.meta.bodyClass}
      stylesheets={CSE_AIML_MAIN_DATA.meta.stylesheets}
      fontPreloads={CSE_AIML_MAIN_DATA.meta.fontPreloads}
    />
  );
}
