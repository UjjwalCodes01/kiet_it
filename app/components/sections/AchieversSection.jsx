"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ACHIEVERS } from "@/app/data/it-achievers";

/**
 * Computes carousel pagination metrics given a scroll container.
 * Returns cardsPerView, stepSize (px), and total pageCount.
 */
function getCarouselMetrics(container, itemSelector, totalItems) {
  if (!container) return { cardsPerView: 1, stepSize: 0, pageCount: 1 };
  const firstCard = container.querySelector(itemSelector);
  if (!firstCard) return { cardsPerView: 1, stepSize: 0, pageCount: 1 };

  const gap = parseFloat(window.getComputedStyle(container).columnGap || "0");
  const cardWidth = firstCard.getBoundingClientRect().width;
  const cardStride = cardWidth + gap;
  const cardsPerView = Math.max(1, Math.floor((container.clientWidth + gap) / Math.max(cardStride, 1)));
  const pageCount = Math.max(1, Math.ceil(totalItems / cardsPerView));
  return { cardsPerView, stepSize: cardStride * cardsPerView, pageCount };
}

/**
 * AchieversSection — Horizontally scrollable achiever card carousel with
 * dot pagination, prev/next buttons, and 5-second auto-play.
 */
export default function AchieversSection() {
  const containerRef = useRef(null);
  const hoveredRef = useRef(false);
  const autoplayRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const syncPagination = () => {
    const { pageCount: pc, stepSize } = getCarouselMetrics(containerRef.current, ".achiever-card-wrapper", ACHIEVERS.length);
    setPageCount(pc);
    if (stepSize > 0 && containerRef.current) {
      setPage(Math.min(pc - 1, Math.max(0, Math.round(containerRef.current.scrollLeft / stepSize))));
    }
  };

  const scrollToPage = useCallback((requested) => {
    const { pageCount: pc, stepSize } = getCarouselMetrics(containerRef.current, ".achiever-card-wrapper", ACHIEVERS.length);
    const bounded = Math.min(pc - 1, Math.max(0, requested));
    setPageCount(pc);
    setPage(bounded);
    if (stepSize > 0 && containerRef.current) {
      containerRef.current.scrollTo({ left: bounded * stepSize, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    syncPagination();
    const onScroll = () => syncPagination();
    const onResize = () => syncPagination();
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Auto-play: advance one page every 5 s, pause on hover */
  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      if (hoveredRef.current) return;
      setPage((prev) => {
        const { pageCount: pc, stepSize } = getCarouselMetrics(containerRef.current, ".achiever-card-wrapper", ACHIEVERS.length);
        const next = prev >= pc - 1 ? 0 : prev + 1;
        if (stepSize > 0 && containerRef.current) {
          containerRef.current.scrollTo({ left: next * stepSize, behavior: "smooth" });
        }
        return next;
      });
    }, 5000);
    return () => clearInterval(autoplayRef.current);
  }, []);

  return (
    <div id="achievers">
      <section
        className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5"
        style={{ padding: "0 0 5rem 0", position: "relative" }}
      >
        <div className="p-3 p-md-4 p-lg-5">
          <div className="mb-4">
            <h2
              className="fw-bold mb-3 kiet-text-primary"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", borderBottom: "3px solid var(--kiet-secondary)", paddingBottom: "10px", display: "inline-block" }}
            >
              Our Achievers
            </h2>
          </div>

          {/* Scrollable achiever cards */}
          <div
            ref={containerRef}
            className="d-flex overflow-auto gap-3 achievers-scroll-container"
            style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
            onMouseEnter={() => { hoveredRef.current = true; }}
            onMouseLeave={() => { hoveredRef.current = false; }}
          >
            {ACHIEVERS.map((item) => (
              <div
                key={item.name}
                className="achiever-card-wrapper"
                style={{ flex: "0 0 180px", scrollSnapAlign: "start" }}
              >
                <div
                  className="achiever-card"
                  style={{
                    backgroundColor: "white", borderRadius: "16px", padding: "1rem", height: "100%",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease",
                    cursor: "default", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden",
                      position: "relative", backgroundColor: "#e5e7eb",
                      border: "3px solid var(--kiet-secondary)", marginBottom: "0.75rem",
                    }}
                  >
                    <img
                      alt={item.name}
                      src={item.image}
                      style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "center 20%" }}
                    />
                  </div>
                  <h4 className="fs-4 fw-bold text-dark mb-1" style={{ lineHeight: 1.2 }}>{item.name}</h4>
                  <p className="fs-5 fw-semibold mb-1 kiet-text-secondary">{item.package}</p>
                  <p className="fs-5 text-muted mb-0">{item.company}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Controls: prev/next + dot pagination */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                style={{ width: "32px", height: "32px", border: "1px solid var(--kiet-secondary)", backgroundColor: "transparent", color: "var(--kiet-secondary)" }}
                aria-label="Previous achiever"
                onClick={() => scrollToPage(page - 1)}
                disabled={page === 0}
              >
                <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>‹</span>
              </button>
              <button
                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                style={{ width: "32px", height: "32px", border: "1px solid var(--kiet-secondary)", backgroundColor: "transparent", color: "var(--kiet-secondary)" }}
                aria-label="Next achiever"
                onClick={() => scrollToPage(page + 1)}
                disabled={page >= pageCount - 1}
              >
                <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>›</span>
              </button>
            </div>
            <div className="d-flex gap-2">
              {Array.from({ length: pageCount }).map((_, idx) => (
                <button
                  key={`achiever-dot-${idx}`}
                  type="button"
                  aria-label={`Go to achiever page ${idx + 1}`}
                  onClick={() => scrollToPage(idx)}
                  style={{
                    width: "10px", height: "10px", borderRadius: "50%", padding: 0, cursor: "pointer",
                    backgroundColor: page === idx ? "var(--kiet-secondary)" : "transparent",
                    border: page === idx ? "1px solid var(--kiet-secondary)" : "1px solid #ced4da",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

