import { DepartmentMainPage } from "@/app/components/DepartmentMainPage";
import { IT_MAIN_DATA } from "@/app/data/it-main";

export const metadata = {
  title: IT_MAIN_DATA.meta.title,
  description: IT_MAIN_DATA.meta.description,
  keywords: IT_MAIN_DATA.meta.keywords,
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
      bodyClass={IT_MAIN_DATA.meta.bodyClass}
      stylesheets={IT_MAIN_DATA.meta.stylesheets}
      fontPreloads={IT_MAIN_DATA.meta.fontPreloads}
    />
  );
}
