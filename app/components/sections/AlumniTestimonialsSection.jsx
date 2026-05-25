"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ALUMNI_TESTIMONIALS } from "@/app/data/it-alumni";

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

export default function AlumniTestimonialsSection() {
  const containerRef = useRef(null);
  const hoveredRef = useRef(false);
  const autoplayRef = useRef(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  const syncPagination = () => {
    const { pageCount: pc, stepSize } = getCarouselMetrics(containerRef.current, ".alumni-card-wrapper", ALUMNI_TESTIMONIALS.length);
    setPageCount(pc);
    if (stepSize > 0 && containerRef.current) {
      setPage(Math.min(pc - 1, Math.max(0, Math.round(containerRef.current.scrollLeft / stepSize))));
    }
  };

  const scrollToPage = useCallback((requested) => {
    const { pageCount: pc, stepSize } = getCarouselMetrics(containerRef.current, ".alumni-card-wrapper", ALUMNI_TESTIMONIALS.length);
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
        const { pageCount: pc, stepSize } = getCarouselMetrics(containerRef.current, ".alumni-card-wrapper", ALUMNI_TESTIMONIALS.length);
        const next = prev >= pc - 1 ? 0 : prev + 1;
        if (stepSize > 0 && containerRef.current) {
          containerRef.current.scrollTo({ left: next * stepSize, behavior: "smooth" });
        }
        return next;
      });
    }, 6000);
    return () => clearInterval(autoplayRef.current);
  }, []);

  return (
    <div className="mt-5">
      <h2 className="fw-bold mb-4 kiet-text-primary kiet-section-heading">
        Alumni Testimonials
      </h2>

      <div
        ref={containerRef}
        className="d-flex overflow-auto gap-4 alumni-scroll-container kiet-alumni-scroll"
        onMouseEnter={() => { hoveredRef.current = true; }}
        onMouseLeave={() => { hoveredRef.current = false; }}
      >
        {ALUMNI_TESTIMONIALS.map((alumni) => (
          <div key={alumni.name} className="alumni-card-wrapper kiet-alumni-card-wrapper">
            <div className="h-100 p-4 rounded-4 alumni-testimonial-card kiet-alumni-card">
              <div className="d-flex gap-3 align-items-start mb-3">
                <div className="kiet-alumni-avatar">
                  <img src={alumni.image} alt={alumni.name} />
                </div>
                <div>
                  <h4 className="fw-bold mb-1 fs-3 kiet-text-primary">{alumni.name}</h4>
                  <p className="mb-0 fs-5 kiet-text-secondary">{alumni.designation} at {alumni.company}</p>
                  <p className="mb-0 fs-6 text-muted">{alumni.batch}</p>
                </div>
              </div>
              <div className="d-flex align-items-start gap-2 flex-grow-1">
                <span className="fw-bold kiet-text-secondary kiet-alumni-quote-icon">&ldquo;</span>
                <p className="mb-0 fs-4 fst-italic kiet-text-soft-muted kiet-text-justify-17">{alumni.quote}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <div className="d-flex gap-2">
          <button
            className="btn rounded-circle d-flex align-items-center justify-content-center p-0 kiet-carousel-nav-btn"
            aria-label="Previous testimonial"
            onClick={() => scrollToPage(page - 1)}
            disabled={page === 0}
          >
            <span className="kiet-carousel-nav-icon">‹</span>
          </button>
          <button
            className="btn rounded-circle d-flex align-items-center justify-content-center p-0 kiet-carousel-nav-btn"
            aria-label="Next testimonial"
            onClick={() => scrollToPage(page + 1)}
            disabled={page >= pageCount - 1}
          >
            <span className="kiet-carousel-nav-icon">›</span>
          </button>
        </div>
        <div className="d-flex gap-2">
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button
              key={`alumni-dot-${idx}`}
              type="button"
              aria-label={`Go to testimonial page ${idx + 1}`}
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
  );
}
