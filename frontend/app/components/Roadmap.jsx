"use client";

import { useState } from "react";

const roadmap = [
  {
    label: "Applied Science",
    image: "/cse-ai-assets/Roadmap/Applied Science.png",
    slideImage: "/cse-ai-assets/Subject Slide/Applied Science.png",
  },
  {
    label: "Aptitude & Reasoning",
    image: "/cse-ai-assets/Roadmap/Aptitude & REASONING.png",
    slideImage: "/cse-ai-assets/Subject Slide/Aptitude & REASONING.png",
  },
  {
    label: "Core Skills",
    image: "/cse-ai-assets/Roadmap/Core Skills.png",
    slideImage: "/cse-ai-assets/Subject Slide/Core Skills.png",
  },
  {
    label: "Problem Solving",
    image: "/cse-ai-assets/Roadmap/Problem Solving.png",
    slideImage: "/cse-ai-assets/Subject Slide/Problem Solving.png",
  },
  {
    label: "Soft Skills",
    image: "/cse-ai-assets/Roadmap/Soft Skills.png",
    slideImage: "/cse-ai-assets/Subject Slide/Soft Skills.png",
  },
  {
    label: "Web Development",
    image: "/cse-ai-assets/Roadmap/Web DEVELOPMENT.png",
    slideImage: "/cse-ai-assets/Subject Slide/Web DEVELOPMENT.png",
  },
  {
    label: "Data Engineering",
    image: "/cse-ai-assets/Roadmap/Data Engineering.png",
    slideImage: "/cse-ai-assets/Subject Slide/Data Engineering.png",
  },
  {
    label: "Machine Learning",
    image: "/cse-ai-assets/Roadmap/Machine Learning.png",
    slideImage: "/cse-ai-assets/Subject Slide/Machine Learning.png",
  },
  {
    label: "Cloud & Network Security",
    image: "/cse-ai-assets/Roadmap/Cloud and Network Security.png",
    slideImage: "/cse-ai-assets/Subject Slide/Cloud and Network Security.png",
  },
  {
    label: "Industry Certification",
    image: "/cse-ai-assets/Roadmap/Industry-Integrated.png",
    slideImage: "/cse-ai-assets/Subject Slide/Industry Alligned.png",
  },
];

export default function Roadmap() {
  const [activeStep, setActiveStep] = useState(null);

  return (
    <section
      className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5"
      id="roadmap"
      style={{ padding: "4rem 0", position: "relative", zIndex: 1 }}
    >
      <div className="p-3 p-md-4 p-lg-5">
        <div className="mb-5">
          <h2
            className="fw-bold mb-3 fs-1"
            style={{
              color: "#002855",
              borderBottom: "3px solid #f26520",
              paddingBottom: "10px",
              display: "inline-block",
            }}
          >
            Learning Roadmap
          </h2>
          <div>
            <span className="fs-3 fst-italic kiet-text-secondary" style={{ fontWeight: 500 }}>
              Click a step to view details
            </span>
          </div>
        </div>

        {/* Desktop: Horizontal stepper */}
        <div className="d-none d-lg-block">
          <div style={{ position: "relative", padding: "0 1rem" }}>
            {/* Connector line */}
            <div
              style={{
                position: "absolute",
                top: "40px",
                left: "calc(5% + 10px)",
                right: "calc(5% + 10px)",
                height: "3px",
                backgroundColor: "#e0e0e0",
                zIndex: 0,
              }}
            />
            {/* Progress fill */}
            {activeStep !== null && (
              <div
                style={{
                  position: "absolute",
                  top: "40px",
                  left: "calc(5% + 10px)",
                  width: `${(activeStep / (roadmap.length - 1)) * 90}%`,
                  height: "3px",
                  backgroundColor: "#f26520",
                  zIndex: 0,
                  transition: "width 0.4s ease",
                }}
              />
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 1,
              }}
            >
              {roadmap.map((item, idx) => {
                const isActive = activeStep === idx;
                const isCompleted = activeStep !== null && idx < activeStep;
                return (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: `${100 / roadmap.length}%`,
                      cursor: "pointer",
                    }}
                    onClick={() => setActiveStep(isActive ? null : idx)}
                  >
                    {/* Circle */}
                    <div
                      style={{
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: isActive
                          ? "4px solid #f26520"
                          : isCompleted
                            ? "3px solid #002855"
                            : "3px solid #ccc",
                        backgroundColor: "#fff",
                        boxShadow: isActive
                          ? "0 0 0 4px rgba(242, 101, 32, 0.2), 0 6px 20px rgba(0, 0, 0, 0.15)"
                          : "0 4px 12px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease",
                        transform: isActive ? "scale(1.15)" : "scale(1)",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    {/* Label */}
                    <p
                      style={{
                        marginTop: "0.75rem",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: isActive ? "#f26520" : "#002855",
                        textTransform: "uppercase",
                        textAlign: "center",
                        lineHeight: 1.2,
                        transition: "color 0.3s ease",
                        maxWidth: "100px",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Expanded detail panel */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: activeStep !== null ? "600px" : "0",
              opacity: activeStep !== null ? 1 : 0,
              transition: "max-height 0.5s ease, opacity 0.4s ease, margin 0.4s ease",
              marginTop: activeStep !== null ? "2rem" : "0",
            }}
          >
            {activeStep !== null && (
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  border: "3px solid #f26520",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
                  padding: "1.5rem",
                  position: "relative",
                }}
              >
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h3 className="fw-bold fs-2 mb-0" style={{ color: "#002855" }}>
                    {roadmap[activeStep].label}
                  </h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStep(null);
                    }}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "#f26520",
                      border: "none",
                      color: "#fff",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                      flexShrink: 0,
                    }}
                  >
                    &times;
                  </button>
                </div>
                <img
                  src={roadmap[activeStep].slideImage}
                  alt={`${roadmap[activeStep].label} Slide`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Mobile: Horizontal scrollable stepper */}
        <div className="d-lg-none">
          <div
            style={{
              overflowX: "auto",
              paddingBottom: "1rem",
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                position: "relative",
                minWidth: `${roadmap.length * 100}px`,
                padding: "0 1rem",
              }}
            >
              {roadmap.map((item, idx) => {
                const isActive = activeStep === idx;
                return (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      minWidth: "90px",
                      flex: "1 0 auto",
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onClick={() => setActiveStep(isActive ? null : idx)}
                  >
                    {/* Connector line (not on first) */}
                    {idx > 0 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "30px",
                          right: "50%",
                          width: "100%",
                          height: "2px",
                          backgroundColor:
                            activeStep !== null && idx <= activeStep ? "#f26520" : "#e0e0e0",
                          zIndex: 0,
                          transition: "background-color 0.3s ease",
                        }}
                      />
                    )}
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: isActive ? "3px solid #f26520" : "2px solid #ccc",
                        backgroundColor: "#fff",
                        boxShadow: isActive
                          ? "0 0 0 3px rgba(242, 101, 32, 0.2)"
                          : "0 2px 8px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease",
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                        position: "relative",
                        zIndex: 1,
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        marginTop: "0.5rem",
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: isActive ? "#f26520" : "#002855",
                        textTransform: "uppercase",
                        textAlign: "center",
                        lineHeight: 1.2,
                        maxWidth: "80px",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile expanded panel */}
          {activeStep !== null && (
            <div
              style={{
                marginTop: "1rem",
                backgroundColor: "#fff",
                borderRadius: "12px",
                border: "2px solid #f26520",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
                padding: "1rem",
                position: "relative",
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="fw-bold fs-3 mb-0" style={{ color: "#002855" }}>
                  {roadmap[activeStep].label}
                </h4>
                <button
                  onClick={() => setActiveStep(null)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#f26520",
                    border: "none",
                    color: "#fff",
                    fontSize: "1rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  &times;
                </button>
              </div>
              <img
                src={roadmap[activeStep].slideImage}
                alt={`${roadmap[activeStep].label} Slide`}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  display: "block",
                }}
              />
            </div>
          )}
        </div>
      </div>

      <style>{`
        .d-lg-none::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
