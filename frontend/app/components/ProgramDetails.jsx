"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Roadmap from "./Roadmap";

// Achievers data sorted by package (descending)
const ACHIEVERS = [
  { name: "Satyam Mishra", company: "Proton AG", package: "1.78 Cr", image: "/acchievers/satyam_mishra.png" },
  { name: "Isha Rastogi", company: "Microsoft", package: "52 LPA", image: "/acchievers/isha_rastogi.png" },
  { name: "Palak Mittal", company: "Amazon", package: "48.89 LPA", image: "/acchievers/palak_mittal.png" },
  { name: "Srishti Pawar", company: "Amazon", package: "48.89 LPA", image: "/acchievers/Shrishti_Pawar.png" },
  { name: "Umang Sharma", company: "Amazon", package: "48.89 LPA", image: "/acchievers/umang_smarma.png" },
  { name: "Riya Garg", company: "Amazon", package: "45.64 LPA", image: "/acchievers/riya_garg.png" },
  { name: "Shifa Rifat", company: "ServiceNow", package: "42.67 LPA", image: "/acchievers/Shifa_Rifat.png" },
  { name: "Divyank Goyal", company: "Morgan Stanley", package: "30.22 LPA", image: "/acchievers/Divyank_Goyal.png" },
  { name: "Utkarsh Jain", company: "Travclan", package: "30 LPA", image: "/acchievers/Utkarsh_Jain.png" },
  { name: "Anshika Sharma", company: "Walmart", package: "23 LPA", image: "/acchievers/Anshika_Sharma.png" },
  { name: "Siddharth Kumar Jha", company: "Turing", package: "20 LPA", image: "/acchievers/siddharth_kumar_jha.png" },
  { name: "Srijan Srivastava", company: "Samagra", package: "18 LPA", image: "/acchievers/riya_satpathi.png" },
  { name: "Ayushi Singh", company: "Cisco", package: "17.39 LPA", image: "/acchievers/Nikita_Gautam.png" },
  { name: "Sachin Kumar Gupta", company: "Josh Technology", package: "15.37 LPA", image: "/acchievers/Akansh_Pratap_Singh.png" },
  { name: "Dev Bhaskar Singh", company: "Trellix", package: "14.5 LPA", image: "/acchievers/Dev_Bhaskar_Singh.png" },
  { name: "Isha Gupta", company: "ION Group", package: "14.1 LPA", image: "/acchievers/isha_rastogi.png" },
  { name: "Chinmoy Chakraborty", company: "Samagra", package: "12 LPA", image: "/acchievers/Chinmoy_Chakraborty.png" },
  { name: "Anurag Ranjan", company: "Healthkart", package: "12 LPA", image: "/acchievers/anurag_ranjan.png" },
  { name: "Khushi Jain", company: "Healthkart", package: "12 LPA", image: "/acchievers/Khushi_Jain.png" },
  { name: "Soumy Jain", company: "Interra Systems", package: "12 LPA", image: "/acchievers/Soumy_Jain.png" },
  { name: "Akansh Pratap Singh", company: "Infoedge", package: "10 LPA", image: "/acchievers/Akansh_Pratap_Singh.png" },
  { name: "Kanhaiya Tulsyan", company: "Infoedge", package: "10 LPA", image: "/acchievers/Kanhaiya_Tulsan.png" },
  { name: "Nikita Gautam", company: "JSW", package: "10 LPA", image: "/acchievers/Nikita_Gautam.png" },
];

// Alumni Testimonials data
const ALUMNI_TESTIMONIALS = [
  {
    name: "Shifa Rifat",
    designation: "Associate Software Engineer",
    company: "ServiceNow",
    batch: "IT 2024",
    quote: "From the quiet focus of lab benches to the energy of late-night project sprints, every experience at KIET has shaped not just my career—but my character. I am sincerely grateful to the Information Technology department—our HODs, faculty, and every mentor—whose unwavering support, insight, and belief in me made this journey possible. Beyond technical skills, I leave with a sense of purpose, resilience, and memories that will echo far beyond these walls.",
    image: "/acchievers/Shifa_Rifat.png",
  },
  {
    name: "Unnati Bhardwaj",
    designation: "Product Consultant",
    company: "Smarter.Codes",
    batch: "IT 2024",
    quote: "Supportive mentors and a culture of innovation in the IT Department gave me the space to experiment, build, and grow. Some of those experiments turned into proud moments on national and global platforms. KIET enriched my journey with experiences that reached far beyond the classroom.",
    image: "/acchievers/Nikita_Gautam.png",
  },
  {
    name: "Isha Rastogi",
    designation: "Software Engineer",
    company: "Microsoft",
    batch: "IT 2024",
    quote: "I feel proud and grateful for the journey at KIET that shaped my professional foundation. The academic environment, dedicated faculty, and constant support from the Information Technology department played a vital role in preparing me for the industry. Now, working at Microsoft, I carry with me not just technical skills but also the confidence, discipline, and values instilled during my time at KIET. I am thankful for all the opportunities and encouragement that helped turn my aspirations into reality.",
    image: "/acchievers/isha_rastogi.png",
  },
  {
    name: "Chinmoy Chakraborty",
    designation: "SDE",
    company: "Zomato",
    batch: "IT 2023",
    quote: "I've been fortunate to be a part of the IT department at KIET Group of Institutions. The department has helped me establish a strong academic foundation, as well as foster personal growth. The faculty has always been supportive and has guided us towards excellence. The Department of IT has also provided students with a rich environment to explore industry technology through various student clubs. Above all, the department has ensured an all-round holistic development of students, and I am grateful to be a part of such a vibrant ecosystem.",
    image: "/acchievers/Chinmoy_Chakraborty.png",
  },
];

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
  const achieversRef = useRef(null);
  const [achieverPage, setAchieverPage] = useState(0);
  const [achieverPageCount, setAchieverPageCount] = useState(1);
  const achieverAutoplayRef = useRef(null);
  const achieverHoveredRef = useRef(false);
  
  // Alumni testimonials carousel state
  const alumniRef = useRef(null);
  const [alumniPage, setAlumniPage] = useState(0);
  const [alumniPageCount, setAlumniPageCount] = useState(1);
  const alumniAutoplayRef = useRef(null);
  const alumniHoveredRef = useRef(false);

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

  const syncAchieverPagination = () => {
    const container = achieversRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".achiever-card-wrapper", ACHIEVERS.length);
    setAchieverPageCount(pageCount);

    if (stepSize <= 0) {
      setAchieverPage(0);
      return;
    }

    const currentPage = Math.min(pageCount - 1, Math.max(0, Math.round(container.scrollLeft / stepSize)));
    setAchieverPage(currentPage);
  };

  const scrollToAchieverPage = useCallback((requestedPage) => {
    const container = achieversRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".achiever-card-wrapper", ACHIEVERS.length);
    const boundedPage = Math.min(pageCount - 1, Math.max(0, requestedPage));
    setAchieverPageCount(pageCount);
    setAchieverPage(boundedPage);

    if (stepSize > 0) {
      container.scrollTo({ left: boundedPage * stepSize, behavior: "smooth" });
    }
  }, []);

  // Alumni carousel functions
  const syncAlumniPagination = () => {
    const container = alumniRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".alumni-card-wrapper", ALUMNI_TESTIMONIALS.length);
    setAlumniPageCount(pageCount);

    if (stepSize <= 0) {
      setAlumniPage(0);
      return;
    }

    const currentPage = Math.min(pageCount - 1, Math.max(0, Math.round(container.scrollLeft / stepSize)));
    setAlumniPage(currentPage);
  };

  const scrollToAlumniPage = useCallback((requestedPage) => {
    const container = alumniRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".alumni-card-wrapper", ALUMNI_TESTIMONIALS.length);
    const boundedPage = Math.min(pageCount - 1, Math.max(0, requestedPage));
    setAlumniPageCount(pageCount);
    setAlumniPage(boundedPage);

    if (stepSize > 0) {
      container.scrollTo({ left: boundedPage * stepSize, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const achieversContainer = achieversRef.current;
    const alumniContainer = alumniRef.current;
    
    if (!achieversContainer) {
      return;
    }

    syncAchieverPagination();
    if (alumniContainer) {
      syncAlumniPagination();
    }

    const onAchieverScroll = () => syncAchieverPagination();
    const onAlumniScroll = () => syncAlumniPagination();
    const onResize = () => {
      syncAchieverPagination();
      if (alumniContainer) {
        syncAlumniPagination();
      }
    };

    achieversContainer?.addEventListener("scroll", onAchieverScroll, { passive: true });
    alumniContainer?.addEventListener("scroll", onAlumniScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      achieversContainer?.removeEventListener("scroll", onAchieverScroll);
      alumniContainer?.removeEventListener("scroll", onAlumniScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Achiever auto-play
  useEffect(() => {
    const startAutoplay = () => {
      achieverAutoplayRef.current = setInterval(() => {
        if (achieverHoveredRef.current) return;
        setAchieverPage((prev) => {
          const container = achieversRef.current;
          if (!container) return prev;
          const { pageCount, stepSize } = getCarouselMetrics(container, ".achiever-card-wrapper", ACHIEVERS.length);
          const nextPage = prev >= pageCount - 1 ? 0 : prev + 1;
          if (stepSize > 0) {
            container.scrollTo({ left: nextPage * stepSize, behavior: "smooth" });
          }
          return nextPage;
        });
      }, 5000);
    };

    startAutoplay();
    return () => clearInterval(achieverAutoplayRef.current);
  }, []);

  // Alumni auto-play
  useEffect(() => {
    const startAutoplay = () => {
      alumniAutoplayRef.current = setInterval(() => {
        if (alumniHoveredRef.current) return;
        setAlumniPage((prev) => {
          const container = alumniRef.current;
          if (!container) return prev;
          const { pageCount, stepSize } = getCarouselMetrics(container, ".alumni-card-wrapper", ALUMNI_TESTIMONIALS.length);
          const nextPage = prev >= pageCount - 1 ? 0 : prev + 1;
          if (stepSize > 0) {
            container.scrollTo({ left: nextPage * stepSize, behavior: "smooth" });
          }
          return nextPage;
        });
      }, 6000);
    };

    startAutoplay();
    return () => clearInterval(alumniAutoplayRef.current);
  }, []);

  const onAchieverMouseEnter = () => {
    achieverHoveredRef.current = true;
  };
  const onAchieverMouseLeave = () => {
    achieverHoveredRef.current = false;
  };

  const onAlumniMouseEnter = () => {
    alumniHoveredRef.current = true;
  };
  const onAlumniMouseLeave = () => {
    alumniHoveredRef.current = false;
  };

  const placementHighest = useCountUp(1.78);
  const placementTop10 = useCountUp(16);
  const placementAverage = useCountUp(6.5);
  const placementCompanies = useCountUp(300);

  const researchPubs = useCountUp(138);
  const researchPatents = useCountUp(48);

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
                      The Information Technology department builds future-ready professionals through strong computing fundamentals and advanced domains like Quantum Computing, AWS Cloud, Cybersecurity, and Data Engineering. With an industry-aligned curriculum, experiential learning, and globally recognized certifications, students gain the skills and innovation mindset to excel in today's digital landscape.
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
                        ["1.78 Cr", "Highest Package", "2026 Batch"],
                        ["88%", "Placements", "2021-2025 Batches"],
                        ["180", "Annual Intake", "IT Department"],
                        ["370+", "Globally Certified", "Students"],
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
                        ["1.78 Cr", "Highest Package"],
                        ["90%", "Placements"],
                        ["180", "Annual Intake"],
                        ["370+", "Certified Students"],
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
                ["/department_highlights/Emerging_it_technologies.png", "Emerging IT Technologies", "Our curriculum is strategically designed to build strong foundations in computing and programming while introducing students to emerging technologies such as Quantum Computing, AWS Cloud, Cybersecurity, Data Engineering, Full-Stack Development, DevOps, and Software Architecture. Delivered by a highly qualified faculty team from premier institutions and reputed universities, the program ensures a perfect blend of academic rigor and industry-aligned expertise."],
                ["/department_highlights/Experiential_Learning_with_an_AI-Driven_Approach.png", "Experiential Learning with Industry-Driven Approach", "A future-focused, experiential learning ecosystem integrating modern assessments, cloud-based labs, and industry-oriented projects. Students gain hands-on expertise in Quantum Computing, AWS Cloud, Cybersecurity, and Web Technologies through platforms like AWS Academy, GitHub, and HackerRank—ensuring strong practical skills, innovation, and industry readiness."],
                ["/department_highlights/Industry-Centric_Tracks.png", "Industry-Centric Tracks with Globally Recognized Certifications", "Our Information Technology program integrates strong computing foundations with industry-centric specialization tracks in Quantum Computing, AWS Cloud, Cybersecurity, and Data Engineering, aligned with globally recognized certifications. Enriched through expert-led sessions and hands-on learning, it prepares students to be certification-ready, technically proficient, and highly employable in the evolving digital and quantum-driven landscape."],
                ["/department_highlights/LeetCode_Sharing.png", "Comprehensive Placement Preparation Platform", "The department delivers a structured placement preparation framework combining DSA mastery, competitive coding, and continuous assessments through platforms like CodeTantra, Leetcode, HackerRank, CodeChef, and IAMNeo. With added focus on cloud and emerging technologies, students receive certification support, career profiling, technical bootcamps, and expert mentoring—ensuring holistic, industry-ready placement outcomes."],
                ["/department_highlights/Future_Technology_Quantum_Computation.png", "Future Technology — Quantum Computing","The department pioneers next-generation learning by integrating Quantum Computing with core Information Technology. Through hands-on experience with IBM Qiskit, quantum algorithms, and hybrid quantum-classical systems, students explore the future of computation. This forward-looking approach empowers learners to innovate at the intersection of IT and quantum intelligence, preparing them for disruptive technological advancements."],
                ["/department_highlights/Hands-on_Learning_and_Innovative_Ecosystem.png", "Hands-on Learning and Innovative Ecosystem", "The department fosters an experiential and innovation-driven learning environment where students engage in real-world projects, cloud-based labs, and emerging technologies like Quantum Computing, AWS, and Cybersecurity. Through hackathons, research initiatives, and industry collaborations, students develop practical skills, creativity, and problem-solving abilities—preparing them to innovate and excel in a rapidly evolving technological landscape."],
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
                [placementHighest, "1.78", " Cr", "Highest Package", "orange", "PROTON AG, Switzerland"],
                [placementTop10, "16", " LPA ", "Top 10% Average(2022-25)", "navy", "Average of top 10% placed students"],
                [placementAverage, "6.5", " LPA ", "Average Package(2022-25)", "orange", "Overall average placement package"],
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

            {/* Quantum Computing Lab */}
            <div className="rounded-4 overflow-hidden mb-4" style={{ background: "linear-gradient(135deg, #f0f4f8 0%, #fff 50%, #fff8f5 100%)", border: "2px solid rgba(0, 40, 85, 0.12)" }}>
              <div style={{ height: "5px", background: "linear-gradient(90deg, #002855, #f26520)" }} />
              <div className="p-4 p-md-5">
                <div className="row align-items-center">
                  <div className="col-12 col-lg-8">
                    <div className="d-inline-block mb-3 px-3 py-1 rounded-pill" style={{ backgroundColor: "rgba(242, 101, 32, 0.08)", border: "1px solid rgba(242, 101, 32, 0.15)" }}>
                      <span className="fw-semibold fs-5" style={{ color: "#f26520" }}>Next-Gen Computing</span>
                    </div>
                    <h3 className="fw-bold mb-3" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", color: "#002855", lineHeight: 1.3 }}>
                      Quantum Computing <span style={{ color: "#f26520" }}>Laboratory</span>
                    </h3>
                    <p className="fs-3 mb-0" style={{ lineHeight: 1.8, color: "#444", textAlign: "justify", maxWidth: "900px" }}>
                      The Quantum Computing Laboratory at KIET&apos;s IT Department is a pioneering facility dedicated to exploring the frontiers of quantum technology. Equipped with access to IBM Qiskit and quantum simulation platforms, students gain hands-on experience with quantum algorithms, qubit manipulation, and hybrid quantum-classical computing. This state-of-the-art lab prepares students to lead innovations at the intersection of quantum mechanics and information technology, positioning them at the forefront of the next computing revolution.
                    </p>
                  </div>
                  <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                    <img src="/coi/quantum_computing.png" alt="Quantum Computing Lab" className="img-fluid rounded-3" style={{ width: "100%", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tech Mahindra Centre of Excellence */}
            <div className="rounded-4 overflow-hidden" style={{ background: "linear-gradient(135deg, #fff8f5 0%, #fff 50%, #f0f4f8 100%)", border: "2px solid rgba(242, 101, 32, 0.12)" }}>
              <div style={{ height: "5px", background: "linear-gradient(90deg, #f26520, #002855)" }} />
              <div className="p-4 p-md-5">
                <div className="row align-items-center">
                  <div className="col-12 col-lg-8">
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
                  <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                    <img src="/coi/tech_mahindra.png" alt="Tech Mahindra Centre of Excellence" className="img-fluid rounded-3" style={{ width: "100%", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }} />
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
            <div className="clubs-stack">
              {[
                ["Innogeeks", "/it_club/innogeeks.png", "https://www.innogeeks.in/", "At Innogeeks, we embody our motto, 'We Learn, We Teach, We Conquer,' as a guiding principle in fostering a vibrant community of innovators, developers, and tech enthusiasts. Over the years, Innogeeks has grown into a cornerstone of technical excellence at KIET, fostering a culture of collaboration, learning, and impactful innovation.", "#002855"],
                ["GEEK Room", "/it_club/geekroom.png", "https://geekroom-kiet-six.vercel.app/", "GEEK Room is a dynamic tech community dedicated to fostering innovation, collaboration, and continuous learning. The chapter actively hosts hackathons, technical events, workshops, and engaging meetups that bring together passionate students from diverse domains.", "#00304c"],
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
                        The Department of Information Technology, accredited by the NBA five times and currently valid up to June 2028, is committed to excellence in teaching, learning, and research. Our industry-aligned curriculum equips students with strong technical foundations, adaptability, and problem-solving skills to thrive in a rapidly evolving technological landscape driven by innovation in software development, data science, cloud computing, cybersecurity, and the Internet of Things.
                      </p>
                      <div className={deanExpanded ? "" : "d-none d-lg-block"}>
                        <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                          Supported by a highly qualified faculty, professor of practice (Industry), and state-of-the-art laboratories, students gain hands-on experience through cutting-edge research, internships, and industry collaborations. They are encouraged to build expertise in emerging domains such as web development, blockchain, DevOps, edge computing, quantum computing, cloud architecture, and intelligent systems development.
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
                {/* Add 3 blank spaces at the start - these will appear between each cycle */}
                <div style={{ width: "200px", flexShrink: 0 }}></div>
                <div style={{ width: "200px", flexShrink: 0 }}></div>
                <div style={{ width: "200px", flexShrink: 0 }}></div>
                
                {[...faculty, ...faculty].map((member, idx) => (
                  <div key={`${member.name}-${idx}`} className="card border-0 shadow-sm flex-shrink-0" style={{ width: "200px", borderRadius: "12px", cursor: "pointer" }}>
                    <div className="overflow-hidden" style={{ height: "240px", borderTopLeftRadius: "12px", borderTopRightRadius: "12px", position: "relative", backgroundColor: "#f8f9fa" }}>
                      <img alt={member.name} src={member.image} style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, objectFit: "cover", objectPosition: "center top", color: "transparent" }} />
                    </div>
                    <div className="card-body text-center p-2 p-md-3">
                      <h3 className="card-title fw-bold mb-2 fs-4" style={{ color: "#00304c", lineHeight: 1.3 }}>{member.name}</h3>
                      <p className="card-text text-center mb-3 fs-5" style={{ color: "#666", fontWeight: 500, lineHeight: 1.4 }}>{member.role}</p>
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

      <div id="achievers">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5" style={{ padding: "0 0 5rem 0", position: "relative" }}>
          <div className="p-3 p-md-4 p-lg-5">
            <div className="mb-4">
              <h2 className="fw-bold mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                Our Achievers
              </h2>
            </div>
            <div
              ref={achieversRef}
              className="d-flex overflow-auto gap-3 achievers-scroll-container"
              style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}
              onMouseEnter={onAchieverMouseEnter}
              onMouseLeave={onAchieverMouseLeave}
            >
              {ACHIEVERS.map((item) => (
                <div key={item.name} className="achiever-card-wrapper" style={{ flex: "0 0 180px", scrollSnapAlign: "start" }}>
                  <div className="achiever-card" style={{ backgroundColor: "white", borderRadius: "16px", padding: "1rem", height: "100%", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)", transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease", cursor: "default", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                    <div style={{ width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden", position: "relative", backgroundColor: "#e5e7eb", border: "3px solid #f26520", marginBottom: "0.75rem" }}>
                      <img alt={item.name} src={item.image} style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, objectFit: "cover", objectPosition: "center 20%" }} />
                    </div>
                    <h4 className="fs-4 fw-bold text-dark mb-1" style={{ lineHeight: 1.2 }}>{item.name}</h4>
                    <p className="fs-5 fw-semibold mb-1" style={{ color: "#f26520" }}>{item.package}</p>
                    <p className="fs-5 text-muted mb-0">{item.company}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div className="d-flex gap-2">
                <button
                  className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                  style={{ width: "32px", height: "32px", border: "1px solid #f26520", backgroundColor: "transparent", color: "#f26520", transition: "all 0.3s ease" }}
                  aria-label="Previous achiever"
                  onClick={() => scrollToAchieverPage(achieverPage - 1)}
                  disabled={achieverPage === 0}
                >
                  <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>‹</span>
                </button>
                <button
                  className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                  style={{ width: "32px", height: "32px", border: "1px solid #f26520", backgroundColor: "transparent", color: "#f26520", transition: "all 0.3s ease" }}
                  aria-label="Next achiever"
                  onClick={() => scrollToAchieverPage(achieverPage + 1)}
                  disabled={achieverPage >= achieverPageCount - 1}
                >
                  <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>›</span>
                </button>
              </div>
              <div className="d-flex gap-2">
                {Array.from({ length: achieverPageCount }).map((_, index) => (
                  <button
                    key={`achiever-dot-${index}`}
                    type="button"
                    aria-label={`Go to achiever page ${index + 1}`}
                    onClick={() => scrollToAchieverPage(index)}
                    style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: achieverPage === index ? "#ff5722" : "transparent", border: achieverPage === index ? "1px solid #ff5722" : "1px solid #ced4da", cursor: "pointer", padding: 0 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div id="research">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
          <div className="p-3 p-md-4 p-lg-5">
            <h2 className="fw-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
              Research Statistics
            </h2>

            <div className="row g-4 mt-2">
              {/* Publications Card */}
              <div className="col-12 col-md-6">
                <div ref={researchPubs.ref} className="research-stat-card h-100" style={{ background: "linear-gradient(135deg, #fff8f5 0%, #fff 100%)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 32px rgba(242, 101, 32, 0.12)", border: "1px solid rgba(242, 101, 32, 0.1)", position: "relative" }}>
                  <div style={{ height: "5px", background: "linear-gradient(90deg, #f26520, #ff8a50)" }} />
                  <div className="d-flex flex-column flex-lg-row align-items-center p-4 gap-4">
                    <div className="flex-shrink-0" style={{ width: "140px", height: "140px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", background: "#fff" }}>
                      <img src="/publication.png" alt="Publications" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className="text-center text-lg-start flex-grow-1">
                      <div style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1, color: "#f26520", textShadow: "2px 2px 4px rgba(242, 101, 32, 0.1)" }}>
                        {researchPubs.value}+
                      </div>
                      <h3 className="fw-bold mb-2 fs-1" style={{ color: "#002855" }}>Publications</h3>
                      <p className="mb-0 fs-4 text-muted">Research papers published in reputed journals & conferences</p>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(242, 101, 32, 0.05)" }} />
                </div>
              </div>

              {/* Patents Card */}
              <div className="col-12 col-md-6">
                <div ref={researchPatents.ref} className="research-stat-card h-100" style={{ background: "linear-gradient(135deg, #f0f4f8 0%, #fff 100%)", borderRadius: "20px", overflow: "hidden", boxShadow: "0 8px 32px rgba(0, 40, 85, 0.12)", border: "1px solid rgba(0, 40, 85, 0.1)", position: "relative" }}>
                  <div style={{ height: "5px", background: "linear-gradient(90deg, #002855, #1a5276)" }} />
                  <div className="d-flex flex-column flex-lg-row align-items-center p-4 gap-4">
                    <div className="flex-shrink-0" style={{ width: "140px", height: "140px", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", background: "#fff" }}>
                      <img src="/patent.png" alt="Patents" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className="text-center text-lg-start flex-grow-1">
                      <div style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 800, lineHeight: 1, color: "#002855", textShadow: "2px 2px 4px rgba(0, 40, 85, 0.1)" }}>
                        {researchPatents.value}+
                      </div>
                      <h3 className="fw-bold mb-2 fs-1" style={{ color: "#002855" }}>Patents</h3>
                      <p className="mb-0 fs-4 text-muted">Innovative patents filed & granted to faculty & students</p>
                    </div>
                  </div>
                  <div style={{ position: "absolute", bottom: "-30px", right: "-30px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(0, 40, 85, 0.05)" }} />
                </div>
              </div>
            </div>

            {/* Industry Academia Connect */}
            <div className="mt-5">
              <h2 className="fw-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                Industry Academia Connect
              </h2>
              <div className="row g-4">
                {/* Session 1 */}
                <div className="col-12 col-lg-6">
                  <div className="h-100 rounded-4 overflow-hidden" style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease", border: "2px solid rgba(242, 101, 32, 0.1)" }}>
                    <div style={{ height: "5px", background: "linear-gradient(90deg, #f26520, #002855)" }} />
                    <div className="p-4">
                      <img src="/conclave/session1.png" alt="Digital Conclave 2025 - Session 1" className="w-100 rounded-3 mb-3" style={{ objectFit: "cover", height: "300px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }} />
                      <h3 className="fw-bold mb-3 fs-2" style={{ color: "#002855" }}>Digital Conclave 2025 - Session 1</h3>
                      <p className="mb-3 fs-4 text-muted">Expert Talk Series on emerging technologies and industry insights</p>
                      <div className="d-flex gap-3 flex-wrap">
                        <a href="/conclave/session-1" className="btn px-4 py-2 text-white fw-semibold fs-4" style={{ backgroundColor: "#002855", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0, 40, 85, 0.3)" }}>
                          Read More
                        </a>
                        <a href="https://youtu.be/-Agff_KdsHg?si=A4XU7HZ-UkZd90gv" target="_blank" rel="noopener noreferrer" className="btn px-4 py-2 text-white fw-semibold fs-4" style={{ backgroundColor: "#f26520", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(242, 101, 32, 0.3)" }}>
                          Watch Video
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Session 2 */}
                <div className="col-12 col-lg-6">
                  <div className="h-100 rounded-4 overflow-hidden" style={{ boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease", border: "2px solid rgba(242, 101, 32, 0.1)" }}>
                    <div style={{ height: "5px", background: "linear-gradient(90deg, #002855, #f26520)" }} />
                    <div className="p-4">
                      <img src="/conclave/session2.png" alt="Digital Conclave 2025 - Session 2" className="w-100 rounded-3 mb-3" style={{ objectFit: "cover", height: "300px", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)" }} />
                      <h3 className="fw-bold mb-3 fs-2" style={{ color: "#002855" }}>Digital Conclave 2025 - Session 2</h3>
                      <p className="mb-3 fs-4 text-muted">Beyond Earth, Beyond Limits: Shaping Tomorrow's Technology</p>
                      <div className="d-flex gap-3 flex-wrap">
                        <a href="/conclave/session-2" className="btn px-4 py-2 text-white fw-semibold fs-4" style={{ backgroundColor: "#002855", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0, 40, 85, 0.3)" }}>
                          Read More
                        </a>
                        <a href="https://youtu.be/-1hIAPpNZVU?si=9KpjtRl3uC59DF8a" target="_blank" rel="noopener noreferrer" className="btn px-4 py-2 text-white fw-semibold fs-4" style={{ backgroundColor: "#f26520", borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(242, 101, 32, 0.3)" }}>
                          Watch Video
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alumni Testimonials */}
            <div className="mt-5">
              <h2 className="fw-bold mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                Alumni Testimonials
              </h2>
              <div
                ref={alumniRef}
                className="d-flex overflow-auto gap-4 alumni-scroll-container"
                style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory", paddingBottom: "1rem" }}
                onMouseEnter={onAlumniMouseEnter}
                onMouseLeave={onAlumniMouseLeave}
              >
                {ALUMNI_TESTIMONIALS.map((alumni) => (
                  <div key={alumni.name} className="alumni-card-wrapper" style={{ flex: "0 0 calc(50% - 0.75rem)", scrollSnapAlign: "start" }}>
                    <div className="h-100 p-4 rounded-4 alumni-testimonial-card" style={{ backgroundColor: "#fff", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)", border: "1px solid #e9ecef", borderLeft: "4px solid #f26520", transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)", cursor: "pointer", minHeight: "320px", display: "flex", flexDirection: "column" }}>
                      <div className="d-flex gap-3 align-items-start mb-3">
                        <div style={{ width: "70px", height: "70px", borderRadius: "50%", overflow: "hidden", flexShrink: 0, border: "2px solid #f26520" }}>
                          <img src={alumni.image} alt={alumni.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%" }} />
                        </div>
                        <div>
                          <h4 className="fw-bold mb-1 fs-3" style={{ color: "#002855" }}>{alumni.name}</h4>
                          <p className="mb-0 fs-5" style={{ color: "#f26520" }}>{alumni.designation} at {alumni.company}</p>
                          <p className="mb-0 fs-6 text-muted">{alumni.batch}</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-start gap-2 flex-grow-1">
                        <span className="fw-bold" style={{ color: "#f26520", fontSize: "1.5rem", lineHeight: 1 }}>&ldquo;</span>
                        <p className="mb-0 fs-4 fst-italic" style={{ color: "#555", lineHeight: 1.7, textAlign: "justify" }}>{alumni.quote}</p>
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
                    aria-label="Previous testimonial"
                    onClick={() => scrollToAlumniPage(alumniPage - 1)}
                    disabled={alumniPage === 0}
                  >
                    <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>‹</span>
                  </button>
                  <button
                    className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center p-0"
                    style={{ width: "32px", height: "32px", border: "1px solid #f26520", backgroundColor: "transparent", color: "#f26520", transition: "all 0.3s ease" }}
                    aria-label="Next testimonial"
                    onClick={() => scrollToAlumniPage(alumniPage + 1)}
                    disabled={alumniPage >= alumniPageCount - 1}
                  >
                    <span style={{ fontSize: "1.2rem", lineHeight: 0, paddingBottom: "4px" }}>›</span>
                  </button>
                </div>
                <div className="d-flex gap-2">
                  {Array.from({ length: alumniPageCount }).map((_, index) => (
                    <button
                      key={`alumni-dot-${index}`}
                      type="button"
                      aria-label={`Go to testimonial page ${index + 1}`}
                      onClick={() => scrollToAlumniPage(index)}
                      style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: alumniPage === index ? "#ff5722" : "transparent", border: alumniPage === index ? "1px solid #ff5722" : "1px solid #ced4da", cursor: "pointer", padding: 0 }}
                    />
                  ))}
                </div>
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
To achieve excellence in the field of Information Technology and create competent professionals for
the benefit of the world community.                     </p>
                  ),
                },
                {
                  key: "mission",
                  title: "Mission",
                  content: (
                    <ul className="mb-0 ps-3">
                      <li className="mb-2">To integrate quality education, values and skills in the field of Information Technology through
outcome-based teaching and learning process. </li>
                      <li className="mb-2">To undertake research for the development of sustainable IT solutions for real world problems of
society and industry. </li>
<li className="mb-2">To foster an intellectual, innovative and entrepreneurial environment to develop IT leaders.  </li>
                      <li className="mb-0">To create a culture of collaboration and support among teachers and students for sharing of ideas
and knowledge. </li>
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
                      <a href="/syllabus/B.Tech_1st_Year_Course_Booklet_2025-26.pdf" download="B.Tech_1st_Year_Course_Booklet_2025-26.pdf" className="d-flex align-items-center justify-content-between text-decoration-none bg-white rounded shadow-sm" style={{ padding: "14px 18px", width: "100%", border: "1px solid #e9ecef", transition: "all 0.25s ease" }}>
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
                      <a href="/syllabus/B.Tech_2nd_Year_Course_Booklet_2025-26.pdf" download="B.Tech_2nd_Year_Course_Booklet_2025-26.pdf" className="d-flex align-items-center justify-content-between text-decoration-none bg-white rounded shadow-sm" style={{ padding: "14px 18px", width: "100%", border: "1px solid #e9ecef", transition: "all 0.25s ease" }}>
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
              .achievers-scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
              .achievers-scroll-container::-webkit-scrollbar { display: none; }
            }

            @media (max-width: 768px) {
              .achievers-scroll-container { scrollbar-width: none; -ms-overflow-style: none; }
              .achievers-scroll-container::-webkit-scrollbar { display: none; }
              .achiever-card-wrapper { flex: 0 0 140px !important; }
            }

            /* Achiever card hover */
            .achiever-card:hover {
              transform: translateY(-8px) scale(1.03);
              box-shadow: 0 16px 32px rgba(242, 101, 32, 0.15) !important;
            }

            /* Faculty auto-scroll marquee */

            /* Department Highlights hover lift */
            .highlight-card:hover {
              transform: translateY(-6px);
              box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14) !important;
              border-left-color: #f26520 !important;
            }

            /* Alumni Testimonials hover pop-out */
            .alumni-testimonial-card:hover {
              transform: translateY(-8px) scale(1.02);
              box-shadow: 0 20px 40px rgba(242, 101, 32, 0.18) !important;
              border-left-width: 6px;
            }

            /* Research stat cards hover */
            .research-stat-card {
              transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
            }
            .research-stat-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15) !important;
            }

            /* Alumni scroll container */
            .alumni-scroll-container { 
              scrollbar-width: none; 
              -ms-overflow-style: none; 
            }
            .alumni-scroll-container::-webkit-scrollbar { 
              display: none; 
            }

            @media (max-width: 768px) {
              .alumni-card-wrapper { 
                flex: 0 0 85vw !important; 
              }
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
          `}</style>
        </section>
      </div>
    </>
  );
}
