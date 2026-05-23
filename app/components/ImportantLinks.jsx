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
      <div
        className="rotate-90"
        onClick={() => setOpen(true)}
        style={{ cursor: "pointer" }}
      >
        <p className="d-flex justify-content-center align-items-center cursor-pointer">
          <span>Important Links</span>
        </p>
      </div>

      {open && (
        <div
          className="imp-links"
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "320px",
            maxWidth: "90vw",
            height: "100vh",
            backgroundColor: "#fff",
            zIndex: 1050,
            boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center px-4 py-3"
            style={{ borderBottom: "2px solid #f26520" }}
          >
            <h5 className="fw-bold mb-0" style={{ color: "#002855" }}>Important Links</h5>
            <button
              onClick={() => setOpen(false)}
              style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#666" }}
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
                className="d-flex align-items-center gap-3 px-4 py-3 text-decoration-none"
                style={{ color: "#333", borderBottom: "1px solid #f0f0f0", transition: "background-color 0.2s" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f26520" viewBox="0 0 16 16">
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
        <div
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1049 }}
        />
      )}
    </>
  );
}

