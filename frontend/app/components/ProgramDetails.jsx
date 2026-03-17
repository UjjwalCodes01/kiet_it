"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Roadmap from "./Roadmap";
import { TESTIMONIALS } from "@/app/data/cse-aiml-testimonials";
import { PUBLICATIONS } from "@/app/data/cse-aiml-publications";

const recruiterLogos = Array.from({ length: 49 }, (_, idx) => `/assets/images/kiet/placement/recruiters/${idx + 1}.${[3, 5, 10, 14, 15, 17, 20, 27, 32, 37, 45, 48, 49].includes(idx + 1) ? "jpg" : "png"}`);
const recruitersLoop = [...recruiterLogos, ...recruiterLogos];

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

export default function ProgramDetails({ faculty, facultyPageHref }) {
  const [openSection, setOpenSection] = useState("vision");
  const [deanExpanded, setDeanExpanded] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const testimonialsRef = useRef(null);
  const publicationsRef = useRef(null);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [testimonialPageCount, setTestimonialPageCount] = useState(1);
  const [publicationPage, setPublicationPage] = useState(0);
  const [publicationPageCount, setPublicationPageCount] = useState(1);
  const testimonialAutoplayRef = useRef(null);
  const testimonialHoveredRef = useRef(false);

  const getCarouselMetrics = (container, itemSelector, totalItems) => {
    if (!container) {
      return { cardsPerView: 1, stepSize: 0, pageCount: 1 };
    }

    const firstCard = container.querySelector(itemSelector);
    if (!firstCard) {
      return { cardsPerView: 1, stepSize: 0, pageCount: 1 };
    }

    const containerStyle = window.getComputedStyle(container);
    const gap = parseFloat(containerStyle.columnGap || containerStyle.gap || "0");
    const cardWidth = firstCard.getBoundingClientRect().width;
    const cardStride = cardWidth + gap;
    const cardsPerView = Math.max(1, Math.floor((container.clientWidth + gap) / Math.max(cardStride, 1)));
    const pageCount = Math.max(1, Math.ceil(totalItems / cardsPerView));

    return { cardsPerView, stepSize: cardStride * cardsPerView, pageCount };
  };

  const syncTestimonialPagination = () => {
    const container = testimonialsRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".testimonial-card-wrapper", TESTIMONIALS.length);
    setTestimonialPageCount(pageCount);

    if (stepSize <= 0) {
      setTestimonialPage(0);
      return;
    }

    const currentPage = Math.min(pageCount - 1, Math.max(0, Math.round(container.scrollLeft / stepSize)));
    setTestimonialPage(currentPage);
  };

  const scrollToTestimonialPage = useCallback((requestedPage) => {
    const container = testimonialsRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".testimonial-card-wrapper", TESTIMONIALS.length);
    const boundedPage = Math.min(pageCount - 1, Math.max(0, requestedPage));
    setTestimonialPageCount(pageCount);
    setTestimonialPage(boundedPage);

    if (stepSize > 0) {
      container.scrollTo({ left: boundedPage * stepSize, behavior: "smooth" });
    }
  }, []);

  const syncPublicationPagination = () => {
    const container = publicationsRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".publication-card-wrapper", PUBLICATIONS.length);
    setPublicationPageCount(pageCount);

    if (stepSize <= 0) {
      setPublicationPage(0);
      return;
    }

    const currentPage = Math.min(pageCount - 1, Math.max(0, Math.round(container.scrollLeft / stepSize)));
    setPublicationPage(currentPage);
  };

  const scrollToPublicationPage = (requestedPage) => {
    const container = publicationsRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".publication-card-wrapper", PUBLICATIONS.length);
    const boundedPage = Math.min(pageCount - 1, Math.max(0, requestedPage));
    setPublicationPageCount(pageCount);
    setPublicationPage(boundedPage);

    if (stepSize > 0) {
      container.scrollTo({ left: boundedPage * stepSize, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const testimonialsContainer = testimonialsRef.current;
    const publicationsContainer = publicationsRef.current;
    if (!testimonialsContainer && !publicationsContainer) {
      return;
    }

    syncTestimonialPagination();
    syncPublicationPagination();

    const onTestimonialScroll = () => syncTestimonialPagination();
    const onPublicationsScroll = () => syncPublicationPagination();
    const onResize = () => {
      syncTestimonialPagination();
      syncPublicationPagination();
    };

    testimonialsContainer?.addEventListener("scroll", onTestimonialScroll, { passive: true });
    publicationsContainer?.addEventListener("scroll", onPublicationsScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      testimonialsContainer?.removeEventListener("scroll", onTestimonialScroll);
      publicationsContainer?.removeEventListener("scroll", onPublicationsScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Testimonial auto-play
  useEffect(() => {
    const startAutoplay = () => {
      testimonialAutoplayRef.current = setInterval(() => {
        if (testimonialHoveredRef.current) return;
        setTestimonialPage((prev) => {
          const container = testimonialsRef.current;
          if (!container) return prev;
          const { pageCount, stepSize } = getCarouselMetrics(container, ".testimonial-card-wrapper", TESTIMONIALS.length);
          const nextPage = prev >= pageCount - 1 ? 0 : prev + 1;
          if (stepSize > 0) {
            container.scrollTo({ left: nextPage * stepSize, behavior: "smooth" });
          }
          return nextPage;
        });
      }, 5000);
    };

    startAutoplay();
    return () => clearInterval(testimonialAutoplayRef.current);
  }, []);

  const onTestimonialMouseEnter = () => {
    testimonialHoveredRef.current = true;
  };
  const onTestimonialMouseLeave = () => {
    testimonialHoveredRef.current = false;
  };

  const placementHighest = useCountUp(60);
  const placementTop10 = useCountUp(17);
  const placementAverage = useCountUp(6.5);
  const placementCompanies = useCountUp(300);

  const researchPubs = useCountUp(123);
  const researchPatents = useCountUp(31);
  const researchProjects = useCountUp(2);
  const researchGrants = useCountUp(50);

  return (
    <>
      <div id="overview">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-4 py-3 py-md-4">
          <div style={{ borderRadius: "20px", overflow: "hidden", position: "relative" }}>
            {/* Dark background with diagonal accent */}
            <div style={{ background: "linear-gradient(135deg, #001a3a 0%, #002855 60%, #003d7a 100%)", position: "relative" }}>
              {/* Decorative diagonal stripe */}
              <div className="d-none d-lg-block" style={{ position: "absolute", top: 0, right: 0, width: "45%", height: "100%", background: "linear-gradient(135deg, transparent 0%, rgba(242, 101, 32, 0.08) 100%)", clipPath: "polygon(20% 0, 100% 0, 100% 100%, 0% 100%)" }} />
              <div className="row g-0 align-items-center" style={{ position: "relative", zIndex: 1 }}>
                <div className="col-12 col-lg-7 p-4 p-md-5">
                  <div className="py-3 py-lg-5 px-2 px-lg-4">
                    <div className="d-inline-block mb-3 px-3 py-1 rounded-pill" style={{ backgroundColor: "rgba(242, 101, 32, 0.15)", border: "1px solid rgba(242, 101, 32, 0.3)" }}>
                      <span className="fw-semibold fs-5" style={{ color: "#ff8a50" }}>NBA Accredited &bull; 5 Times</span>
                    </div>
                    <h2 className="fw-bold mb-4" style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", lineHeight: 1.2 }}>
                      Department of <span style={{ color: "#f26520" }}>Information Technology</span>
                    </h2>
                    <p className="mb-4 fs-3" style={{ lineHeight: 1.8, color: "rgba(255,255,255,0.8)", textAlign: "justify" }}>
                      The Department of Information Technology at KIET is committed to shaping future-ready professionals through an industry-aligned curriculum, cutting-edge research, and hands-on experience in emerging technologies. With a focus on AI, data science, cloud computing, cybersecurity, and IoT, students graduate equipped with the skills, adaptability, and problem-solving mindset to lead in a rapidly evolving digital world.
                    </p>
                    <div className="d-flex flex-wrap gap-3">
                      <a
                        href="https://admission.kiet.edu/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn px-5 py-3 text-white fw-semibold fs-3"
                        style={{ backgroundColor: "#f26520", borderRadius: "8px", border: "none", textDecoration: "none", display: "inline-block", boxShadow: "0 4px 16px rgba(242, 101, 32, 0.4)" }}
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-5">
                  {/* Desktop stats grid */}
                  <div className="d-none d-lg-block p-4 p-lg-5">
                    <div className="row g-3">
                      {[
                        ["95%", "Placements in 2025", "Leading Tech Companies"],
                        ["650+", "Globally Certified", "AI \u2022 ML \u2022 Cloud"],
                        ["240+300", "Annual Intake", "CSE (AI) + CSE (AI&ML)"],
                        ["\u20B97 Cr", "Alumni Funding", "Startup : 2025 Batch"],
                      ].map((item) => (
                        <div key={item[0]} className="col-6">
                          <div className="text-center p-3 rounded-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px" }}>
                            <h3 className="fw-bold mb-1 fs-1" style={{ color: "#f26520" }}>{item[0]}</h3>
                            <p className="fw-semibold mb-0 fs-4" style={{ color: "#fff" }}>{item[1]}</p>
                            <p className="mb-0 fs-5" style={{ color: "rgba(255,255,255,0.5)" }}>{item[2]}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Mobile stats */}
                  <div className="d-lg-none px-4 pb-4">
                    <div className="row g-2">
                      {[
                        ["95%", "Placements in 2025"],
                        ["650+", "Globally Certified"],
                        ["240+300", "Annual Intake"],
                        ["\u20B97 Cr", "Alumni Funding"],
                      ].map((item) => (
                        <div key={item[0]} className="col-6">
                          <div className="text-center py-3 rounded-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                            <h3 className="fw-bold mb-0 fs-2" style={{ color: "#f26520" }}>{item[0]}</h3>
                            <p className="mb-0 fs-5" style={{ color: "rgba(255,255,255,0.7)" }}>{item[1]}</p>
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

      <div id="infrastructure">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
          <div className="p-3 p-md-4 p-lg-5">
            <h2 className="fw-bold mb-4 mb-md-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
              Department&apos;s Highlights
            </h2>
            <div className="row g-4">
              {[
                ["/cse-ai-assets/images/key3.jpeg", "Introduction of Advanced AI-Centric Core Courses", "Our curriculum is systematically structured to progress from foundational sciences and programming to advanced domains such as AI, ML, DL, Gen AI, Cloud Computing, Computer Vision, Data Engineering, Cyber Security, and Full-Stack Development delivered by a highly qualified academic team of faculty members."],
                ["/cse-ai-assets/images/Experimental-Learning.JPG", "Strong Focus on Experiential & AI-Driven Learning", "Our department adopts a future-focused learning approach through AI-driven assessments, Project-Based Learning (PBL), social internships, and industry-oriented capstone projects. Students gain hands-on experience with CodeTantra, AWS Academy, HackerRank, Kaggle, WeXL, and Infosys Springboard."],
                ["/cse-ai-assets/images/key1.jpeg", "Industry-Aligned Specializations with Global Certifications", "Our Department blends strong academic foundations with industry-ready skills through professional electives aligned with globally recognized certifications, offering specialization tracks in AI & ML, Cloud Operations & Security, and Data Engineering & Cloud Analytics."],
                ["/cse-ai-assets/images/key4.jpeg", "Structured Placement Preparation Ecosystem", "The department provides focused preparation through DSA training, coding contests on iamneo/CodeTantra/HackerRank/CodeChef, AMCAT assessments, resume and LinkedIn optimization support, technical bootcamps, and personalized mentoring."],
              ].map((item) => (
                <div key={item[1]} className="col-12 col-lg-6">
                  <div className="d-none d-md-flex bg-white rounded-3 overflow-hidden h-100 highlight-card" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease", cursor: "pointer", borderLeft: "4px solid transparent" }}>
                    <div style={{ flex: "0 0 160px", position: "relative" }}>
                      <img src={item[0]} alt={item[1]} className="w-100 h-100" style={{ objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
                    </div>
                    <div className="p-5 m-2 flex-grow-1">
                      <h3 className="fw-semibold mb-2 fs-2" style={{ color: "#0d3b66", lineHeight: 1.4 }}>{item[1]}</h3>
                      <p className="mb-0 fs-4" style={{ color: "#666", lineHeight: 1.5, textAlign: "justify" }}>{item[2]}</p>
                    </div>
                  </div>
                  <div className="d-md-none bg-white rounded-3 overflow-hidden" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", border: "1px solid rgba(242, 101, 32, 0.12)" }}>
                    <div style={{ height: "180px", overflow: "hidden" }}>
                      <img src={item[0]} alt={item[1]} className="w-100 h-100" style={{ objectFit: "cover" }} />
                    </div>
                    <div className="p-3">
                      <h3 className="fw-semibold mb-2 fs-2" style={{ color: "#0d3b66", lineHeight: 1.4 }}>{item[1]}</h3>
                      <p className="mb-0 fs-4" style={{ color: "#666", lineHeight: 1.5, textAlign: "justify" }}>{item[2]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div id="placement">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
          <div className="p-3 p-md-4 p-lg-5">
            <h2 className="fw-bold mb-2 fs-1" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
              Placement Overview
            </h2>
            <p className="fs-3 text-muted mb-4">Our students are placed across top-tier companies with exceptional packages</p>
            <div className="row g-4">
              {[
                [placementHighest, "60", " LPA", "Highest Package", "orange", "Highest offer in the department"],
                [placementTop10, "17", " LPA", "Top 10% Placement", "navy", "Average of top 10% placed students"],
                [placementAverage, "6.5", " LPA", "Average Package", "orange", "Overall average placement package"],
                [placementCompanies, "300", "+", "Total Companies", "navy", "Recruiting partners across industries"],
              ].map((item) => (
                <div key={item[3]} className="col-6 col-lg-3">
                  <div ref={item[0].ref} className={`placement-stat-card ${item[4]} h-100`} style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.07)" }}>
                    <div className="mb-2" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1, color: item[4] === "orange" ? "#f26520" : "#002855" }}>
                      {item[0].value}{item[2]}
                    </div>
                    <p className="fw-bold mb-1 fs-3" style={{ color: "#1a1a2e" }}>{item[3]}</p>
                    <p className="mb-0 fs-5 text-muted d-none d-md-block">{item[5]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

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
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Roadmap />

      <div id="coe">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
          <div className="p-3 p-md-4 p-lg-5">
            <h2 className="fw-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
              Centre of Excellence
            </h2>
            <div className="rounded-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #fff8f5 0%, #fff 50%, #f0f4f8 100%)", border: "2px solid rgba(242, 101, 32, 0.12)" }}>
              <div style={{ height: "5px", background: "linear-gradient(90deg, #f26520, #002855)" }} />
              <div className="p-4 p-md-5">
                <div className="d-inline-block mb-3 px-3 py-1 rounded-pill" style={{ backgroundColor: "rgba(0, 40, 85, 0.08)", border: "1px solid rgba(0, 40, 85, 0.15)" }}>
                  <span className="fw-semibold fs-5" style={{ color: "#002855" }}>Industry &ndash; Academia Initiative</span>
                </div>
                <h3 className="fw-bold mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#002855", lineHeight: 1.3 }}>
                  Tech Mahindra <span style={{ color: "#f26520" }}>Centre of Excellence</span>
                </h3>
                <p className="fs-3 mb-0" style={{ lineHeight: 1.8, color: "#444", textAlign: "justify", maxWidth: "900px" }}>
                  The Tech Mahindra Centre of Excellence at KIET, established within the Department of Information Technology, is an industry&ndash;academia initiative focused on employability enhancement. It provides training to students selected by Tech Mahindra, ensuring their skills align with current industry demands.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="clubs">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
          <div className="p-3 p-md-4 p-lg-5">
            <div className="row mb-4">
              <div className="col-12 text-start">
                <h2 className="fw-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                  Our Clubs
                </h2>
              </div>
            </div>
            <div className="clubs-stack">
              {[
                ["Innogeeks", "/it_club/innogeeks.png", "#", "At Innogeeks, we embody our motto, 'We Learn, We Teach, We Conquer,' as a guiding principle in fostering a vibrant community of innovators, developers, and tech enthusiasts. Over the years, Innogeeks has grown into a cornerstone of technical excellence at KIET, fostering a culture of collaboration, learning, and impactful innovation.", "#002855"],
                ["GEEK Room", "/it_club/geekroom.png", "#", "GEEK Room is a dynamic tech community dedicated to fostering innovation, collaboration, and continuous learning. The chapter actively hosts hackathons, technical events, workshops, and engaging meetups that bring together passionate students from diverse domains.", "#00304c"],
              ].map((club) => (
                <div key={club[0]} className="club-card-outer">
                  <div className="club-card-inner bg-white h-100 border-0" style={{ borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)", minHeight: "280px" }}>
                    <div style={{ height: "6px", background: `linear-gradient(90deg, #f26520 0%, ${club[4]} 100%)` }} />
                    <div className="p-4 p-md-5 d-flex flex-column flex-md-row h-100">
                      <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4 align-self-center">
                        <div style={{ width: "110px", height: "110px", borderRadius: "50%", overflow: "hidden", position: "relative", border: "3px solid #f0f0f0", backgroundColor: "#fff", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }}>
                          <img alt={club[0]} src={club[1]} style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, objectFit: "cover", color: "transparent" }} />
                        </div>
                      </div>
                      <div className="flex-grow-1 text-center text-md-start d-flex flex-column justify-content-center">
                        <h3 className="fw-bold mb-2 fs-1" style={{ color: club[4] }}>{club[0]}</h3>
                        <p className="text-muted fs-3 mb-4" style={{ lineHeight: 1.7, textAlign: "justify" }}>{club[3]}</p>
                        <div>
                          <a href={club[2]} target="_blank" rel="noopener noreferrer" className="btn px-5 py-2 fw-semibold fs-3 text-white" style={{ backgroundColor: "#f26520", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(242, 101, 32, 0.3)" }}>
                            Visit Website
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div id="dean-message">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
          <div className="p-3 p-md-4 p-lg-5">
            <div className="p-3 p-md-4 p-lg-5" style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)", borderRadius: "16px", backgroundColor: "#fff" }}>
              <div className="row g-2 py-3">
                <div className="col-12">
                  <h2 className="fw-bold mb-2" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                    Dean&apos;s Message
                  </h2>
                </div>
                <div className="col-12">
                  <div className="row g-4 align-items-start">
                    <div className="col-12 col-lg-4 order-0 order-lg-1">
                      <div className="text-center">
                        <img src="/Dean_It/dr_puneet_goswami.png" alt="Dr. Puneet Goswami - Dean, IT" className="img-fluid rounded-3" style={{ maxWidth: "100%", height: "auto", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", objectFit: "cover" }} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-8 order-1 order-lg-0">
                      <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                        The Department of Information Technology, accredited by the NBA five times and currently valid up to June 2028, is committed to excellence in teaching, learning, and research. Our industry-aligned curriculum equips students with strong technical foundations, adaptability, and problem-solving skills to thrive in a rapidly evolving technological landscape driven by innovation in artificial intelligence, data science, cloud computing, cybersecurity, and the Internet of Things.
                      </p>
                      <div className={deanExpanded ? "" : "d-none d-lg-block"}>
                        <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                          Supported by a highly qualified faculty, professor of practice (Industry), and state-of-the-art laboratories, students gain hands-on experience through cutting-edge research, internships, and industry collaborations. They are encouraged to build expertise in emerging domains such as machine learning, blockchain, DevOps, edge computing, quantum computing, agentic AI, and intelligent systems development.
                        </p>
                        <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                          Our vision is to evolve as a centre of excellence in IT and related research, nurturing graduates who emerge as innovative leaders, tech-driven entrepreneurs, research professionals, and solution architects equipped to make meaningful contributions to the digital ecosystem and society at large.
                        </p>
                      </div>
                      <button className="btn btn-link d-lg-none p-0 text-decoration-none" style={{ color: "#f26520", fontWeight: 600 }} onClick={() => setDeanExpanded(!deanExpanded)}>{deanExpanded ? "Show Less" : "Read More"}</button>
                      <div className="mt-4 mt-lg-5">
                        <p className="mb-1 fw-bold fs-3" style={{ color: "#002855" }}>Dr. Puneet Goswami</p>
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

      <div id="faculty">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
          <div className="p-3 p-md-4 p-lg-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold m-0" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>Faculty</h2>
              <a className="btn fs-3 btn-link text-decoration-none fw-semibold px-2 py-1" style={{ color: "#f26520" }} href={facultyPageHref}>
                View All<span className="ms-1">→</span>
              </a>
            </div>
            <div className="faculty-marquee-wrapper">
              <div className="faculty-marquee-track">
                {[...faculty.slice(0, 18), ...faculty.slice(0, 18)].map((member, idx) => (
                  <div key={`${member.name}-${idx}`} className="card border-0 shadow-sm flex-shrink-0" style={{ width: "180px", borderRadius: "12px", cursor: "pointer" }}>
                    <div className="overflow-hidden" style={{ height: "200px", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", position: "relative" }}>
                      <img alt={member.name} src={member.image} style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, objectFit: "cover", objectPosition: "top", color: "transparent" }} />
                    </div>
                    <div className="card-body text-center p-2 p-md-3">
                      <h3 className="card-title fw-bold mb-2 fs-4" style={{ color: "#00304c", lineHeight: 1.3 }}>{member.name}</h3>
                      <p className="card-text text-center mb-3 fs-5" style={{ color: "#666", fontWeight: 500, lineHeight: 1.4 }}>{member.role}</p>
                      <p className="card-text small text-center text-muted mb-0 fs-6" style={{ lineHeight: 1.3 }}>{member.qualification}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="testimonials">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5" style={{ padding: "0 0 5rem 0", position: "relative" }}>
          <div className="p-3 p-md-4 p-lg-5">
            <div className="mb-4">
              <h2 className="fw-bold mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                Voices of Excellence
              </h2>
            </div>
            <div
              ref={testimonialsRef}
              className="d-flex overflow-auto gap-4 testimonials-scroll-container"
              style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
              onMouseEnter={onTestimonialMouseEnter}
              onMouseLeave={onTestimonialMouseLeave}
            >
              {TESTIMONIALS.map((item) => (
                <div key={item.name} className="testimonial-card-wrapper" style={{ flex: "0 0 calc(33.333% - 1rem)", scrollSnapAlign: "start" }}>
                  <div style={{ backgroundColor: "white", borderRadius: "16px", padding: "1.5rem", height: "100%", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07)", transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "default", display: "flex", flexDirection: "column" }}>
                    <div className="d-flex justify-content-between align-items-center mb-3 pb-2" style={{ borderBottom: "2px solid #f3f4f6" }}>
                      <p className="fs-2 fw-bold mb-0" style={{ color: "#f26520" }}>{item.company}</p>
                      <span className="fs-5 fw-semibold text-secondary" style={{ backgroundColor: "#f3f4f6", padding: "0.3rem 0.8rem", borderRadius: "12px" }}>{item.year}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>
                      <div style={{ width: "90px", height: "90px", borderRadius: "50%", overflow: "hidden", position: "relative", backgroundColor: "#e5e7eb", border: "3px solid #f26520" }}>
                        <img alt={item.name} src={item.image} style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, objectFit: "cover", objectPosition: "top", color: "transparent" }} />
                      </div>
                    </div>
                    <h4 className="fs-2 fw-bold text-dark text-center mb-1">{item.name}</h4>
                    <p className="fs-2 fw-bold text-center mb-3" style={{ color: "#f26520" }}>{item.packageValue}</p>
                    <div className="flex-grow-1 mb-3">
                      <div className="d-flex align-items-start gap-2">
                        <span className="fs-1 fw-bold" style={{ color: "#f26520", lineHeight: 1 }}>❝</span>
                        <p className="mb-0 fs-4 fst-italic text-secondary" style={{ textAlign: "justify", lineHeight: 1.6 }}>{item.quote}</p>
                      </div>
                    </div>
                    <button className="btn fs-5 p-2 fw-semibold mt-auto text-start border-0 bg-transparent" style={{ color: "#f26520" }} onClick={() => setSelectedTestimonial(item)}>Read More →</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                  style={{ width: "32px", height: "32px", border: "1px solid #f26520", backgroundColor: "transparent", color: "#f26520", transition: "all 0.3s ease" }}
                  aria-label="Previous testimonial"
                  onClick={() => scrollToTestimonialPage(testimonialPage - 1)}
                  disabled={testimonialPage === 0}
                >
                  <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>‹</span>
                </button>
                <button
                  className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                  style={{ width: "32px", height: "32px", border: "1px solid #f26520", backgroundColor: "transparent", color: "#f26520", transition: "all 0.3s ease" }}
                  aria-label="Next testimonial"
                  onClick={() => scrollToTestimonialPage(testimonialPage + 1)}
                  disabled={testimonialPage >= testimonialPageCount - 1}
                >
                  <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>›</span>
                </button>
              </div>
              <div className="d-flex gap-2">
                {Array.from({ length: testimonialPageCount }).map((_, index) => (
                  <button
                    key={`testimonial-dot-${index}`}
                    type="button"
                    aria-label={`Go to testimonial page ${index + 1}`}
                    onClick={() => scrollToTestimonialPage(index)}
                    style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: testimonialPage === index ? "#ff5722" : "transparent", border: testimonialPage === index ? "1px solid #ff5722" : "1px solid #ced4da", cursor: "pointer", padding: 0 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="publications">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
          <div className="p-3 p-md-4 p-lg-5">
            <h3 className="fw-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
              Recent Publications
            </h3>

            <div className="mb-5 position-relative">
              <div ref={publicationsRef} className="d-flex gap-4 overflow-auto pb-4 px-1 scrollbar-hide publications-scroll-container" style={{ scrollSnapType: "x mandatory", scrollBehavior: "smooth" }}>
                {PUBLICATIONS.map((paper) => (
                  <div key={paper.title} className="publication-card-wrapper flex-shrink-0" style={{ width: "260px", scrollSnapAlign: "start", perspective: "1000px" }}>
                    <div className="publication-flip-inner" style={{ position: "relative", width: "100%", minHeight: "240px", transition: "transform 0.6s ease", transformStyle: "preserve-3d" }}>
                      {/* Front */}
                      <div className="card border-0 shadow-sm p-4 d-flex flex-column justify-content-between publication-flip-front" style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", borderRadius: "12px", backgroundColor: "#fff", top: 0, left: 0 }}>
                        <div>
                          <h4 className="fw-bold mb-3 fs-2" style={{ color: "#f26520", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.4 }}>{paper.title}</h4>
                          <p className="text-muted small mb-3 fs-4">{paper.author}</p>
                        </div>
                        <p className="text-center mb-0 fs-5 text-secondary fst-italic d-none d-md-block">Hover to see journal</p>
                        <a href={paper.link} target="_blank" rel="noreferrer" className="btn btn-sm w-100 text-white fw-semibold fs-4 d-md-none" style={{ backgroundColor: "#00304c", borderRadius: "6px", padding: "0.5rem" }}>
                          {paper.journal}
                        </a>
                      </div>
                      {/* Back */}
                      <div className="card border-0 shadow-sm p-4 d-flex flex-column justify-content-center align-items-center publication-flip-back" style={{ position: "absolute", width: "100%", height: "100%", backfaceVisibility: "hidden", borderRadius: "12px", backgroundColor: "#00304c", transform: "rotateY(180deg)", top: 0, left: 0 }}>
                        <p className="fw-bold fs-1 text-white text-center mb-4" style={{ lineHeight: 1.3 }}>{paper.journal}</p>
                        <a href={paper.link} target="_blank" rel="noreferrer" className="btn w-100 text-white fw-semibold fs-4" style={{ backgroundColor: "#f26520", borderRadius: "6px", padding: "0.5rem" }}>
                          View Paper
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                    style={{ width: "32px", height: "32px", border: "1px solid #f26520", backgroundColor: "transparent", color: "#f26520", transition: "all 0.3s ease" }}
                    aria-label="Previous publications"
                    onClick={() => scrollToPublicationPage(publicationPage - 1)}
                    disabled={publicationPage === 0}
                  >
                    <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>‹</span>
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                    style={{ width: "32px", height: "32px", border: "1px solid #f26520", backgroundColor: "transparent", color: "#f26520", transition: "all 0.3s ease" }}
                    aria-label="Next publications"
                    onClick={() => scrollToPublicationPage(publicationPage + 1)}
                    disabled={publicationPage >= publicationPageCount - 1}
                  >
                    <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>›</span>
                  </button>
                </div>
                <div className="d-flex gap-2">
                  {Array.from({ length: publicationPageCount }).map((_, index) => (
                    <button
                      key={`publication-dot-${index}`}
                      type="button"
                      aria-label={`Go to publications page ${index + 1}`}
                      onClick={() => scrollToPublicationPage(index)}
                      style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: publicationPage === index ? "#f26520" : "transparent", border: publicationPage === index ? "1px solid #f26520" : "1px solid #ced4da", cursor: "pointer", padding: 0 }}
                    />
                  ))}
                </div>
              </div>
            </div>

            <h2 className="fw-bold mt-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
              Research Statistics
            </h2>

            <div className="mt-4 rounded-4 overflow-hidden" style={{ background: "#fff", padding: "clamp(1.5rem, 4vw, 3rem)", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)", border: "1px solid #e9ecef" }}>
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <p className="mb-0 fs-3" style={{ color: "#666" }}>Driving innovation through cutting-edge research</p>
                <span className="badge rounded-pill fs-5 px-3 py-2" style={{ backgroundColor: "#fff3ec", color: "#f26520", border: "1px solid rgba(242, 101, 32, 0.2)" }}>2025-26</span>
              </div>
              <div className="row g-3 g-lg-4">
                {[
                  [researchPubs, "Publications", "#f26520"],
                  [researchPatents, "Patents", "#002855"],
                  [researchProjects, "Govt. Projects", "#f26520"],
                  [researchGrants, "Grants (Lakhs)", "#002855"],
                ].map((item) => (
                  <div key={item[1]} className="col-6 col-lg-3">
                    <div ref={item[0].ref} className="text-center h-100" style={{ position: "relative", borderRadius: "16px", padding: "2rem 1rem", background: "#fafbfc", border: "1px solid #e9ecef", transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}>
                      <div className="mb-2" style={{ fontSize: "clamp(2.2rem, 5vw, 3.2rem)", fontWeight: 800, lineHeight: 1, color: item[2] }}>
                        {item[0].value}
                      </div>
                      <p className="fw-semibold mb-0 fs-3" style={{ color: "#333" }}>{item[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="syllabus" className="mt-5">
            <h2 className="fw-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
              Academics &amp; Outcomes
            </h2>
            <div className="d-flex flex-column gap-3">
              {[
                {
                  key: "vision",
                  title: "Vision",
                  content: (
                    <p className="mb-0" style={{ textAlign: "justify" }}>
                      To emerge as a globally competent leader by fostering industry-linked, innovative learning and impactful research in Computational Intelligence.
                    </p>
                  ),
                },
                {
                  key: "mission",
                  title: "Mission",
                  content: (
                    <ul className="mb-0 ps-3">
                      <li className="mb-2">To develop students with strong foundation of computer science with focus on Artificial Intelligence and other emerging technologies through outcome-based teaching learning process.</li>
                      <li className="mb-2">To collaborate with industry for skill enhancement of teaching professionals and students emphasizing on project-based learning.</li>
                      <li className="mb-0">To prepare ethically strong students with powerful leadership skills.</li>
                    </ul>
                  ),
                },
                {
                  key: "program-outcomes",
                  title: "Program Outcomes",
                  content: (
                    <ul className="mb-0 ps-3">
                      <li className="mb-2"><strong>PO1: Engineering Knowledge:</strong> Apply knowledge of mathematics, natural science, computing, engineering fundamentals and an engineering specialization as specified in WK1 to WK4 respectively to develop to the solution of complex engineering problems.</li>
                      <li className="mb-2"><strong>PO2: Problem Analysis:</strong> Identify, formulate, review research literature and analyze complex engineering problems reaching substantiated conclusions with consideration for sustainable development. (WK1 to WK4)</li>
                      <li className="mb-2"><strong>PO3: Design/Development of Solutions:</strong> Design creative solutions for complex engineering problems and design/develop systems/components/processes to meet identified needs with consideration for the public health and safety, whole-life cost, net zero carbon, culture, society and environment as required. (WK5)</li>
                      <li className="mb-2"><strong>PO4: Conduct Investigations of Complex Problems:</strong> Conduct investigations of complex engineering problems using research-based knowledge including design of experiments, modelling, analysis &amp; interpretation of data to provide valid conclusions. (WK8)</li>
                      <li className="mb-2"><strong>PO5: Engineering Tool Usage:</strong> Create, select and apply appropriate techniques, resources and modern engineering &amp; IT tools, including prediction and modelling recognizing their limitations to solve complex engineering problems. (WK2 and WK6)</li>
                      <li className="mb-2"><strong>PO6: The Engineer and The World:</strong> Analyze and evaluate societal and environmental aspects while solving complex engineering problems for its impact on sustainability with reference to economy, health, safety, legal framework, culture and environment. (WK1, WK5, and WK7)</li>
                      <li className="mb-2"><strong>PO7: Ethics:</strong> Apply ethical principles and commit to professional ethics, human values, diversity and inclusion; adhere to national &amp; international laws. (WK9)</li>
                      <li className="mb-2"><strong>PO8: Individual and Collaborative Team work:</strong> Function effectively as an individual, and as a member or leader in diverse/multi-disciplinary teams.</li>
                      <li className="mb-2"><strong>PO9: Communication:</strong> Communicate effectively and inclusively within the engineering community and society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations considering cultural, language, and learning differences.</li>
                      <li className="mb-2"><strong>PO10: Project Management and Finance:</strong> Apply knowledge and understanding of engineering management principles and economic decision-making and apply these to one&apos;s own work, as a member and leader in a team, and to manage projects and in multidisciplinary environments.</li>
                      <li className="mb-0"><strong>PO11: Life-Long Learning:</strong> Recognize the need for, and have the preparation and ability for (i) Independent and life-long learning (ii) Adaptability to new and emerging technologies and (iii) Critical thinking in the broadest context of technological change. (WK8)</li>
                    </ul>
                  ),
                },
                {
                  key: "syllabus",
                  title: "Syllabus",
                  content: (
                    <div className="d-flex flex-column gap-3 w-100">
                      <a href="https://kiet.edu/cse-ai-assets/B.Tech_1st%20Year%20Course%20Booklet%202025-26.pdf" target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-between text-decoration-none bg-white rounded shadow-sm" style={{ padding: "14px 18px", width: "100%", border: "1px solid #e9ecef", transition: "all 0.25s ease" }}>
                        <div className="d-flex align-items-center">
                          <span className="me-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "42px", height: "42px", backgroundColor: "#fff3ec", flexShrink: 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#F26520" viewBox="0 0 16 16">
                              <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                              <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                            </svg>
                          </span>
                          <span className="fw-semibold fs-4" style={{ color: "#00304c" }}>I YEAR</span>
                        </div>
                        <span style={{ fontSize: "1.2rem", color: "#f26520" }}>&rarr;</span>
                      </a>
                      <a href="https://kiet.edu/cse-ai-assets/V1_CSE(AI)_CSE(AIML)_Final%20computing_B.Tech%202nd%20Year%20Course%20Booklet_2025-26.pdf" target="_blank" rel="noreferrer" className="d-flex align-items-center justify-content-between text-decoration-none bg-white rounded shadow-sm" style={{ padding: "14px 18px", width: "100%", border: "1px solid #e9ecef", transition: "all 0.25s ease" }}>
                        <div className="d-flex align-items-center">
                          <span className="me-3 d-flex align-items-center justify-content-center rounded-circle" style={{ width: "42px", height: "42px", backgroundColor: "#fff3ec", flexShrink: 0 }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#F26520" viewBox="0 0 16 16">
                              <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                              <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                            </svg>
                          </span>
                          <span className="fw-semibold fs-4" style={{ color: "#00304c" }}>II YEAR</span>
                        </div>
                        <span style={{ fontSize: "1.2rem", color: "#f26520" }}>&rarr;</span>
                      </a>
                    </div>
                  ),
                },
              ].map((section) => {
                const isOpen = openSection === section.key;
                return (
                  <div key={section.key}>
                    <button
                      className={`vm-accordion-btn${isOpen ? " active" : ""}`}
                      onClick={() => setOpenSection(isOpen ? "" : section.key)}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <span className="fw-semibold fs-2" style={{ color: isOpen ? "#f26520" : "#002855", transition: "color 0.3s ease" }}>{section.title}</span>
                      </div>
                      <span style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", color: isOpen ? "#f26520" : "#999", transition: "transform 0.3s ease, color 0.3s ease", fontSize: "0.85rem" }}>&#9660;</span>
                    </button>
                    <div className={`vm-accordion-panel${isOpen ? " open" : ""}`} style={{ maxHeight: isOpen ? "2000px" : "0", opacity: isOpen ? 1 : 0, padding: isOpen ? "1.25rem 1.5rem" : "0 1.5rem" }}>
                      <div className="fs-2" style={{ color: "#444", lineHeight: 1.6 }}>
                        {section.content}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <style>{`
            @media (min-width: 769px) {
              .testimonials-scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
              .testimonials-scroll-container::-webkit-scrollbar { display: none; }
              .testimonial-card-wrapper { flex-shrink: 0; width: calc((100% - 3.75rem) / 4); min-width: 280px; }
            }

            @media (max-width: 768px) {
              .testimonials-scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
              .testimonials-scroll-container::-webkit-scrollbar { display: none; }
              .testimonial-card-wrapper { flex-shrink: 0 !important; width: 80vw !important; flex: none !important; scroll-snap-align: center; }
            }

            /* Faculty auto-scroll marquee */

            /* Department Highlights hover lift */
            .highlight-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14) !important;
              border-left-color: #f26520 !important;
            }

            /* Clubs overlapping hover */
            .clubs-stack {
              display: flex;
              justify-content: center;
              align-items: stretch;
              gap: 0;
              position: relative;
            }
            .club-card-outer {
              transition: transform 0.4s ease, z-index 0s, box-shadow 0.4s ease;
              z-index: 1;
              flex: 0 0 55%;
              max-width: 55%;
            }
            .club-card-outer:nth-child(2) {
              margin-left: -8%;
            }
            .club-card-outer:hover {
              transform: scale(1.06) translateY(-8px);
              z-index: 10;
            }
            .club-card-outer:hover .club-card-inner {
              box-shadow: 0 20px 50px rgba(0, 0, 0, 0.18);
            }
            .club-card-inner {
              transition: box-shadow 0.4s ease;
            }
            @media (max-width: 991px) {
              .clubs-stack {
                flex-direction: column;
                gap: 1.5rem;
                align-items: center;
              }
              .club-card-outer {
                flex: 0 0 100%;
                max-width: 100%;
              }
              .club-card-outer:nth-child(2) {
                margin-left: 0;
              }
              .club-card-outer:hover {
                transform: none;
              }
            }

            @keyframes faculty-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .faculty-marquee-wrapper {
              overflow: hidden;
              width: 100%;
            }
            .faculty-marquee-track {
              display: flex;
              gap: 1rem;
              width: fit-content;
              animation: faculty-scroll 60s linear infinite;
            }
            .faculty-marquee-wrapper:hover .faculty-marquee-track {
              animation-play-state: paused;
            }

            /* Testimonial hover pop-out */
            .testimonial-card-wrapper > div {
              transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1) !important;
            }
            .testimonial-card-wrapper:hover > div {
              transform: translateY(-14px) scale(1.04);
              box-shadow: 0 28px 56px rgba(242, 101, 32, 0.22), 0 0 0 2px rgba(242, 101, 32, 0.15) !important;
              z-index: 10;
            }

            /* Placement stat cards */
            .placement-stat-card {
              position: relative;
              overflow: hidden;
              border-radius: 16px;
              background: #fff;
              border: none;
              padding: 2rem 1.5rem;
              text-align: center;
              transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
            }
            .placement-stat-card::before {
              content: "";
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 5px;
            }
            .placement-stat-card::after {
              content: "";
              position: absolute;
              bottom: -40px;
              right: -40px;
              width: 120px;
              height: 120px;
              border-radius: 50%;
              opacity: 0.06;
              transition: transform 0.4s ease;
            }
            .placement-stat-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
            }
            .placement-stat-card:hover::after {
              transform: scale(1.6);
            }
            .placement-stat-card.orange::before { background: linear-gradient(90deg, #f26520, #ff8a50); }
            .placement-stat-card.orange::after { background: #f26520; }
            .placement-stat-card.navy::before { background: linear-gradient(90deg, #002855, #1a5276); }
            .placement-stat-card.navy::after { background: #002855; }

            /* Accordion redesign */
            .vm-accordion-btn {
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 1.1rem 1.5rem;
              border: 2px solid #e2e8f0;
              border-left: 5px solid #002855;
              background: #fff;
              border-radius: 12px;
              cursor: pointer;
              transition: all 0.3s ease;
            }
            .vm-accordion-btn:hover {
              border-left-color: #f26520;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            }
            .vm-accordion-btn.active {
              border-left-color: #f26520;
              background: linear-gradient(135deg, #fff8f5 0%, #fff 100%);
              box-shadow: 0 6px 20px rgba(242, 101, 32, 0.1);
            }
            .vm-accordion-panel {
              overflow: hidden;
              transition: max-height 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease, padding 0.35s ease;
              border-radius: 0 0 12px 12px;
              margin-top: -8px;
              border: 2px solid transparent;
              border-top: none;
            }
            .vm-accordion-panel.open {
              border-color: #e2e8f0;
              border-left: 5px solid #f26520;
              background: #fff;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
            }

            /* Publications 3D card flip */
            @media (min-width: 769px) {
              .publication-card-wrapper:hover .publication-flip-inner {
                transform: rotateY(180deg);
              }
            }
            @media (max-width: 768px) {
              .publication-flip-inner {
                transform: none !important;
              }
              .publication-flip-front {
                position: relative !important;
              }
              .publication-flip-back {
                display: none !important;
              }
              .publication-card-wrapper {
                perspective: none !important;
              }
            }
          `}</style>
        </section>
      </div>

      {selectedTestimonial && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 1050, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)", padding: "1rem" }}
          onClick={() => setSelectedTestimonial(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: "#fff", borderRadius: "16px", maxWidth: "700px", width: "100%", maxHeight: "90vh", overflow: "auto", position: "relative" }}
          >
            <button
              onClick={() => setSelectedTestimonial(null)}
              style={{ position: "absolute", top: "12px", right: "16px", background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#666", zIndex: 1 }}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="d-flex flex-column flex-md-row p-4 gap-4">
              <div className="text-center flex-shrink-0">
                <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", margin: "0 auto", border: "3px solid #f26520", position: "relative", backgroundColor: "#e5e7eb" }}>
                  <img alt={selectedTestimonial.name} src={selectedTestimonial.image} style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "top" }} />
                </div>
                <h4 className="fw-bold mt-3 mb-1" style={{ color: "#002855" }}>{selectedTestimonial.name}</h4>
                <p className="fw-bold mb-1" style={{ color: "#f26520" }}>{selectedTestimonial.packageValue}</p>
                <p className="text-muted small mb-0">{selectedTestimonial.company} | {selectedTestimonial.year}</p>
              </div>
              <div className="flex-grow-1">
                <span className="fw-bold" style={{ color: "#f26520", fontSize: "2.5rem", lineHeight: 1 }}>&ldquo;</span>
                <p className="fs-4 fst-italic text-secondary" style={{ textAlign: "justify", lineHeight: 1.7 }}>{selectedTestimonial.quote}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
