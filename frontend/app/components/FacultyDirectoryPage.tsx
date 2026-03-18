import Navbar from "./Navbar";
import Hero from "./Hero";
import FacultyCard from "./FacultyCard";
import Footer from "./Footer";

import type { FacultyMember } from "@/app/data/cse-aiml-faculty-members";

type FacultyDirectoryPageProps = {
  bodyClass: string;
  stylesheets: readonly string[];
  fontPreloads: readonly string[];
  members: FacultyMember[];
};

function HeadAssets({
  stylesheets,
  fontPreloads,
}: Pick<FacultyDirectoryPageProps, "stylesheets" | "fontPreloads">) {
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

function FacultyGrid({ members }: { members: FacultyMember[] }) {
  return (
    <main className="container py-4 py-md-5 px-3 px-md-4">
      <div className="row g-3 g-md-4">
        {members.map((member) => (
          <div key={`${member.name}-${member.image}`} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <FacultyCard member={member} variant="faculty" />
          </div>
        ))}
      </div>
    </main>
  );
}

function FloatingWidgets() {
  return (
    <>
      <div className="right-rotate-90">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
          href="https://admission.kiet.edu/"
        >
          <p className="d-flex justify-content-center align-items-center cursor-pointer">
            <span>Register For Admission 2026-27</span>
          </p>
        </a>
      </div>
      <div className="whatsapp-rotate">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none d-flex align-items-center justify-content-center"
          href="https://api.whatsapp.com/send/?phone=918588811998&text&app_absent=0"
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            color="#fff"
            style={{ color: "#fff" }}
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6z" />
          </svg>
        </a>
      </div>
    </>
  );
}

export function FacultyDirectoryPage({
  bodyClass,
  stylesheets,
  fontPreloads,
  members,
}: FacultyDirectoryPageProps) {
  return (
    <>
      <HeadAssets stylesheets={stylesheets} fontPreloads={fontPreloads} />
      <div className={bodyClass}>
        <Navbar />
        <Hero
          title="Our Faculty"
          subtitle="Meet the distinguished faculty members of Information Technology."
          backHref="/"
          backLabel="Back to Home"
        />
        <FacultyGrid members={members} />
        <Footer />
        <FloatingWidgets />
      </div>
    </>
  );
}
