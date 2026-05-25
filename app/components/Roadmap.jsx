"use client";

import { useState } from "react";

// SVG icons for each technology
const TechIcons = {
  android: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 18C6 18.55 6.45 19 7 19H8V22.5C8 23.33 8.67 24 9.5 24C10.33 24 11 23.33 11 22.5V19H13V22.5C13 23.33 13.67 24 14.5 24C15.33 24 16 23.33 16 22.5V19H17C17.55 19 18 18.55 18 18V8H6V18ZM4 8C3.17 8 2.5 8.67 2.5 9.5V16.5C2.5 17.33 3.17 18 4 18C4.83 18 5.5 17.33 5.5 16.5V9.5C5.5 8.67 4.83 8 4 8ZM20 8C19.17 8 18.5 8.67 18.5 9.5V16.5C18.5 17.33 19.17 18 20 18C20.83 18 21.5 17.33 21.5 16.5V9.5C21.5 8.67 20.83 8 20 8ZM15.53 2.16L16.84 0.85C17.03 0.66 17.03 0.35 16.84 0.16C16.65 -0.03 16.34 -0.03 16.15 0.16L14.63 1.68C13.81 1.25 12.88 1 11.9 1C10.94 1 10.03 1.25 9.22 1.67L7.7 0.16C7.51 -0.03 7.2 -0.03 7.01 0.16C6.82 0.35 6.82 0.66 7.01 0.85L8.32 2.16C6.91 3.19 6 4.87 6 6.75V7H18V6.75C18 4.87 17.09 3.19 15.68 2.16H15.53ZM10 5H9V4H10V5ZM15 5H14V4H15V5Z" fill="#3DDC84"/>
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM19 18H6C3.79 18 2 16.21 2 14C2 11.95 3.53 10.24 5.56 10.03L6.63 9.92L7.13 8.97C8.08 7.14 9.94 6 12 6C14.62 6 16.88 7.86 17.39 10.43L17.69 11.93L19.22 12.04C20.78 12.14 22 13.45 22 15C22 16.65 20.65 18 19 18Z" fill="#2196F3"/>
      <path d="M8 13H16V15H8V13Z" fill="#2196F3"/>
      <path d="M11 10H13V18H11V10Z" fill="#2196F3"/>
    </svg>
  ),
  dataEngineering: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 4.02 2 6.5V17.5C2 19.98 6.48 22 12 22C17.52 22 22 19.98 22 17.5V6.5C22 4.02 17.52 2 12 2ZM12 4C16.42 4 20 5.57 20 6.5C20 7.43 16.42 9 12 9C7.58 9 4 7.43 4 6.5C4 5.57 7.58 4 12 4ZM4 9.32C5.76 10.39 8.71 11 12 11C15.29 11 18.24 10.39 20 9.32V12.5C20 13.43 16.42 15 12 15C7.58 15 4 13.43 4 12.5V9.32ZM12 20C7.58 20 4 18.43 4 17.5V14.32C5.76 15.39 8.71 16 12 16C15.29 16 18.24 15.39 20 14.32V17.5C20 18.43 16.42 20 12 20Z" fill="#FF6F00"/>
    </svg>
  ),
  dataStructures: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#9C27B0"/>
      <path d="M2 17L12 22L22 17V12L12 17L2 12V17Z" fill="#9C27B0"/>
      <path d="M2 12L12 17L22 12" stroke="#9C27B0" strokeWidth="2"/>
    </svg>
  ),
  java: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.762.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573" fill="#E76F00"/>
      <path d="M18.871 19.837s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118" fill="#E76F00"/>
      <path d="M14.401 0s2.494 2.494-2.365 6.338c-3.896 3.083-.889 4.845-.001 6.854-2.274-2.053-3.943-3.858-2.824-5.541 1.644-2.469 6.197-3.665 5.19-7.651" fill="#E76F00"/>
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 11.39 4.08 10.79 4.21 10.22L8.99 15V16C8.99 17.1 9.89 18 10.99 18V19.93C7.06 19.43 4 16.07 4 12ZM17.89 17.4C17.64 16.59 16.89 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.19 15.98 17.89 17.4Z" fill="#E91E63"/>
    </svg>
  ),
  quantum: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" fill="#00BCD4" stroke="#00BCD4" strokeWidth="1.5"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#00BCD4" strokeWidth="1.5" transform="rotate(0 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#00BCD4" strokeWidth="1.5" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#00BCD4" strokeWidth="1.5" transform="rotate(120 12 12)"/>
      <circle cx="12" cy="12" r="1.5" fill="#fff"/>
    </svg>
  ),
  genAi: (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FF9800"/>
      <circle cx="12" cy="12" r="3" fill="#FFF" opacity="0.8"/>
      <path d="M12 9V15M9 12H15" stroke="#FF9800" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
};

const roadmap = [
  {
    label: "Android Development",
    icon: "android",
    slideImage: "/emerging-technology/androidDevelopment.webp",
  },
  {
    label: "Cloud Computing",
    icon: "cloud",
    slideImage: "/emerging-technology/cloudComputing.webp",
  },
  {
    label: "Data Engineering",
    icon: "dataEngineering",
    slideImage: "/emerging-technology/dataEngineering.webp",
  },
  {
    label: "Data Structures",
    icon: "dataStructures",
    slideImage: "/emerging-technology/datastructure.webp",
  },
  {
    label: "OOPs in Java",
    icon: "java",
    slideImage: "/emerging-technology/oopsInjava.webp",
  },
  {
    label: "Web Development",
    icon: "web",
    slideImage: "/emerging-technology/webdevelopment.webp",
  },
  {
    label: "Quantum Computing",
    icon: "quantum",
    slideImage: "/emerging-technology/quantum-computing.webp",
  },
  {
    label: "Gen AI",
    icon: "genAi",
    slideImage: "/emerging-technology/gen_ai.webp",
  },
];

export default function Roadmap() {
  const [activeIndex, setActiveIndex] = useState(null);

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
              color: "var(--kiet-primary)",
              borderBottom: "3px solid var(--kiet-secondary)",
              paddingBottom: "10px",
              display: "inline-block",
            }}
          >
            Emerging Technology Pathways
          </h2>
          <div>
            <span
              className="d-lg-none"
              style={{ fontWeight: 500, fontSize: "1.5rem", color: "#666", fontStyle: "italic" }}
            >
              Tap logo to read more
            </span>
            <span
              className="d-none d-lg-inline fs-3 fst-italic"
              style={{ fontWeight: 500, color: "#666" }}
            >
              Hover and view details
            </span>
          </div>
        </div>

        {/* Desktop: Grid layout with alternating rows */}
        <div className="d-none d-lg-block">
          <div style={{ position: "relative", padding: "1rem 0" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${roadmap.length}, 1fr)`,
                gridTemplateRows: "auto 60px auto",
                gap: "0 0.5rem",
                position: "relative",
                zIndex: 2,
              }}
            >
              {roadmap.map((item, idx) => {
                const isTopRow = idx % 2 === 0;
                const isActive = activeIndex === idx;
                const gridColumn = idx + 1;
                const gridRow = isTopRow ? 1 : 3;

                // Determine popup position based on item position
                const isLeftSide = idx < 3;
                const popupStyle = isLeftSide
                  ? {
                      left: "100%",
                      ...(isTopRow
                        ? { top: "50%", transform: `translateY(10px) translateX(40px) scale(${isActive ? 1 : 0.95})` }
                        : { bottom: "50%", transform: `translateY(-10px) translateX(40px) scale(${isActive ? 1 : 0.95})` }),
                    }
                  : {
                      left: "0",
                      ...(isTopRow
                        ? { top: "50%", transform: `translateY(10px) translateX(-620px) scale(${isActive ? 1 : 0.95})` }
                        : { bottom: "50%", transform: `translateY(-10px) translateX(-620px) scale(${isActive ? 1 : 0.95})` }),
                    };

                return (
                  <div
                    key={item.label}
                    className="text-center"
                    style={{
                      gridColumn,
                      gridRow,
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <div
                      style={{
                        width: "85px",
                        height: "85px",
                        borderRadius: "50%",
                        backgroundColor: "#fff",
                        margin: "0 auto 0.4rem",
                        boxShadow: isActive
                          ? "0 8px 25px rgba(242, 101, 32, 0.4)"
                          : "0 4px 15px rgba(0, 40, 85, 0.3)",
                        border: isActive ? "3px solid var(--kiet-secondary)" : "none",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        transform: isActive ? "scale(1.15)" : "scale(1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "18px",
                      }}
                    >
                      {TechIcons[item.icon]}
                    </div>
                    <div
                      className="fs-5"
                      style={{
                        fontWeight: 800,
                        color: isActive ? "var(--kiet-secondary)" : "var(--kiet-primary)",
                        textTransform: "uppercase",
                        margin: 0,
                        lineHeight: 1.2,
                        transition: "color 0.3s ease",
                      }}
                    >
                      {item.label}
                    </div>
                    {/* Hover popup */}
                    <div
                      style={{
                        position: "absolute",
                        ...popupStyle,
                        opacity: isActive ? 1 : 0,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        pointerEvents: isActive ? "auto" : "none",
                        zIndex: 200,
                        width: "600px",
                        backgroundColor: "#fff",
                        borderRadius: "12px",
                        boxShadow: "0 25px 80px rgba(0, 0, 0, 0.35)",
                        border: "4px solid var(--kiet-secondary)",
                        padding: "16px",
                      }}
                    >
                      <button
                        style={{
                          position: "absolute",
                          top: "-14px",
                          right: "-14px",
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: "var(--kiet-secondary)",
                          border: "none",
                          color: "#fff",
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(null);
                        }}
                      >
                        ✕
                      </button>
                      <img
                        src={item.slideImage}
                        alt={`${item.label} Slide`}
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "6px",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {/* Connecting line in the middle row */}
              <div
                style={{
                  gridColumn: `1 / ${roadmap.length + 1}`,
                  gridRow: 2,
                  position: "relative",
                  height: "60px",
                }}
              >
                <svg
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: "100%",
                    height: "60px",
                    transform: "translateY(-50%)",
                    zIndex: 1,
                  }}
                  viewBox="0 0 1000 60"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="var(--kiet-secondary)" />
                      <stop offset="50%" stopColor="var(--kiet-primary)" />
                      <stop offset="100%" stopColor="var(--kiet-secondary)" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 30 Q 83 10, 166 30 Q 250 50, 333 30 Q 416 10, 500 30 Q 583 50, 666 30 Q 750 10, 833 30 Q 916 50, 1000 30"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeDasharray="8 6"
                    opacity="0.7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: Vertical timeline layout with curved connecting line */}
        <div className="d-lg-none">
          <div
            style={{
              position: "relative",
              paddingLeft: "90px",
              minHeight: `${roadmap.length * 100}px`,
            }}
          >
            {/* Vertical curved connecting line */}
            <svg
              style={{
                position: "absolute",
                left: "5px",
                top: "0px",
                width: "60px",
                height: `${roadmap.length * 100}px`,
                zIndex: 1,
                pointerEvents: "none",
              }}
              viewBox={`0 0 60 ${roadmap.length * 100}`}
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="mobileLineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--kiet-secondary)" />
                  <stop offset="50%" stopColor="var(--kiet-primary)" />
                  <stop offset="100%" stopColor="var(--kiet-secondary)" />
                </linearGradient>
              </defs>
              <path
                d="M 30 50 Q 45 100, 30 150 Q 15 200, 30 250 Q 45 300, 30 350 Q 15 400, 30 450 Q 45 500, 30 550 Q 15 600, 30 650 Q 45 700, 30 750"
                fill="none"
                stroke="url(#mobileLineGradient)"
                strokeWidth="3"
                strokeDasharray="8 6"
                opacity="0.7"
              />
            </svg>

            {roadmap.map((item, idx) => {
              const isActive = activeIndex === idx;
              const topPosition = idx * 100; // 100px spacing between items

              return (
                <div
                  key={item.label}
                  style={{
                    position: "absolute",
                    top: `${topPosition}px`,
                    left: 0,
                    right: 0,
                    minHeight: "80px",
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    zIndex: 2,
                  }}
                  onClick={() => setActiveIndex(isActive ? null : idx)}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "5px",
                      top: "20px",
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#fff",
                      border: isActive ? "3px solid var(--kiet-secondary)" : "2px solid #e0e0e0",
                      boxShadow: isActive
                        ? "0 6px 18px rgba(242, 101, 32, 0.35)"
                        : "0 3px 10px rgba(0, 40, 85, 0.3)",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      transform: isActive ? "scale(1.1)" : "scale(1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "12px",
                    }}
                  >
                    {TechIcons[item.icon]}
                  </div>
                  <h5
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 800,
                      color: isActive ? "var(--kiet-secondary)" : "var(--kiet-primary)",
                      textTransform: "uppercase",
                      margin: 0,
                      marginLeft: "75px",
                      marginTop: "20px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.label}
                  </h5>
                </div>
              );
            })}
          </div>

          {/* Mobile slide panel - centered on screen */}
          {activeIndex !== null && (
            <>
              {/* Backdrop overlay */}
              <div
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  zIndex: 9998,
                }}
                onClick={() => setActiveIndex(null)}
              />

              {/* Centered modal */}
              <div
                style={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "90vw",
                  maxWidth: "500px",
                  padding: "16px",
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
                  border: "3px solid var(--kiet-secondary)",
                  zIndex: 9999,
                }}
              >
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0 fs-3" style={{ color: "var(--kiet-primary)" }}>
                    {roadmap[activeIndex].label}
                  </h4>
                  <button
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "var(--kiet-secondary)",
                      border: "none",
                      color: "#fff",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={() => setActiveIndex(null)}
                  >
                    ✕
                  </button>
                </div>
                <img
                  src={roadmap[activeIndex].slideImage}
                  alt={`${roadmap[activeIndex].label} Slide`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "8px",
                    display: "block",
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

