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
        <div style={{ borderRadius: "20px", overflow: "hidden", position: "relative" }}>
          {/* Dark gradient background */}
          <div style={{ background: "linear-gradient(135deg, #001a3a 0%, #002855 60%, #003d7a 100%)", position: "relative" }}>
            {/* Decorative diagonal stripe */}
            <div
              className="d-none d-lg-block"
              style={{
                position: "absolute", top: 0, right: 0, width: "45%", height: "100%",
                background: "linear-gradient(135deg, transparent 0%, rgba(242, 101, 32, 0.08) 100%)",
                clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)",
              }}
            />

            <div className="row g-0 align-items-center" style={{ position: "relative", zIndex: 1 }}>
              {/* Left column — text + CTA */}
              <div className="col-12 col-lg-7 p-4 p-md-5">
                <div className="py-3 py-lg-5 px-2 px-lg-4">
                  <div
                    className="d-inline-block mb-3 px-3 py-1 rounded-pill"
                    style={{ backgroundColor: "rgba(242, 101, 32, 0.15)", border: "1px solid rgba(242, 101, 32, 0.3)" }}
                  >
                    <span className="fw-semibold fs-5" style={{ color: "#ff8a50" }}>
                      NBA Accredited &bull; 5 Times
                    </span>
                  </div>

                  <h1 className="fw-bold mb-4" style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2 }}>
                    Department of{" "}
                    <span className="kiet-text-secondary">Information Technology</span>
                  </h1>

                  <p className="mb-4 fs-3" style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.8)", textAlign: "justify" }}>
                    The Information Technology department builds future-ready professionals through strong computing
                    fundamentals and advanced domains like Quantum Computing, AWS Cloud, AI, ML, and Data Engineering.
                    With an industry-aligned curriculum, experiential learning, and globally recognized certifications,
                    students gain the skills and innovation mindset to excel in today&apos;s digital landscape.
                  </p>

                  <a
                    href="https://admission.kiet.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn px-5 py-3 text-white fw-semibold fs-3 kiet-bg-secondary"
                    style={{ borderRadius: "8px", border: "none", textDecoration: "none", boxShadow: "0 4px 16px rgba(242, 101, 32, 0.4)" }}
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
                        <div
                          className="text-center p-3 rounded-3"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <h3 className="fw-bold mb-1 fs-1 kiet-text-secondary">{item.value}</h3>
                          <p className="fw-semibold mb-0 fs-4" style={{ color: "#fff" }}>{item.label}</p>
                          <p className="mb-0 fs-5" style={{ color: "rgba(255,255,255,0.5)" }}>{item.sub}</p>
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
                        <div
                          className="text-center py-3 rounded-3"
                          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <h3 className="fw-bold mb-0 fs-2 kiet-text-secondary">{item.value}</h3>
                          <p className="mb-0 fs-5" style={{ color: "rgba(255,255,255,0.7)" }}>{item.label}</p>
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
