import Navbar from "./Navbar";
import Hero from "./Hero";
import ProgramDetails from "./ProgramDetails";
import Footer from "./Footer";

import { FACULTY_MEMBERS } from "@/app/data/cse-aiml-faculty-members";

type DepartmentMainPageProps = {
  bodyClass: string;
  stylesheets: readonly string[];
  fontPreloads: readonly string[];
};

function HeadAssets({
  stylesheets,
  fontPreloads,
}: Pick<DepartmentMainPageProps, "stylesheets" | "fontPreloads">) {
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

function FloatingWidgets() {
  return (
    <>
      <div className="right-rotate-90">
        <a target="_blank" rel="noopener noreferrer" className="text-decoration-none" href="https://admission.kiet.edu/">
          <p className="d-flex justify-content-center align-items-center cursor-pointer">
            <span>Register For Admission 2026-27</span>
          </p>
        </a>
      </div>
      <div className="whatsapp-rotate">
        <a target="_blank" rel="noopener noreferrer" className="text-decoration-none d-flex align-items-center justify-content-center" href="https://api.whatsapp.com/send/?phone=918588811998&text&app_absent=0">
          <span className="text-white fw-bold">WA</span>
        </a>
      </div>
    </>
  );
}

function ProgramSectionNav() {
  const sectionLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Highlights", href: "#infrastructure" },
    { label: "Info", href: "#info" },
    { label: "Placement", href: "#placement" },
    { label: "Roadmap", href: "#roadmap" },
    { label: "COE", href: "#coe" },
    { label: "Clubs", href: "#clubs" },
    { label: "Dean's Message", href: "#dean-message" },
    { label: "Faculty", href: "#faculty" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Publications & Research", href: "#publications" },
    { label: "Syllabus", href: "#syllabus" },
  ];

  return (
    <div
      className="kiet-program-section-nav-wrap"
      style={{
        borderTop: "1px solid #e5e7eb",
        borderBottom: "1px solid #e5e7eb",
        backgroundColor: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 35,
        marginRight: "56px",
      }}
    >
      <div
        className="kiet-program-section-nav"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          padding: "9px 84px 9px 18px",
          maxWidth: "1400px",
          margin: "0 auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {sectionLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="kiet-program-section-link"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "6px 11px",
              borderRadius: "999px",
              color: "#1f2937",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export function DepartmentMainPage({ bodyClass, stylesheets, fontPreloads }: DepartmentMainPageProps) {
  return (
    <>
      <HeadAssets stylesheets={stylesheets} fontPreloads={fontPreloads} />
      <div className={`${bodyClass} kiet-page-scope`}>
        <Navbar />
        <Hero
          title="CSE (AI) & CSE (AI & ML)"
          subtitle="Future-ready programs designed for machine intelligence, innovation, and high-impact careers."
          backHref="/"
          backLabel="Home"
        />
        <ProgramSectionNav />
        <ProgramDetails
          faculty={FACULTY_MEMBERS}
          facultyPageHref="/programs/undergraduate-programs/cse-aiml/faculty"
        />
        <Footer />
        <FloatingWidgets />
      </div>
    </>
  );
}
