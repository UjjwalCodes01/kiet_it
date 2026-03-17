"use client";

import { useEffect, useRef, useState } from "react";
import Roadmap from "./Roadmap";

const recruiterLogos = Array.from({ length: 49 }, (_, idx) => `/assets/images/kiet/placement/recruiters/${idx + 1}.${[3, 5, 10, 14, 15, 17, 20, 27, 32, 37, 45, 48, 49].includes(idx + 1) ? "jpg" : "png"}`);
const recruitersLoop = [...recruiterLogos, ...recruiterLogos];

const testimonials = [
  {
    company: "Soon Networks",
    year: "2021-25",
    name: "Akshat Sharma",
    packageValue: "60 LPA",
    image: "/cse-ai-assets/Testimonial photo/Akshat Sharma.png",
    quote:
      "First Year: Started post-JEE with CS50x in the first semester, fueled by an interest for open source and internet privacy, connected to communities li...",
  },
  {
    company: "Triton One Limited",
    year: "2022-26",
    name: "Prapti Sharma",
    packageValue: "55 LPA",
    image: "/cse-ai-assets/Testimonial photo/Prapti Sharma.jpeg",
    quote:
      "I'm happy to share that I'm currently working at Triton, a Solana RPC provider, and I genuinely feel that my department, CSE-AIML, played an important...",
  },
  {
    company: "Service Now",
    year: "2022-26",
    name: "Vedanshi Kaushik",
    packageValue: "42.7 LPA",
    image: "/cse-ai-assets/Testimonial photo/Vedanshi .jpeg",
    quote:
      "Being a part of KIET Group of Institutions as a B.Tech student from the CSE (AI & ML) department has been a meaningful and enriching journey for me. O...",
  },
  {
    company: "Razorpay",
    year: "2022-26",
    name: "Archit Agarwal",
    packageValue: "35 LPA",
    image: "/cse-ai-assets/Testimonial photo/Archit Agarwal.jpg",
    quote:
      "Pursuing B.Tech in CSE (AI) at KIET Group of Institutions was an important phase in my academic and professional journey. The program was designed to ...",
  },
  {
    company: "AMD",
    year: "2022-26",
    name: "Shobhit Sinha",
    packageValue: "32 LPA",
    image: "/cse-ai-assets/Testimonial photo/Shobhit Sinha.jpg",
    quote:
      "My journey at KIET Group of Institutions as a B.Tech graduate from the CSE (AI&ML) department contributed to my technical foundation and early career ...",
  },
  {
    company: "GPU.NET",
    year: "2021-25",
    name: "Aryan Mishra",
    packageValue: "24 LPA",
    image: "/cse-ai-assets/Testimonial photo/Aryan Mishra .png",
    quote:
      "My journey at KIET Group of Institutions as a B.Tech graduate from the CSE (AI&ML) department was truly transformative! The vibrant campus and cutting...",
  },
  {
    company: "Juspay",
    year: "2022-26",
    name: "Nayni Singhal",
    packageValue: "21 LPA",
    image: "/cse-ai-assets/Testimonial photo/Nayni Singhal.jpg",
    quote:
      "My journey at KIET Group of Institutions as a B.Tech student from the Computer Science & Engineering (AI & ML) branch (2022-2026 batch) has been a tru...",
  },
  {
    company: "Razorpay",
    year: "2022-26",
    name: "Aditya Mohan Gupta",
    packageValue: "21 LPA",
    image: "/cse-ai-assets/Testimonial photo/Aditya Mohan Gupta.jpg",
    quote:
      "When I first stepped into KIET Group of Institutions, I had absolutely no background in DSA, or Web Development. The world of programming felt vast an...",
  },
  {
    company: "Juspay",
    year: "2022-26",
    name: "Kanak Agarwal",
    packageValue: "21 LPA",
    image: "/cse-ai-assets/Testimonial photo/Kanak Agrawal.jpg",
    quote:
      "I'm glad to share that I'm currently interning at Juspay, with a Pre-Placement Offer of 21 LPA based on my internship performance. This achievement is...",
  },
  {
    company: "MeetMux",
    year: "2022-26",
    name: "Parth Agarwal",
    packageValue: "20 LPA",
    image: "/cse-ai-assets/Testimonial photo/PARTH AGARWAL.jpg",
    quote:
      "Reflecting on my time at the KIET Group of Institutions, I am filled with immense gratitude for the AI & ML department, which served as the ultimate l...",
  },
  {
    company: "CISCO",
    year: "2021-25",
    name: "Kanishk Joshi",
    packageValue: "18 LPA",
    image: "/cse-ai-assets/Testimonial photo/Kanishk Joshi .jpeg",
    quote:
      "During my first year at KIET Group of Institutions, Ghaziabad, I explored several domains, including machine learning and web development. I also dive...",
  },
  {
    company: "Future First",
    year: "2022-26",
    name: "Krishna Kumar Chaudhary",
    packageValue: "17 LPA",
    image: "/cse-ai-assets/Testimonial photo/Krishna Kumar Chaudhary.jpg",
    quote:
      "Being placed in Futures First is a proud milestone for me, and I genuinely feel that this achievement is the result of the environment and support sys...",
  },
];

const publications = [
  {
    title: "Security Driven Scheduling Model for Computational Grid Using NSGA-II",
    author: "Dr. Rekha Kashyap, et al.",
    link: "https://doi.org/10.1007/s10723-013-9251-x",
    journal: "Jour. of Grid Comp.",
  },
  {
    title: "Advanced hyperparameter optimization for lung cancer detection using DenseBeetle network",
    author: "Dr. Laxman Singh, et al.",
    link: "https://doi.org/10.1016/j.chemolab.2025.105584",
    journal: "Chem. & Int. Lab. Sys. 2026",
  },
  {
    title: "Low resource federated learning for classification using hybrid deep transfer models",
    author: "Dr. Sapna Juneja, et al.",
    link: "https://doi.org/10.1038/s41598-026-36848-w",
    journal: "Sci. Rep. 2026",
  },
  {
    title: "Hybrid deep learning system for crop disease classification using modified SegNet segmentation",
    author: "Dr. Mukesh Kumar Tripathi, et al.",
    link: "https://doi.org/10.1016/j.compeleceng.2025.110576",
    journal: "Comp. & Elec. Eng. 2025",
  },
  {
    title: "Firefly algorithm and DNN for improved contactless biometric authentication",
    author: "Dr. Sapna Juneja, et al.",
    link: "https://doi.org/10.1038/s41598-025-32633-3",
    journal: "Sci. Rep. 2026",
  },
  {
    title: "A survey on abnormal behavior detection based intelligence information video surveillance system using optimized machine learning methods",
    author: "Dr. Laxman Singh, et al.",
    link: "https://doi.org/10.1016/j.engappai.2025.113438",
    journal: "Eng. App. Art. Int. 2026",
  },
  {
    title: "Proposed ResVGG-Net Model for Mango Leaf Disease Classification and Agricultural Sustainability",
    author: "Dr. Sapna Juneja, et al.",
    link: "https://doi.org/10.1007/s10341-025-01667-2",
    journal: "App. Fru. Sci. 2025",
  },
  {
    title: "Hybrid optimization with constraints handling for combinatorial test case prioritization problems",
    author: "Dr. Mukesh Kumar Tripathi, et al.",
    link: "https://doi.org/10.1080/0954898x.2025.2517130",
    journal: "NCNS 2025",
  },
  {
    title: "Enhanced tree enumeration through satellite imagery and hybrid ensemble cyclic averaging stacked chain deep learning model tuned with BRO algorithm",
    author: "Dr. Shelly Gupta, et al.",
    link: "https://doi.org/10.1007/s12596-025-02810-8",
    journal: "Jour. of Opt. 2025",
  },
  {
    title: "Design of an Efficient Integrated Feature Engineering based Deep Learning Model Using CNN for Customer's Review Helpfulness Prediction",
    author: "Dr. Laxman Singh, et al.",
    link: "https://doi.org/10.1007/s11277-023-10834-1",
    journal: "Wir. Per. Comm. 2024",
  },
  {
    title: "Improvement of process capability analysis through Six Sigma methodology: a case study in the capacitor manufacturing industry",
    author: "Nidhi Singh, et al.",
    link: "https://doi.org/10.1504/IJSSCA.2025.145612",
    journal: "IJSSCA 2025",
  },
  {
    title: "Multi-model machine learning framework for lung cancer risk prediction: comparative analysis of classifiers",
    author: "Dr. Sapna Juneja, et al.",
    link: "https://doi.org/10.1016/j.slast.2025.100314",
    journal: "SLAS Tech. 2025",
  },
  {
    title: "Enhancing security and privacy of chest X-ray images by implementing edge-based steganography and layered cryptography",
    author: "Dr. Sapna Juneja, et al.",
    link: "https://doi.org/10.1016/j.aej.2025.08.051",
    journal: "Alex. Eng. Jour. 2025",
  },
  {
    title: "Hybrid pre trained model based feature extraction for enhanced indoor scene classification in federated learning environments",
    author: "Dr. Sapna Juneja, et al.",
    link: "https://doi.org/10.1038/s41598-025-16673-3",
    journal: "Sci. Rep. 2025",
  },
  {
    title: "Diabetic Retinopathy Detection with Uncertainty scores: Transfer Learning and Ensemble Calibration",
    author: "Preeti Verma, et al.",
    link: "https://doi.org/10.14201/adcaij.32209",
    journal: "ADCAIJ 2025",
  },
  {
    title: "Anomaly detection framework for highly scattered and dynamic data on large-scale networks using AWS",
    author: "Dr. Richa Singh, et al.",
    link: "https://doi.org/10.1007/s41870-024-01765-6",
    journal: "IJIT 2024",
  },
  {
    title: "Predicting the Veracity of News Articles Using Multimodal Embeddings and NLP-Based Features",
    author: "Dr. Richa Singh, et al.",
    link: "https://doi.org/10.1109/IDICAIEI58380.2023.10406898",
    journal: "IDICAIEI 2023",
  },
  {
    title: "Towards Intelligent Retail Security: ConvLSTM-Based Shoplifting Detection with Adam Optimization",
    author: "Dr. Kiran, et al.",
    link: "https://doi.org/10.5281/zenodo.17386861",
    journal: "Zenodo 2025",
  },
  {
    title: "An Ontology Alignment based on Machine learning for Integration of Patient Health Data",
    author: "Sundeep Raj, et al.",
    link: "http://dx.doi.org/10.12785/ijcds/1571028689",
    journal: "IJCDS 2024",
  },
];

export default function ProgramDetails({ faculty, facultyPageHref }) {
  const [openSection, setOpenSection] = useState("vision");
  const testimonialsRef = useRef(null);
  const publicationsRef = useRef(null);
  const [testimonialPage, setTestimonialPage] = useState(0);
  const [testimonialPageCount, setTestimonialPageCount] = useState(1);
  const [publicationPage, setPublicationPage] = useState(0);
  const [publicationPageCount, setPublicationPageCount] = useState(1);

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

    const { pageCount, stepSize } = getCarouselMetrics(container, ".testimonial-card-wrapper", testimonials.length);
    setTestimonialPageCount(pageCount);

    if (stepSize <= 0) {
      setTestimonialPage(0);
      return;
    }

    const currentPage = Math.min(pageCount - 1, Math.max(0, Math.round(container.scrollLeft / stepSize)));
    setTestimonialPage(currentPage);
  };

  const scrollToTestimonialPage = (requestedPage) => {
    const container = testimonialsRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".testimonial-card-wrapper", testimonials.length);
    const boundedPage = Math.min(pageCount - 1, Math.max(0, requestedPage));
    setTestimonialPageCount(pageCount);
    setTestimonialPage(boundedPage);

    if (stepSize > 0) {
      container.scrollTo({ left: boundedPage * stepSize, behavior: "smooth" });
    }
  };

  const syncPublicationPagination = () => {
    const container = publicationsRef.current;
    if (!container) {
      return;
    }

    const { pageCount, stepSize } = getCarouselMetrics(container, ".publication-card-wrapper", publications.length);
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

    const { pageCount, stepSize } = getCarouselMetrics(container, ".publication-card-wrapper", publications.length);
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

      <div id="info"></div>

      <div id="placement">
        <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
          <div className="p-3 p-md-4 p-lg-5">
            <h2 className="fw-bold mb-4 fs-1" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
              Placement Overview
            </h2>
            <div className="row g-3">
              {[
                ["60 LPA", "Highest Package", "#f26520"],
                ["17 LPA", "Top 10% Placement", "#002855"],
                ["6.5 LPA", "Average Package", "#f26520"],
                ["300+", "Total Companies", "#002855"],
              ].map((item) => (
                <div key={item[1]} className="col-12 col-md-6 col-lg-3">
                  <div className="card fs-1 h-100 border-0 text-white d-flex flex-column justify-content-center align-items-center text-center p-4" style={{ backgroundColor: item[2], borderRadius: "12px", minHeight: "140px" }}>
                    <h3 className="fw-bold mb-2 fs-1" style={{ color: "#fff", lineHeight: 1.1 }}>{item[0]}</h3>
                    <p className="mb-0 fs-2 text-white">{item[1]}</p>
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

      <div id="coe"></div>

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
                      <div className="d-none d-lg-block">
                        <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                          Our AI-first ecosystem integrates strong computational foundations with supercomputing infrastructure, global certifications, industry co-creation, and experiential learning.
                        </p>
                        <p className="mb-3 fs-4" style={{ lineHeight: 1.8, color: "#333", textAlign: "justify" }}>
                          We envision our department as a hub where artificial intelligence, data, cloud, and emerging technologies converge to create real-world impact.
                        </p>
                      </div>
                      <button className="btn btn-link d-lg-none p-0 text-decoration-none" style={{ color: "#f26520", fontWeight: 600 }}>Read More</button>
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
            <div className="d-flex gap-3 gap-md-4 overflow-auto pb-4 px-1 scrollbar-hide" style={{ scrollSnapType: "x mandatory" }}>
              {faculty.slice(0, 18).map((member) => (
                <div key={member.name} className="card border-0 shadow-sm flex-shrink-0" style={{ width: "180px", borderRadius: "12px", scrollSnapAlign: "start", transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "pointer" }}>
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
            <div ref={testimonialsRef} className="d-flex overflow-auto gap-4 testimonials-scroll-container" style={{ scrollBehavior: "smooth", scrollSnapType: "x mandatory" }}>
              {testimonials.map((item) => (
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
                    <button className="btn fs-5 p-2 fw-semibold mt-auto text-start border-0 bg-transparent" style={{ color: "#f26520" }}>Read More →</button>
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
                {publications.map((paper) => (
                  <div key={paper.title} className="card border-0 shadow-sm flex-shrink-0 p-4 d-flex flex-column justify-content-between publication-card-wrapper" style={{ width: "260px", borderRadius: "12px", minHeight: "240px", scrollSnapAlign: "start", backgroundColor: "#fff", transition: "transform 0.3s ease, box-shadow 0.3s ease", cursor: "pointer" }}>
                    <div>
                      <h4 className="fw-bold mb-3 fs-2" style={{ color: "#f26520", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.4 }}>{paper.title}</h4>
                      <p className="text-muted small mb-3 fs-4">{paper.author}</p>
                    </div>
                    <a href={paper.link} target="_blank" rel="noreferrer" className="btn btn-sm w-100 text-white fw-semibold fs-4" style={{ backgroundColor: "#00304c", borderRadius: "6px", padding: "0.5rem" }}>
                      {paper.journal}
                    </a>
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
                  ["123", "Publications"],
                  ["31", "Patents"],
                  ["2", "Govt. Projects"],
                  ["50", "Grants (Lakhs)"],
                ].map((item) => (
                  <div key={item[1]} className="col-6 col-lg-3">
                    <div className="card h-100 border-0 shadow-sm text-center py-4 rounded-4">
                      <h2 className="fw-bold display-6 text-dark mb-2">{item[0]}</h2>
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
          `}</style>
        </section>
      </div>
    </>
  );
}
