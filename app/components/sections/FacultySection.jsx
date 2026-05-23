/**
 * FacultySection — Auto-scrolling marquee of faculty member cards.
 * Accepts the full faculty array and a link to the full faculty directory.
 */
export default function FacultySection({ faculty, facultyPageHref }) {
  return (
    <div id="faculty">
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          {/* Header row with "View All" link */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2
              className="fw-bold m-0 kiet-text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", borderBottom: "3px solid var(--kiet-secondary)", paddingBottom: "10px", display: "inline-block" }}
            >
              Faculty
            </h2>
            <a
              className="btn fs-3 btn-link text-decoration-none fw-semibold px-2 py-1 kiet-text-secondary"
              href={facultyPageHref}
            >
              View All<span className="ms-1">→</span>
            </a>
          </div>

          {/* Infinite scroll marquee */}
          <div className="faculty-marquee-wrapper">
            <div className="faculty-marquee-track">
              {/* Leading spacers so the marquee feels continuous */}
              <div style={{ width: "200px", flexShrink: 0 }} />
              <div style={{ width: "200px", flexShrink: 0 }} />
              <div style={{ width: "200px", flexShrink: 0 }} />

              {[...faculty, ...faculty].map((member, idx) => (
                <div
                  key={`${member.name}-${idx}`}
                  className="card border-0 shadow-sm flex-shrink-0"
                  style={{ width: "200px", borderRadius: "12px", cursor: "pointer" }}
                >
                  <div
                    className="overflow-hidden"
                    style={{
                      height: "240px",
                      borderTopLeftRadius: "12px",
                      borderTopRightRadius: "12px",
                      position: "relative",
                      backgroundColor: "#f8f9fa",
                    }}
                  >
                    <img
                      alt={member.name}
                      src={member.image}
                      style={{
                        position: "absolute", height: "100%", width: "100%",
                        left: 0, top: 0, objectFit: "cover", objectPosition: "center top",
                      }}
                    />
                  </div>
                  <div className="card-body text-center p-2 p-md-3">
                    <h3 className="card-title fw-bold mb-2 fs-4 kiet-text-primary" style={{ lineHeight: 1.3 }}>
                      {member.name}
                    </h3>
                    <p className="card-text text-center mb-3 fs-5" style={{ color: "#666", fontWeight: 500, lineHeight: 1.4 }}>
                      {member.role}
                    </p>
                    <p className="card-text small text-center text-muted mb-0 fs-6" style={{ lineHeight: 1.4 }}>
                      {member.qualification}
                      {member.university && (
                        <>
                          <br />
                          <span style={{ fontSize: "0.85rem", fontStyle: "italic" }}>{member.university}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

