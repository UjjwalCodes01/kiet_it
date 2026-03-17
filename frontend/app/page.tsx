import type { Metadata } from "next";

import { DepartmentMainPage } from "@/app/components/DepartmentMainPage";
import { CSE_AIML_MAIN_DATA } from "@/app/data/cse-aiml-main";

export const metadata: Metadata = {
  title: CSE_AIML_MAIN_DATA.meta.title,
  description: CSE_AIML_MAIN_DATA.meta.description,
  keywords: CSE_AIML_MAIN_DATA.meta.keywords,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Home() {
  return (
    <DepartmentMainPage
      bodyClass={CSE_AIML_MAIN_DATA.meta.bodyClass}
      stylesheets={CSE_AIML_MAIN_DATA.meta.stylesheets}
      fontPreloads={CSE_AIML_MAIN_DATA.meta.fontPreloads}
    />
  );
}
