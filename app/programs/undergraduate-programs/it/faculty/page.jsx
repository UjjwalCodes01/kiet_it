
import { FacultyDirectoryPage } from "@/app/components/FacultyDirectoryPage";
import { IT_FACULTY_DATA } from "@/app/data/it-faculty";
import { IT_FACULTY_MEMBERS } from "@/app/data/it-faculty-members";

export const revalidate = 3600;

export const metadata = {
  title: IT_FACULTY_DATA.meta.title,
  description: IT_FACULTY_DATA.meta.description,
  keywords: IT_FACULTY_DATA.meta.keywords,
  alternates: {
    canonical: "/programs/undergraduate-programs/it/faculty",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ITFacultyPage() {
  return (
    <FacultyDirectoryPage
      bodyClass={IT_FACULTY_DATA.meta.bodyClass}
      stylesheets={IT_FACULTY_DATA.meta.stylesheets}
      fontPreloads={IT_FACULTY_DATA.meta.fontPreloads}
      members={IT_FACULTY_MEMBERS}
    />
  );
}

