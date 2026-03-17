"use client";

import { useState } from "react";

const roadmap = [
  {
    label: "Artificial Intelligence",
    image: "/emerging-technology/image.png",
    slideImage: "/emerging-technology/image.png",
  },
  {
    label: "Machine Learning",
    image: "/emerging-technology/image copy.png",
    slideImage: "/emerging-technology/image copy.png",
  },
  {
    label: "Data Science & Analytics",
    image: "/emerging-technology/image copy 2.png",
    slideImage: "/emerging-technology/image copy 2.png",
  },
  {
    label: "Cloud Computing",
    image: "/emerging-technology/image copy 3.png",
    slideImage: "/emerging-technology/image copy 3.png",
  },
  {
    label: "Cybersecurity",
    image: "/emerging-technology/image copy 4.png",
    slideImage: "/emerging-technology/image copy 4.png",
  },
  {
    label: "Internet of Things",
    image: "/emerging-technology/image copy 5.png",
    slideImage: "/emerging-technology/image copy 5.png",
  },
];

const CIRCLE_SIZE = 620;
const NODE_SIZE = 96;
const RADIUS = (CIRCLE_SIZE - NODE_SIZE) / 2;

function getNodePosition(index, total, radius) {
  const angle = (2 * Math.PI * index) / total - Math.PI / 2;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}

export default function Roadmap() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5"
      id="roadmap"
      style={{ padding: "4rem 0", position: "relative", zIndex: 1 }}
    >
      <div className="p-3 p-md-4 p-lg-5">
        <div className="mb-4">
          <h2
            className="fw-bold mb-3 fs-1"
            style={{
              color: "#002855",
              borderBottom: "3px solid #f26520",
              paddingBottom: "10px",
              display: "inline-block",
            }}
          >
            Emerging Technology Pathways
          </h2>
          <div>
            <span className="fs-3 fst-italic" style={{ fontWeight: 500, color: "#666" }}>
              Click a pathway to explore details
            </span>
          </div>
        </div>

        {/* Desktop: Circular layout */}
        <div className="d-none d-lg-block">
          <div className="d-flex align-items-center justify-content-center gap-5">
            {/* Detail panel on the left */}
            <div
              style={{
                flex: "0 0 600px",
                maxWidth: "600px",
                transition: "opacity 0.4s ease",
              }}
            >
              <div
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  border: "3px solid #f26520",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
                  padding: "1.5rem",
                  width: "100%",
                }}
              >
                <h3 className="fw-bold fs-2 mb-3" style={{ color: "#002855" }}>
                  {roadmap[activeStep].label}
                </h3>
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
            </div>

            {/* Circle on the right */}
            <div
              style={{
                width: `${CIRCLE_SIZE}px`,
                height: `${CIRCLE_SIZE}px`,
                position: "relative",
                flexShrink: 0,
              }}
            >
              {/* SVG ring connector */}
              <svg
                width={CIRCLE_SIZE}
                height={CIRCLE_SIZE}
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <circle
                  cx={CIRCLE_SIZE / 2}
                  cy={CIRCLE_SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="#e0e0e0"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                />
              </svg>

              {/* Center content */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: `${RADIUS * 1.2}px`,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "110px",
                    height: "110px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "3px solid #f26520",
                    marginBottom: "10px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={roadmap[activeStep].image}
                    alt={roadmap[activeStep].label}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
                <p className="fw-bold fs-3 mb-0" style={{ color: "#f26520", lineHeight: 1.2 }}>
                  {roadmap[activeStep].label}
                </p>
                <p className="fs-5 text-muted mb-0 mt-1">
                  Pathway {activeStep + 1} of {roadmap.length}
                </p>
              </div>

              {/* Nodes around the circle */}
              {roadmap.map((item, idx) => {
                const { x, y } = getNodePosition(idx, roadmap.length, RADIUS);
                const isActive = activeStep === idx;
                return (
                  <div
                    key={item.label}
                    style={{
                      position: "absolute",
                      left: `${CIRCLE_SIZE / 2 + x - NODE_SIZE / 2}px`,
                      top: `${CIRCLE_SIZE / 2 + y - NODE_SIZE / 2}px`,
                      width: `${NODE_SIZE}px`,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      cursor: "pointer",
                      zIndex: isActive ? 5 : 2,
                    }}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div
                      style={{
                        width: `${NODE_SIZE}px`,
                        height: `${NODE_SIZE}px`,
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: isActive ? "4px solid #f26520" : "3px solid #ccc",
                        backgroundColor: "#fff",
                        boxShadow: isActive
                          ? "0 0 0 5px rgba(242, 101, 32, 0.25), 0 6px 20px rgba(0, 0, 0, 0.2)"
                          : "0 4px 12px rgba(0, 0, 0, 0.1)",
                        transition: "all 0.3s ease",
                        transform: isActive ? "scale(1.2)" : "scale(1)",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
                      />
                    </div>
                    <p
                      style={{
                        marginTop: "6px",
                        fontSize: "0.65rem",
                        fontWeight: 800,
                        color: isActive ? "#f26520" : "#002855",
                        textTransform: "uppercase",
                        textAlign: "center",
                        lineHeight: 1.15,
                        maxWidth: "110px",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile: vertical list with tap-to-expand */}
        <div className="d-lg-none">
          <div className="d-flex flex-column gap-3">
            {roadmap.map((item, idx) => {
              const isActive = activeStep === idx;
              return (
                <div key={item.label}>
                  <button
                    className="w-100 d-flex align-items-center gap-3 border-0 bg-white rounded-3 p-3"
                    style={{
                      boxShadow: isActive
                        ? "0 4px 16px rgba(242, 101, 32, 0.2)"
                        : "0 2px 8px rgba(0, 0, 0, 0.06)",
                      border: isActive ? "2px solid #f26520" : "2px solid transparent",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => setActiveStep(idx)}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        overflow: "hidden",
                        border: isActive ? "3px solid #f26520" : "2px solid #ccc",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <span
                      className="fw-bold fs-3 text-start flex-grow-1"
                      style={{ color: isActive ? "#f26520" : "#002855" }}
                    >
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: isActive ? "#f26520" : "#999",
                        transform: isActive ? "rotate(180deg)" : "rotate(0)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      ▼
                    </span>
                  </button>
                  {isActive && (
                    <div
                      className="mt-2 p-3 bg-white rounded-3"
                      style={{
                        border: "2px solid #f26520",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <img
                        src={item.slideImage}
                        alt={`${item.label} Slide`}
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
