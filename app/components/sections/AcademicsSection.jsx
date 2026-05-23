"use client";

import { useState } from "react";
import AlumniTestimonialsSection from "./AlumniTestimonialsSection";

/**
 * AcademicsSection — Accordion for Vision, Mission, Program Outcomes, and Syllabus,
 * followed by the Alumni Testimonials carousel.
 * id="syllabus" is kept for anchor navigation compatibility.
 */
export default function AcademicsSection() {
  const [openSection, setOpenSection] = useState("vision");

  const sections = [
    {
      key: "vision",
      title: "Vision",
      content: (
        <p className="mb-0" style={{ textAlign: "justify" }}>
          To achieve excellence in the field of Information Technology and create competent professionals for
          the benefit of the world community.
        </p>
      ),
    },
    {
      key: "mission",
      title: "Mission",
      content: (
        <ul className="mb-0 ps-3">
          <li className="mb-2">To integrate quality education, values and skills in the field of Information Technology through outcome-based teaching and learning process.</li>
          <li className="mb-2">To undertake research for the development of sustainable IT solutions for real world problems of society and industry.</li>
          <li className="mb-2">To foster an intellectual, innovative and entrepreneurial environment to develop IT leaders.</li>
          <li className="mb-0">To create a culture of collaboration and support among teachers and students for sharing of ideas and knowledge.</li>
        </ul>
      ),
    },
    {
      key: "program-outcomes",
      title: "Program Outcomes",
      content: (
        <ul className="mb-0 ps-3">
          <li className="mb-2"><strong>PO1: Engineering Knowledge:</strong> Apply knowledge of mathematics, natural science, computing, engineering fundamentals and an engineering specialization to develop solutions to complex engineering problems.</li>
          <li className="mb-2"><strong>PO2: Problem Analysis:</strong> Identify, formulate, review research literature and analyze complex engineering problems reaching substantiated conclusions with consideration for sustainable development.</li>
          <li className="mb-2"><strong>PO3: Design/Development of Solutions:</strong> Design creative solutions for complex engineering problems to meet identified needs with consideration for public health, safety, whole-life cost, and environment.</li>
          <li className="mb-2"><strong>PO4: Conduct Investigations of Complex Problems:</strong> Conduct investigations using research-based knowledge including design of experiments, modelling, analysis &amp; interpretation of data.</li>
          <li className="mb-2"><strong>PO5: Engineering Tool Usage:</strong> Create, select and apply appropriate techniques, resources and modern engineering &amp; IT tools to solve complex engineering problems.</li>
          <li className="mb-2"><strong>PO6: The Engineer and The World:</strong> Analyze and evaluate societal and environmental aspects while solving complex engineering problems for impact on sustainability.</li>
          <li className="mb-2"><strong>PO7: Ethics:</strong> Apply ethical principles and commit to professional ethics, human values, diversity and inclusion; adhere to national &amp; international laws.</li>
          <li className="mb-2"><strong>PO8: Individual and Collaborative Team work:</strong> Function effectively as an individual, and as a member or leader in diverse/multi-disciplinary teams.</li>
          <li className="mb-2"><strong>PO9: Communication:</strong> Communicate effectively and inclusively within the engineering community and society at large.</li>
          <li className="mb-2"><strong>PO10: Project Management and Finance:</strong> Apply knowledge of engineering management principles and economic decision-making to manage projects in multidisciplinary environments.</li>
          <li className="mb-0"><strong>PO11: Life-Long Learning:</strong> Recognize the need for independent and life-long learning, adaptability to emerging technologies, and critical thinking.</li>
        </ul>
      ),
    },
    {
      key: "syllabus",
      title: "Syllabus",
      content: (
        <div className="d-flex flex-column gap-3 w-100">
          {[
            { year: "I YEAR",  file: "/syllabus/B.Tech_1st_Year_Course_Booklet_2025-26.pdf" },
            { year: "II YEAR", file: "/syllabus/B.Tech_2nd_Year_Course_Booklet_2025-26.pdf" },
          ].map(({ year, file }) => (
            <a
              key={year}
              href={file}
              download
              className="d-flex align-items-center justify-content-between text-decoration-none bg-white rounded shadow-sm"
              style={{ padding: "14px 18px", width: "100%", border: "1px solid #e9ecef", transition: "all 0.25s ease" }}
            >
              <div className="d-flex align-items-center">
                <span
                  className="me-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{ width: "42px", height: "42px", backgroundColor: "#fff3ec", flexShrink: 0 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="var(--kiet-secondary)" viewBox="0 0 16 16">
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                  </svg>
                </span>
                <span className="fw-semibold fs-4 kiet-text-primary">{year}</span>
              </div>
              <span className="kiet-text-secondary" style={{ fontSize: "1.2rem" }}>&rarr;</span>
            </a>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div id="syllabus" className="mt-5">
      <h2
        className="fw-bold mb-4 kiet-text-primary"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", borderBottom: "3px solid var(--kiet-secondary)", paddingBottom: "10px", display: "inline-block" }}
      >
        Academics &amp; Outcomes
      </h2>

      <div className="d-flex flex-column gap-3">
        {sections.map((section) => {
          const isOpen = openSection === section.key;
          return (
            <div key={section.key}>
              <button
                id={`accordion-btn-${section.key}`}
                className={`vm-accordion-btn${isOpen ? " active" : ""}`}
                onClick={() => setOpenSection(isOpen ? "" : section.key)}
                aria-expanded={isOpen}
                aria-controls={`accordion-panel-${section.key}`}
              >
                <div className="d-flex align-items-center gap-3">
                  <span
                    className="fw-semibold fs-2"
                    style={{ color: isOpen ? "var(--kiet-secondary)" : "var(--kiet-primary)", transition: "color 0.3s ease" }}
                  >
                    {section.title}
                  </span>
                </div>
                <span
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    color: isOpen ? "var(--kiet-secondary)" : "#999",
                    transition: "transform 0.3s ease, color 0.3s ease",
                    fontSize: "0.85rem",
                  }}
                >
                  &#9660;
                </span>
              </button>

              <div
                id={`accordion-panel-${section.key}`}
                role="region"
                aria-labelledby={`accordion-btn-${section.key}`}
                className={`vm-accordion-panel${isOpen ? " open" : ""}`}
                style={{
                  maxHeight: isOpen ? "2000px" : "0",
                  opacity: isOpen ? 1 : 0,
                  padding: isOpen ? "1.25rem 1.5rem" : "0 1.5rem",
                }}
              >
                <div className="fs-2" style={{ color: "#444", lineHeight: 1.6 }}>
                  {section.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Alumni testimonials follow the academics accordion */}
      <AlumniTestimonialsSection />
    </div>
  );
}

