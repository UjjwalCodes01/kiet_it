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
          <div className="p-4 p-md-5" style={{ boxShadow: "0 0 20px rgba(0, 0, 0, 0.05)", borderRadius: "16px", backgroundColor: "#fff" }}>
            <div className="row align-items-center justify-content-between g-4 g-lg-5">
              <div className="col-12 col-lg-5 py-3 px-3 px-md-4 px-lg-5">
                <h2 className="fw-bold mb-4" style={{ color: "#000" }}>
                  CSE (AI / AI&ML) Department&apos;s <span style={{ color: "#f26520" }}>Overview</span>
                </h2>
                <p className="text-muted mb-4 fs-3" style={{ lineHeight: 1.6, textAlign: "justify" }}>
                  The CSE (AI/AI&ML) programs craft future-ready innovators by blending strong computing fundamentals with advanced domains like Machine Learning, Deep Learning, Computer Vision, NLP, Robotics and Agentic AI. Through hands-on projects, industry exposure, leadership training, and ethical grounding, students graduate confident, career-ready, and prepared to lead in the AI-driven global technology era.
                </p>
                <a
                  href="https://admission.kiet.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn px-5 py-3 text-white fw-semibold fs-3"
                  style={{ backgroundColor: "#f26520", borderRadius: "6px", border: "none", textDecoration: "none", display: "inline-block" }}
                >
                  Apply Now
                </a>
              </div>
              <div className="col-12 col-lg-6">
                <div className="d-none d-md-block">
                  <div className="row g-4 text-center text-lg-start">
                    <div className="col-sm-6">
                      <h2 className="fw-bold mb-1 text-center" style={{ color: "#f26520" }}>₹7 Cr</h2>
                      <p className="small fw-bold mb-0 fs-3 text-dark text-center">Funding Raised by Alumni</p>
                      <p className="small text-muted fs-3 text-center">Through Startup : 2025 Batch</p>
                    </div>
                    <div className="col-sm-6">
                      <h2 className="fw-bold mb-1 text-center" style={{ color: "#f26520" }}>95%</h2>
                      <p className="small fw-bold mb-0 fs-3 text-dark text-center">Placements in 2025</p>
                      <p className="small text-muted fs-3 text-center">Leading Tech &amp; AI Companies</p>
                    </div>
                    <div className="col-sm-6">
                      <h2 className="fw-bold mb-1 text-center" style={{ color: "#f26520" }}>240 + 300</h2>
                      <p className="small fw-bold mb-0 fs-3 text-dark text-center">Annual Student Intake</p>
                      <p className="small text-muted fs-3 text-center">CSE (AI) + CSE (AI&amp;ML)</p>
                    </div>
                    <div className="col-sm-6">
                      <h2 className="fw-bold mb-1 text-center" style={{ color: "#f26520" }}>650+</h2>
                      <p className="small fw-bold mb-0 fs-3 text-dark text-center">Globally Certified Students</p>
                      <p className="small text-muted fs-3 text-center">(AI • ML • Cloud)</p>
                    </div>
                  </div>
                </div>
                <div className="d-md-none">
                  <div className="row g-3">
                    {[
                      ["₹7 Cr", "Funding Raised by Alumni", "Through Startup : 2025 Batch"],
                      ["95%", "Placements in 2025", "Leading Tech & AI Companies"],
                      ["240+300", "Annual Student Intake", "CSE (AI) + CSE (AI&ML)"],
                      ["650+", "Globally Certified Students", "(AI • ML • Cloud)"],
                    ].map((item) => (
                      <div key={item[0]} className="col-12">
                        <div className="px-4 py-3 text-center" style={{ borderRadius: "12px", background: "linear-gradient(135deg, #fff5f0 0%, #fff 100%)", border: "1px solid rgba(242, 101, 32, 0.15)" }}>
                          <h2 className="fw-bold mb-1" style={{ color: "#f26520" }}>{item[0]}</h2>
                          <p className="fw-bold mb-0 fs-3 text-dark text-center">{item[1]}</p>
                          <p className="mb-0 text-muted fs-3 text-center">{item[2]}</p>
                        </div>
                      </div>
                    ))}
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
                  <div className="d-none d-md-flex bg-white rounded-3 overflow-hidden h-100" style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)", transition: "all 0.3s ease", cursor: "pointer" }}>
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
            <h2 className="fw-bold mb-4 fs-1" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
              Placement Overview
            </h2>
            <div className="row g-3">
              {[
                [placementHighest, " LPA", "Highest Package", "#f26520"],
                [placementTop10, " LPA", "Top 10% Placement", "#002855"],
                [placementAverage, " LPA", "Average Package", "#f26520"],
                [placementCompanies, "+", "Total Companies", "#002855"],
              ].map((item) => (
                <div key={item[2]} className="col-12 col-md-6 col-lg-3">
                  <div ref={item[0].ref} className="card fs-1 h-100 border-0 text-white d-flex flex-column justify-content-center align-items-center text-center p-4" style={{ backgroundColor: item[3], borderRadius: "12px", minHeight: "140px" }}>
                    <h3 className="fw-bold mb-2 fs-1" style={{ color: "#fff", lineHeight: 1.1 }}>
                      {item[0].value}{item[1]}
                    </h3>
                    <p className="mb-0 fs-2 text-white">{item[2]}</p>
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
            <div className="row align-items-center g-4">
              <div className="col-12 col-lg-6 mb-0 mb-lg-0">
                <div className="pe-lg-4">
                  <p className="text-muted mb-3 fs-3" style={{ letterSpacing: "0.5px" }}>
                    Your Journey Into Advanced Computing Begins Here
                  </p>
                  <h2 className="fw-bold mb-4 fs-1" style={{ color: "black" }}>
                    Driving <span style={{ color: "#ff5722" }}>Supercomputing with DGX </span>
                    <br />Centre of Excellence
                  </h2>
                  <p className="text-muted mb-4 fs-3" style={{ lineHeight: 1.8, textAlign: "justify" }}>
                    Powered by the NVIDIA DGX A100 Supercomputer, KIET enables enterprise-grade AI computing for advanced research in the field of AI. Students build and deploy complex AI models on industry-level GPU infrastructure. A hub for innovation, industry collaboration, and next-generation AI excellence.
                  </p>
                  <button
                    type="button"
                    className="btn fs-4 py-3 px-5 fw-semibold"
                    style={{
                      backgroundColor: "#ff5722",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 12px rgba(255, 87, 34, 0.3)",
                    }}
                  >
                    View More
                  </button>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="position-relative">
                  <div
                    className="rounded-4 overflow-hidden"
                    style={{
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
                      border: "8px solid white",
                      height: "260px",
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    <img
                      alt="DGX Supercomputing Centre"
                      loading="lazy"
                      src="/cse-ai-assets/images/DGX-Supercomputing.png"
                      style={{
                        position: "absolute",
                        height: "100%",
                        width: "100%",
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        objectFit: "cover",
                        color: "transparent",
                      }}
                    />
                  </div>
                </div>
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
            <div className="row g-4">
              {[
                ["NextGen Supercomputing Club", "/cse-ai-assets/images/nextgen-logo.png", "https://nextgen-supercomputing.in", "NextGen Club is a community of passionate learners aspiring to become production-ready ML and AI engineers through hands-on projects and collaborative learning."],
                ["DevUp Club", "/cse-ai-assets/images/devup-logo.png", "https://devup.co.in/", "DevUp Club is a vibrant technical community committed to empowering students across CP/DSA, Web Development, Android, UI/UX, and Data Science through workshops and projects."],
              ].map((club) => (
                <div key={club[0]} className="col-12 col-lg-6 mb-4">
                  <div className="card bg-white h-100 border-0 shadow-sm" style={{ borderRadius: "16px", overflow: "hidden", transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "default", minHeight: "260px" }}>
                    <div className="card-body p-3 p-md-4 d-flex flex-column flex-md-row h-100 py-4 py-md-5">
                      <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4 align-self-center" style={{ width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", position: "relative", border: "2px solid #f0f0f0", backgroundColor: "#fff" }}>
                        <img alt={club[0]} src={club[1]} style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, objectFit: "cover", color: "transparent" }} />
                      </div>
                      <div className="flex-grow-1 text-center text-md-start d-flex flex-column">
                        <h3 className="fw-bold mb-2" style={{ color: "#002855" }}>{club[0]}</h3>
                        <p className="text-muted fs-3 mb-3 flex-grow-1" style={{ lineHeight: 1.6, textAlign: "justify" }}>{club[3]}</p>
                        <div>
                          <a href={club[2]} target="_blank" rel="noopener noreferrer" className="btn px-5 py-2 fw-semibold fs-3 text-white" style={{ backgroundColor: "#ff5722", borderRadius: "8px", border: "none" }}>
                            Website
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
                        <img src="/cse-ai-assets/images/Dean's-photo.jpeg" alt="Dr. Rekha Kashyap - Dean" className="img-fluid rounded-3" style={{ maxWidth: "100%", height: "auto", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", objectFit: "cover" }} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-8 order-1 order-lg-0">
                      <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                        The future belongs to those who can think intelligently, build responsibly, and innovate fearlessly. At the Department of CSE (AI / AI &amp; ML), KIET Deemed to be University, we are shaping that future by redefining how technology education is delivered.
                      </p>
                      <div className={deanExpanded ? "" : "d-none d-lg-block"}>
                        <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                          Our AI-first ecosystem integrates strong computational foundations with supercomputing infrastructure, global certifications, industry co-creation, and experiential learning.
                        </p>
                        <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                          We envision our department as a hub where artificial intelligence, data, cloud, and emerging technologies converge to create real-world impact.
                        </p>
                        <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                          Our mission is clear &mdash; to build intelligent systems and intelligent leaders for a rapidly transforming world.
                        </p>
                      </div>
                      <button className="btn btn-link d-lg-none p-0 text-decoration-none" style={{ color: "#f26520", fontWeight: 600 }} onClick={() => setDeanExpanded(!deanExpanded)}>{deanExpanded ? "Show Less" : "Read More"}</button>
                      <div className="mt-4 mt-lg-5">
                        <p className="mb-1 fw-bold fs-3" style={{ color: "#002855" }}>Dr. Rekha Kashyap</p>
                        <p className="mb-0 text-muted fs-4">Dean, CSE (AI) &amp; CSE (AI &amp; ML)</p>
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

            <div>
              <div className="d-flex justify-content-end mb-4">
                <div className="bg-white rounded-4 shadow-sm border" style={{ minWidth: "220px", overflow: "hidden" }}>
                  <div className="d-flex align-items-center justify-content-between px-4 py-2">
                    <label className="text-secondary fw-semibold mb-0 fs-4 small">Academic Year:</label>
                    <button className="btn btn-link text-decoration-none fw-bold p-0 d-flex align-items-center gap-2" style={{ color: "#002855" }}>
                      <span className="fs-4">2025-26</span>
                      <span className="small fs-4" style={{ transform: "rotate(0deg)", transition: "transform 0.25s ease" }}>▼</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="row g-4 pt-3 pt-md-5">
                {[
                  [researchPubs, "Publications"],
                  [researchPatents, "Patents"],
                  [researchProjects, "Govt. Projects"],
                  [researchGrants, "Grants (Lakhs)"],
                ].map((item) => (
                  <div key={item[1]} className="col-6 col-lg-3">
                    <div ref={item[0].ref} className="card h-100 border-0 shadow-sm text-center py-4 rounded-4">
                      <h2 className="fw-bold display-6 text-dark mb-2">{item[0].value}</h2>
                      <p className="mb-0 text-secondary fs-2 fw-medium text-center">{item[1]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="syllabus" className="mt-5">
            <div className="d-flex flex-column gap-3">
              <div className="accordion-item border-0">
                <button
                  className="w-100 d-flex justify-content-between align-items-center p-3 border-0 text-start"
                  style={{ backgroundColor: "#00304c", color: "#ffffff", borderRadius: "5px", cursor: "pointer", transition: "background-color 0.3s ease" }}
                  onClick={() => setOpenSection(openSection === "vision" ? "" : "vision")}
                >
                  <span className="fw-semibold fs-2">Vision</span>
                  <span className="fs-3" style={{ transform: openSection === "vision" ? "rotate(180deg)" : "rotate(0deg)", color: openSection === "vision" ? "#f26520" : "#fff", transition: "transform 0.3s ease, color 0.3s ease", fontSize: "0.8rem" }}>▼</span>
                </button>
                <div className="overflow-hidden bg-white" style={{ maxHeight: openSection === "vision" ? "none" : 0, transition: "max-height 0.5s ease-in-out", opacity: openSection === "vision" ? 1 : 0, boxShadow: openSection === "vision" ? "0 4px 6px rgba(0, 0, 0, 0.05)" : "none", border: openSection === "vision" ? "1px solid #dee2e6" : "none", borderRadius: "0 0 5px 5px" }}>
                  <div className="p-3 p-md-4 fs-2" style={{ color: "#444", lineHeight: 1.6 }}>
                    <p className="mb-0" style={{ textAlign: "justify" }}>
                      To emerge as a globally competent leader by fostering industry-linked, innovative learning and impactful research in Computational Intelligence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0">
                <button
                  className="w-100 d-flex justify-content-between align-items-center p-3 border-0 text-start"
                  style={{ backgroundColor: "#00304c", color: "#ffffff", borderRadius: "5px", cursor: "pointer", transition: "background-color 0.3s ease" }}
                  onClick={() => setOpenSection(openSection === "mission" ? "" : "mission")}
                >
                  <span className="fw-semibold fs-2">Mission</span>
                  <span className="fs-3" style={{ transform: openSection === "mission" ? "rotate(180deg)" : "rotate(0deg)", color: openSection === "mission" ? "#f26520" : "#fff", transition: "transform 0.3s ease, color 0.3s ease", fontSize: "0.8rem" }}>▼</span>
                </button>
                <div className="overflow-hidden bg-white" style={{ maxHeight: openSection === "mission" ? "none" : 0, transition: "max-height 0.5s ease-in-out", opacity: openSection === "mission" ? 1 : 0, boxShadow: openSection === "mission" ? "0 4px 6px rgba(0, 0, 0, 0.05)" : "none", border: openSection === "mission" ? "1px solid #dee2e6" : "none", borderRadius: "0 0 5px 5px" }}>
                  <div className="p-3 p-md-4 fs-2" style={{ color: "#444", lineHeight: 1.6 }}>
                    <ul className="mb-0 ps-3">
                      <li className="mb-2">To develop students with strong foundation of computer science with focus on Artificial Intelligence and other emerging technologies through outcome-based teaching learning process.</li>
                      <li className="mb-2">To collaborate with industry for skill enhancement of teaching professionals and students emphasizing on project-based learning.</li>
                      <li className="mb-0">To prepare ethically strong students with powerful leadership skills.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0">
                <button
                  className="w-100 d-flex justify-content-between align-items-center p-3 border-0 text-start"
                  style={{ backgroundColor: "#00304c", color: "#ffffff", borderRadius: "5px", cursor: "pointer", transition: "background-color 0.3s ease" }}
                  onClick={() => setOpenSection(openSection === "program-outcomes" ? "" : "program-outcomes")}
                >
                  <span className="fw-semibold fs-2">Program Outcomes</span>
                  <span className="fs-3" style={{ transform: openSection === "program-outcomes" ? "rotate(180deg)" : "rotate(0deg)", color: openSection === "program-outcomes" ? "#f26520" : "#fff", transition: "transform 0.3s ease, color 0.3s ease", fontSize: "0.8rem" }}>▼</span>
                </button>
                <div className="overflow-hidden bg-white" style={{ maxHeight: openSection === "program-outcomes" ? "none" : 0, transition: "max-height 0.5s ease-in-out", opacity: openSection === "program-outcomes" ? 1 : 0, boxShadow: openSection === "program-outcomes" ? "0 4px 6px rgba(0, 0, 0, 0.05)" : "none", border: openSection === "program-outcomes" ? "1px solid #dee2e6" : "none", borderRadius: "0 0 5px 5px" }}>
                  <div className="p-3 p-md-4 fs-2" style={{ color: "#444", lineHeight: 1.6 }}>
                    <ul className="mb-0 ps-3">
                      <li className="mb-2"><strong>PO1: Engineering Knowledge:</strong> Apply knowledge of mathematics, natural science, computing, engineering fundamentals and an engineering specialization as specified in WK1 to WK4 respectively to develop to the solution of complex engineering problems.</li>
                      <li className="mb-2"><strong>PO2: Problem Analysis:</strong> Identify, formulate, review research literature and analyze complex engineering problems reaching substantiated conclusions with consideration for sustainable development. (WK1 to WK4)</li>
                      <li className="mb-2"><strong>PO3: Design/Development of Solutions:</strong> Design creative solutions for complex engineering problems and design/develop systems/components/processes to meet identified needs with consideration for the public health and safety, whole-life cost, net zero carbon, culture, society and environment as required. (WK5)</li>
                      <li className="mb-2"><strong>PO4: Conduct Investigations of Complex Problems:</strong> Conduct investigations of complex engineering problems using research-based knowledge including design of experiments, modelling, analysis & interpretation of data to provide valid conclusions. (WK8)</li>
                      <li className="mb-2"><strong>PO5: Engineering Tool Usage:</strong> Create, select and apply appropriate techniques, resources and modern engineering & IT tools, including prediction and modelling recognizing their limitations to solve complex engineering problems. (WK2 and WK6)</li>
                      <li className="mb-2"><strong>PO6: The Engineer and The World:</strong> Analyze and evaluate societal and environmental aspects while solving complex engineering problems for its impact on sustainability with reference to economy, health, safety, legal framework, culture and environment. (WK1, WK5, and WK7)</li>
                      <li className="mb-2"><strong>PO7: Ethics:</strong> Apply ethical principles and commit to professional ethics, human values, diversity and inclusion; adhere to national & international laws. (WK9)</li>
                      <li className="mb-2"><strong>PO8: Individual and Collaborative Team work:</strong> Function effectively as an individual, and as a member or leader in diverse/multi-disciplinary teams.</li>
                      <li className="mb-2"><strong>PO9: Communication:</strong> Communicate effectively and inclusively within the engineering community and society at large, such as being able to comprehend and write effective reports and design documentation, make effective presentations considering cultural, language, and learning differences.</li>
                      <li className="mb-2"><strong>PO10: Project Management and Finance:</strong> Apply knowledge and understanding of engineering management principles and economic decision-making and apply these to one&apos;s own work, as a member and leader in a team, and to manage projects and in multidisciplinary environments.</li>
                      <li className="mb-0"><strong>PO11: Life-Long Learning:</strong> Recognize the need for, and have the preparation and ability for (i) Independent and life-long learning (ii) Adaptability to new and emerging technologies and (iii) Critical thinking in the broadest context of technological change. (WK8)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="accordion-item border-0">
                <button
                  className="w-100 d-flex justify-content-between align-items-center p-3 border-0 text-start"
                  style={{ backgroundColor: "#00304c", color: "#ffffff", borderRadius: "5px", cursor: "pointer", transition: "background-color 0.3s ease" }}
                  onClick={() => setOpenSection(openSection === "syllabus" ? "" : "syllabus")}
                >
                  <span className="fw-semibold fs-2">Syllabus</span>
                  <span className="fs-3" style={{ transform: openSection === "syllabus" ? "rotate(180deg)" : "rotate(0deg)", color: openSection === "syllabus" ? "#f26520" : "#fff", transition: "transform 0.3s ease, color 0.3s ease", fontSize: "0.8rem" }}>▼</span>
                </button>
                <div className="overflow-hidden bg-white" style={{ maxHeight: openSection === "syllabus" ? "none" : 0, transition: "max-height 0.5s ease-in-out", opacity: openSection === "syllabus" ? 1 : 0, boxShadow: openSection === "syllabus" ? "0 4px 6px rgba(0, 0, 0, 0.05)" : "none", border: openSection === "syllabus" ? "1px solid #dee2e6" : "none", borderRadius: "0 0 5px 5px" }}>
                  <div className="p-3 p-md-4 fs-2" style={{ color: "#444", lineHeight: 1.6 }}>
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
                        <span style={{ fontSize: "1.2rem", color: "#f26520" }}>→</span>
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
                        <span style={{ fontSize: "1.2rem", color: "#f26520" }}>→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
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
