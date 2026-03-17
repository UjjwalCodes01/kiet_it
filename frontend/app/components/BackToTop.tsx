"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(scrollPercent);
      setVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  const circumference = 2 * Math.PI * 46;
  const offset = circumference * (1 - progress);

  return (
    <div
      className="rn-progress-parent"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        width: "46px",
        height: "46px",
        cursor: "pointer",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        backgroundColor: "#fff",
      }}
      aria-label="Back to top"
    >
      <svg
        className="rn-back-circle svg-inner"
        width="100%"
        height="100%"
        viewBox="-1 -1 102 102"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <path
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          fill="none"
          stroke="#f26520"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.1s" }}
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        fill="#f26520"
        viewBox="0 0 16 16"
        style={{ position: "relative", zIndex: 1 }}
      >
        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
      </svg>
    </div>
  );
}
