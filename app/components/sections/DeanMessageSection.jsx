"use client";

import { useState } from "react";

/**
 * DeanMessageSection — Dean's photo, message text, and expandable "Read More" on mobile.
 */
export default function DeanMessageSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div id="dean-message">
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          <div className="p-3 p-md-4 p-lg-5 kiet-dean-card">
            <div className="row g-2 py-3">
              <div className="col-12">
                <h2 className="fw-bold mb-2 kiet-text-primary kiet-section-heading">
                  Dean&apos;s Message
                </h2>
              </div>

              <div className="col-12">
                <div className="row g-4 align-items-start">
                  {/* Dean's photo */}
                  <div className="col-12 col-lg-4 order-0 order-lg-1">
                    <div className="text-center">
                      <img
                        src="/Dean_It/dr_puneet_goswami.webp"
                        alt="Dr. Puneet Goswami - Dean, IT"
                        className="img-fluid rounded-3 kiet-dean-photo"
                      />
                    </div>
                  </div>

                  {/* Message text */}
                  <div className="col-12 col-lg-8 order-1 order-lg-0">
                    <p className="mb-3 fs-4 kiet-text-dark-muted kiet-text-justify-18">
                      The Department of Information Technology, accredited by the NBA five times and currently valid
                      up to June 2028, is committed to excellence in teaching, learning, and research. Our
                      industry-aligned curriculum equips students with strong technical foundations, adaptability,
                      and problem-solving skills to thrive in a rapidly evolving technological landscape driven by
                      innovation in artificial intelligence, data science, cloud computing, cybersecurity, and the
                      Internet of Things.
                    </p>

                    <div className={expanded ? "" : "d-none d-lg-block"}>
                      <p className="mb-3 fs-4 kiet-text-dark-muted kiet-text-justify-18">
                        Supported by a highly qualified faculty, professor of practice (Industry), and
                        state-of-the-art laboratories, students gain hands-on experience through cutting-edge
                        research, internships, and industry collaborations. They are encouraged to build expertise in
                        emerging domains such as machine learning, blockchain, DevOps, edge computing, quantum
                        computing, agentic AI, and intelligent systems development.
                      </p>
                      <p className="mb-3 fs-4 kiet-text-dark-muted kiet-text-justify-18">
                        Our vision is to evolve as a centre of excellence in IT and related research, nurturing
                        graduates who emerge as innovative leaders, tech-driven entrepreneurs, research
                        professionals, and solution architects equipped to make meaningful contributions to the
                        digital ecosystem and society at large.
                      </p>
                    </div>

                    <button
                      className="btn btn-link d-lg-none p-0 text-decoration-none fw-semibold kiet-text-secondary"
                      onClick={() => setExpanded(!expanded)}
                    >
                      {expanded ? "Show Less" : "Read More"}
                    </button>

                    <div className="mt-4 mt-lg-5">
                      <p className="mb-1 fw-bold fs-3 kiet-text-primary">Dr. Puneet Goswami</p>
                      <p className="mb-0 text-muted fs-4">Dean, IT</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
