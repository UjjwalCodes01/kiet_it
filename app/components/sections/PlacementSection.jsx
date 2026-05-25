"use client";

import { useEffect, useRef, useState } from "react";

/* Recruiter logo paths — 49 logos, all converted to .webp */
const recruiterLogos = Array.from(
  { length: 49 },
  (_, idx) => `/assets/images/kiet/placement/recruiters/${idx + 1}.webp`
);
const recruitersLoop = [...recruiterLogos, ...recruiterLogos];

/**
 * Custom hook that animates a number from 0 → target when the ref enters the viewport.
 */
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
 * PlacementSection — Animated stat counters + infinite recruiter logo marquee.
 */
export default function PlacementSection() {
  const { ref: highestRef, value: highestVal }   = useCountUp(1.78);
  const { ref: top10Ref, value: top10Val }       = useCountUp(16);
  const { ref: averageRef, value: averageVal }   = useCountUp(6.5);
  const { ref: companiesRef, value: companiesVal } = useCountUp(300);

  const stats = [
    { ref: highestRef,   value: highestVal,   suffix: " Cr",   label: "Highest Package",          variant: "orange", note: "PROTON AG, Switzerland" },
    { ref: top10Ref,     value: top10Val,     suffix: " LPA",  label: "Top 10% Average(2022-25)", variant: "navy",   note: "Average of top 10% placed students" },
    { ref: averageRef,   value: averageVal,   suffix: " LPA",  label: "Average Package(2022-25)", variant: "orange", note: "Overall average placement package" },
    { ref: companiesRef, value: companiesVal, suffix: "+",     label: "Total Companies",          variant: "navy",   note: "Recruiting partners across industries" },
  ];

  return (
    <div id="placement">
      {/* Stat cards */}
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          <h2
            className="fw-bold mb-2 fs-1 kiet-text-primary"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", borderBottom: "3px solid var(--kiet-secondary)", paddingBottom: "10px", display: "inline-block" }}
          >
            Placement Overview
          </h2>
          <p className="fs-3 text-muted mb-4">Our students are placed across top-tier companies with exceptional packages</p>

          <div className="row g-4">
            {stats.map((item) => (
              <div key={item.label} className="col-6 col-lg-3">
                <div
                  ref={item.ref}
                  className={`placement-stat-card ${item.variant} h-100`}
                  style={{ boxShadow: "0 8px 24px rgba(0,0,0,0.07)" }}
                >
                  <div
                    className="mb-2"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 800,
                      lineHeight: 1,
                      color: item.variant === "orange" ? "var(--kiet-secondary)" : "var(--kiet-primary)",
                    }}
                  >
                    {item.value}{item.suffix}
                  </div>
                  <p className="fw-bold mb-1 fs-3" style={{ color: "var(--kiet-tertiary)" }}>{item.label}</p>
                  <p className="mb-0 fs-5 text-muted d-none d-md-block">{item.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter logo marquee */}
      <div className="m-5">
        <div className="section-title section-center mb-0">
          <span className="fw-normal h3">Our Recruiters</span>
        </div>
        <div className="w-100 overflow-hidden p-5 custom-slider">
          <div>
            <div className="slide-track gap-5">
              {recruitersLoop.map((logo, index) => (
                <div key={`${logo}-${index}`} className="slide">
                  <img
                    src={logo}
                    alt={`Recruiter ${index + 1}`}
                    loading="lazy"
                    className="img-fluid"
                    height="140"
                    width="140"
                    style={{ height: "auto" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

