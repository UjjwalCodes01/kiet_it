"use client";

import { useEffect, useRef, useState } from "react";

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

export default function ResearchSection() {
  const { ref: pubsRef, value: pubsValue } = useCountUp(138);
  const { ref: patentsRef, value: patentsValue } = useCountUp(48);

  return (
    <div id="research">
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          <h2 className="fw-bold mb-4 kiet-text-primary kiet-section-heading">
            Research Statistics
          </h2>

          <div className="row g-4 mt-2">
            {/* Publications card */}
            <div className="col-12 col-md-6">
              <div ref={pubsRef} className="research-stat-card h-100 kiet-research-card-warm">
                <div className="kiet-research-topbar-warm" />
                <div className="d-flex flex-column flex-lg-row align-items-center p-4 gap-4">
                  <div className="kiet-research-img-wrapper">
                    <img src="/publication.webp" alt="Publications" />
                  </div>
                  <div className="text-center text-lg-start flex-grow-1">
                    <div className="kiet-text-secondary kiet-stat-number">{pubsValue}+</div>
                    <h3 className="fw-bold mb-2 fs-1 kiet-text-primary">Publications</h3>
                    <p className="mb-0 fs-4 text-muted">Research papers published in reputed journals &amp; conferences</p>
                  </div>
                </div>
                <div className="kiet-decor-circle kiet-decor-circle-warm" />
              </div>
            </div>

            {/* Patents card */}
            <div className="col-12 col-md-6">
              <div ref={patentsRef} className="research-stat-card h-100 kiet-research-card-cool">
                <div className="kiet-research-topbar-cool" />
                <div className="d-flex flex-column flex-lg-row align-items-center p-4 gap-4">
                  <div className="kiet-research-img-wrapper">
                    <img src="/patent.webp" alt="Patents" />
                  </div>
                  <div className="text-center text-lg-start flex-grow-1">
                    <div className="kiet-text-primary kiet-stat-number">{patentsValue}+</div>
                    <h3 className="fw-bold mb-2 fs-1 kiet-text-primary">Patents</h3>
                    <p className="mb-0 fs-4 text-muted">Innovative patents filed &amp; granted to faculty &amp; students</p>
                  </div>
                </div>
                <div className="kiet-decor-circle kiet-decor-circle-cool" />
              </div>
            </div>
          </div>

          {/* Industry Academia Connect */}
          <div className="mt-5">
            <h2 className="fw-bold mb-4 kiet-text-primary kiet-section-heading">
              Industry Academia Connect
            </h2>
            <div className="row g-4">
              {/* Session 1 */}
              <div className="col-12 col-lg-6">
                <div className="h-100 rounded-4 overflow-hidden kiet-conclave-card">
                  <div className="kiet-conclave-topbar-warm" />
                  <div className="p-4">
                    <img src="/conclave/session1.webp" alt="Digital Conclave 2025 - Session 1" className="w-100 rounded-3 mb-3 kiet-conclave-img" />
                    <h3 className="fw-bold mb-3 fs-2 kiet-text-primary">Digital Conclave 2025 - Session 1</h3>
                    <p className="mb-3 fs-4 text-muted">Expert Talk Series on emerging technologies and industry insights</p>
                    <div className="d-flex gap-3 flex-wrap">
                      <a href="/conclave/session-1" className="btn px-4 py-2 text-white fw-semibold fs-4 kiet-bg-primary kiet-btn-primary-shadow">Read More</a>
                      <a href="https://youtu.be/-Agff_KdsHg?si=A4XU7HZ-UkZd90gv" target="_blank" rel="noopener noreferrer" className="btn px-4 py-2 text-white fw-semibold fs-4 kiet-bg-secondary kiet-btn-secondary-shadow">Watch Video</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="col-12 col-lg-6">
                <div className="h-100 rounded-4 overflow-hidden kiet-conclave-card">
                  <div className="kiet-conclave-topbar-cool" />
                  <div className="p-4">
                    <img src="/conclave/session2.webp" alt="Digital Conclave 2025 - Session 2" className="w-100 rounded-3 mb-3 kiet-conclave-img" />
                    <h3 className="fw-bold mb-3 fs-2 kiet-text-primary">Digital Conclave 2025 - Session 2</h3>
                    <p className="mb-3 fs-4 text-muted">Beyond Earth, Beyond Limits: Shaping Tomorrow&apos;s Technology</p>
                    <div className="d-flex gap-3 flex-wrap">
                      <a href="/conclave/session-2" className="btn px-4 py-2 text-white fw-semibold fs-4 kiet-bg-primary kiet-btn-primary-shadow">Read More</a>
                      <a href="https://youtu.be/-1hIAPpNZVU?si=9KpjtRl3uC59DF8a" target="_blank" rel="noopener noreferrer" className="btn px-4 py-2 text-white fw-semibold fs-4 kiet-bg-secondary kiet-btn-secondary-shadow">Watch Video</a>
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
