import type { Metadata } from "next";

import { FacultyDirectoryPage } from "@/app/components/FacultyDirectoryPage";
import { CSE_AIML_FACULTY_DATA } from "@/app/data/cse-aiml-faculty";
import { FACULTY_MEMBERS } from "@/app/data/cse-aiml-faculty-members";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: CSE_AIML_FACULTY_DATA.meta.title,
  description: CSE_AIML_FACULTY_DATA.meta.description,
  keywords: CSE_AIML_FACULTY_DATA.meta.keywords,
  alternates: {
    canonical: "/programs/undergraduate-programs/cse-aiml/faculty",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CseAimlFacultyPage() {
  return (
    <FacultyDirectoryPage
      bodyClass={CSE_AIML_FACULTY_DATA.meta.bodyClass}
      stylesheets={CSE_AIML_FACULTY_DATA.meta.stylesheets}
      fontPreloads={CSE_AIML_FACULTY_DATA.meta.fontPreloads}
      members={FACULTY_MEMBERS}
    />
  );
}
