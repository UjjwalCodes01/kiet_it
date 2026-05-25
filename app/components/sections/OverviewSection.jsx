/**
 * OverviewSection — Department hero banner with title, description, Apply Now CTA,
 * and a stats grid (highest package, placements, intake, certifications).
 */
export default function OverviewSection() {
  const stats = [
    { value: "1.78 Cr", label: "Highest Package",      sub: "2026 Batch" },
    { value: "88%",     label: "Placements",            sub: "2021–2025 Batches" },
    { value: "180",     label: "Annual Intake",         sub: "IT Department" },
    { value: "370+",    label: "Globally Certified",    sub: "Students" },
  ];

  const mobileStats = [
    { value: "1.78 Cr", label: "Highest Package" },
    { value: "90%",     label: "Placements" },
    { value: "180",     label: "Annual Intake" },
    { value: "370+",    label: "Certified Students" },
  ];

  return (
    <div id="overview">
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-4 py-3 py-md-4">
        <div className="kiet-overview-banner">
          {/* Dark gradient background */}
          <div className="kiet-overview-bg">
            {/* Decorative diagonal stripe */}
            <div className="d-none d-lg-block kiet-overview-stripe" />

            <div className="row g-0 align-items-center kiet-overview-zindex">
              {/* Left column — text + CTA */}
              <div className="col-12 col-lg-7 p-4 p-md-5">
                <div className="py-3 py-lg-5 px-2 px-lg-4">
                  <div className="d-inline-block mb-3 px-3 py-1 rounded-pill kiet-overview-badge">
                    <span className="fw-semibold fs-5 kiet-overview-badge-text">
                      NBA Accredited &bull; 5 Times
                    </span>
                  </div>

                  <h1 className="fw-bold mb-4 kiet-overview-h1">
                    Department of{" "}
                    <span className="kiet-text-secondary">Information Technology</span>
                  </h1>

                  <p className="mb-4 fs-3 kiet-overview-desc">
                    The Information Technology department builds future-ready professionals through strong computing
                    fundamentals and advanced domains like Quantum Computing, AWS Cloud, AI, ML, and Data Engineering.
                    With an industry-aligned curriculum, experiential learning, and globally recognized certifications,
                    students gain the skills and innovation mindset to excel in today&apos;s digital landscape.
                  </p>

                  <a
                    href="https://admission.kiet.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn px-5 py-3 text-white fw-semibold fs-3 kiet-bg-secondary kiet-overview-cta"
                  >
                    Apply Now
                  </a>
                </div>
              </div>

              {/* Right column — stats */}
              <div className="col-12 col-lg-5">
                {/* Desktop stats grid */}
                <div className="d-none d-lg-block p-4 p-lg-5">
                  <div className="row g-3">
                    {stats.map((item) => (
                      <div key={item.value} className="col-6">
                        <div className="text-center p-3 rounded-3 kiet-stats-card">
                          <h3 className="fw-bold mb-1 fs-1 kiet-text-secondary">{item.value}</h3>
                          <p className="fw-semibold mb-0 fs-4 kiet-stats-label">{item.label}</p>
                          <p className="mb-0 fs-5 kiet-stats-sub-desktop">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile stats */}
                <div className="d-lg-none px-4 pb-4">
                  <div className="row g-2">
                    {mobileStats.map((item) => (
                      <div key={item.value} className="col-6">
                        <div className="text-center py-3 rounded-3 kiet-stats-card">
                          <h3 className="fw-bold mb-0 fs-2 kiet-text-secondary">{item.value}</h3>
                          <p className="mb-0 fs-5 kiet-stats-sub-mobile">{item.label}</p>
                        </div>
                      </div>
                    ))}
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
