"use client";

import { useState } from "react";

const links = [
  { label: "KIET Campus Tour", href: "https://www.youtube.com/watch?v=LEJcSr4wHBA" },
  { label: "Grievance Redressal", href: "https://tech.kiet.edu/StudentPortal/#/StudentRedressal" },
  { label: "Admission Procedure", href: "https://kiet.edu/admissions/admission-procedure/" },
  { label: "Mandatory Disclosure", href: "https://kiet.edu/admissions/mandatory-disclosure/" },
  { label: "Information Brochure", href: "https://kiet.edu/admissions/info-brochure/" },
  { label: "Counselling Support", href: "https://kiet.edu/student-welfare/counselling-support/" },
  { label: "Ex-Student Verification Services", href: "https://www.studentservicesbureau.com/" },
];

export default function ImportantLinks() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="rotate-90 kiet-cursor-pointer" onClick={() => setOpen(true)}>
        <p className="d-flex justify-content-center align-items-center cursor-pointer">
          <span>Important Links</span>
        </p>
      </div>

      {open && (
        <div className="imp-links kiet-imp-links-panel">
          <div className="kiet-imp-links-header-border">
            <h5 className="fw-bold mb-0 kiet-text-primary">Important Links</h5>
            <button
              onClick={() => setOpen(false)}
              className="kiet-imp-links-close"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="d-flex flex-column py-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="d-flex align-items-center gap-3 px-4 py-3 text-decoration-none kiet-imp-links-link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="var(--kiet-secondary)" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z" />
                  <path fillRule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z" />
                </svg>
                <span className="fw-medium">{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      {open && (
        <div onClick={() => setOpen(false)} className="kiet-imp-links-overlay" />
      )}
    </>
  );
}
