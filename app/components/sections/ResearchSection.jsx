"use client";

import { useEffect, useRef, useState } from "react";

/** Animates a number from 0 → target when the ref element enters the viewport. */
function useCountUp(target, duration = 1500) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const triggered = useRef(false);
  const decimals = String(target).includes(".") ? String(target).split(".")[1].length : 0;
  const multiplier = Math.pow(10, decimals);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target * multiplier) / multiplier);
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, multiplier]);

  return { value, ref };
}

/**
 * ResearchSection — Animated publications and patents stat cards,
 * followed by the Industry Academia Connect (Digital Conclave) session cards.
 */
export default function ResearchSection() {
  const researchPubs    = useCountUp(138);
  const researchPatents = useCountUp(48);

  return (
    <div id="research">
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          <h2
            className="fw-bold mb-4 kiet-text-primary"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", borderBottom: "3px solid var(--kiet-secondary)", paddingBottom: "10px", display: "inline-block" }}
          >
            Research Statistics
          </h2>

          <div className="row g-4 mt-2">
            {/* Publications card */}
            <div className="col-12 col-md-6">
              <div
                ref={researchPubs.ref}
                className="research-stat-card h-100"
                style={{
                  background: "linear-gradient(135deg, #fff8f5 0%, #fff 100%)",
                  borderRadius: "20px", overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(241, 91, 32, 0.12)",
                  border: "1px solid rgba(241, 91, 32, 0.1)",
                  position: "relative",
                }}
              >
                <div style={{ height: "5px", background: "linear-gradient(90deg, var(--kiet-secondary), #ff8a50)" }} />
                <div className="d-flex flex-column flex-lg-row align-items-center p-4 gap-4">
                  <div
                    className="flex-shrink-0"
                    style={{ width: "140px", height: "140px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", background: "#fff" }}
                  >
                    <img src="/publication.webp" alt="Publications" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="text-center text-lg-start flex-grow-1">
                    <div
                      className="kiet-text-secondary"
                      style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1 }}
                    >
                      {researchPubs.value}+
                    </div>
                    <h3 className="fw-bold mb-2 fs-1 kiet-text-primary">Publications</h3>
                    <p className="mb-0 fs-4 text-muted">Research papers published in reputed journals &amp; conferences</p>
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(241, 91, 32, 0.05)" }} />
              </div>
            </div>

            {/* Patents card */}
            <div className="col-12 col-md-6">
              <div
                ref={researchPatents.ref}
                className="research-stat-card h-100"
                style={{
                  background: "linear-gradient(135deg, #f0f4f8 0%, #fff 100%)",
                  borderRadius: "20px", overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(8, 82, 144, 0.12)",
                  border: "1px solid rgba(8, 82, 144, 0.1)",
                  position: "relative",
                }}
              >
                <div style={{ height: "5px", background: "linear-gradient(90deg, var(--kiet-primary), #1a5276)" }} />
                <div className="d-flex flex-column flex-lg-row align-items-center p-4 gap-4">
                  <div
                    className="flex-shrink-0"
                    style={{ width: "140px", height: "140px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", background: "#fff" }}
                  >
                    <img src="/patent.webp" alt="Patents" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div className="text-center text-lg-start flex-grow-1">
                    <div
                      className="kiet-text-primary"
                      style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1 }}
                    >
                      {researchPatents.value}+
                    </div>
                    <h3 className="fw-bold mb-2 fs-1 kiet-text-primary">Patents</h3>
                    <p className="mb-0 fs-4 text-muted">Innovative patents filed &amp; granted to faculty &amp; students</p>
                  </div>
                </div>
                <div style={{ position: "absolute", bottom: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(8, 82, 144, 0.05)" }} />
              </div>
            </div>
          </div>

          {/* Industry Academia Connect */}
          <div className="mt-5">
            <h2
              className="fw-bold mb-4 kiet-text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", borderBottom: "3px solid var(--kiet-secondary)", paddingBottom: "10px", display: "inline-block" }}
            >
              Industry Academia Connect
            </h2>
            <div className="row g-4">
              {/* Session 1 */}
              <div className="col-12 col-lg-6">
                <div
                  className="h-100 rounded-4 overflow-hidden"
                  style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease", border: "2px solid rgba(241, 91, 32, 0.1)" }}
                >
                  <div style={{ height: "5px", background: "linear-gradient(90deg, var(--kiet-secondary), var(--kiet-primary))" }} />
                  <div className="p-4">
                    <img src="/conclave/session1.webp" alt="Digital Conclave 2025 - Session 1" className="w-100 rounded-3 mb-3" style={{ objectFit: "cover", height: "300px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                    <h3 className="fw-bold mb-3 fs-2 kiet-text-primary">Digital Conclave 2025 - Session 1</h3>
                    <p className="mb-3 fs-4 text-muted">Expert Talk Series on emerging technologies and industry insights</p>
                    <div className="d-flex gap-3 flex-wrap">
                      <a href="/conclave/session-1" className="btn px-4 py-2 text-white fw-semibold fs-4 kiet-bg-primary" style={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(8, 82, 144, 0.3)" }}>
                        Read More
                      </a>
                      <a href="https://youtu.be/-Agff_KdsHg?si=A4XU7HZ-UkZd90gv" target="_blank" rel="noopener noreferrer" className="btn px-4 py-2 text-white fw-semibold fs-4 kiet-bg-secondary" style={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(241, 91, 32, 0.3)" }}>
                        Watch Video
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="col-12 col-lg-6">
                <div
                  className="h-100 rounded-4 overflow-hidden"
                  style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease", border: "2px solid rgba(241, 91, 32, 0.1)" }}
                >
                  <div style={{ height: "5px", background: "linear-gradient(90deg, var(--kiet-primary), var(--kiet-secondary))" }} />
                  <div className="p-4">
                    <img src="/conclave/session2.webp" alt="Digital Conclave 2025 - Session 2" className="w-100 rounded-3 mb-3" style={{ objectFit: "cover", height: "300px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }} />
                    <h3 className="fw-bold mb-3 fs-2 kiet-text-primary">Digital Conclave 2025 - Session 2</h3>
                    <p className="mb-3 fs-4 text-muted">Beyond Earth, Beyond Limits: Shaping Tomorrow&apos;s Technology</p>
                    <div className="d-flex gap-3 flex-wrap">
                      <a href="/conclave/session-2" className="btn px-4 py-2 text-white fw-semibold fs-4 kiet-bg-primary" style={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(8, 82, 144, 0.3)" }}>
                        Read More
                      </a>
                      <a href="https://youtu.be/-1hIAPpNZVU?si=9KpjtRl3uC59DF8a" target="_blank" rel="noopener noreferrer" className="btn px-4 py-2 text-white fw-semibold fs-4 kiet-bg-secondary" style={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(241, 91, 32, 0.3)" }}>
                        Watch Video
                      </a>
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


