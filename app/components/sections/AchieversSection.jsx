"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ACHIEVERS } from "@/app/data/it-achievers";

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
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 kiet-section-bottom-pad position-relative">
        <div className="p-3 p-md-4 p-lg-5">
          <div className="mb-4">
            <h2 className="fw-bold mb-3 kiet-text-primary kiet-section-heading">
              Our Achievers
            </h2>
          </div>

          <div
            ref={containerRef}
            className="d-flex overflow-auto gap-3 achievers-scroll-container kiet-achiever-scroll"
            onMouseEnter={() => { hoveredRef.current = true; }}
            onMouseLeave={() => { hoveredRef.current = false; }}
          >
            {ACHIEVERS.map((item) => (
              <div key={item.name} className="achiever-card-wrapper kiet-achiever-card-wrapper">
                <div className="achiever-card kiet-achiever-card">
                  <div className="kiet-achiever-avatar">
                    <img alt={item.name} src={item.image} />
                  </div>
                  <h4 className="fs-4 fw-bold text-dark mb-1 kiet-line-height-12">{item.name}</h4>
                  <p className="fs-5 fw-semibold mb-1 kiet-text-secondary">{item.package}</p>
                  <p className="fs-5 text-muted mb-0">{item.company}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between align-items-center mt-3">
            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 kiet-carousel-nav-btn"
                aria-label="Previous achiever"
                onClick={() => scrollToPage(page - 1)}
                disabled={page === 0}
              >
                <span className="kiet-carousel-nav-icon">‹</span>
              </button>
              <button
                className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0 kiet-carousel-nav-btn"
                aria-label="Next achiever"
                onClick={() => scrollToPage(page + 1)}
                disabled={page >= pageCount - 1}
              >
                <span className="kiet-carousel-nav-icon">›</span>
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
