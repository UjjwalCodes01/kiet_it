const roadmap = [
  {
    label: "Applied Science",
    image: "/cse-ai-assets/Roadmap/Applied Science.png",
    slideImage: "/cse-ai-assets/Subject Slide/Applied Science.png",
  },
  {
    label: "Aptitude & REASONING",
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
    label: "Web DEVELOPMENT",
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
    label: "Cloud and Network Security",
    image: "/cse-ai-assets/Roadmap/Cloud and Network Security.png",
    slideImage: "/cse-ai-assets/Subject Slide/Cloud and Network Security.png",
  },
  {
    label: "Industry Integrated Certification",
    image: "/cse-ai-assets/Roadmap/Industry-Integrated.png",
    slideImage: "/cse-ai-assets/Subject Slide/Industry Alligned.png",
  },
];

export default function Roadmap() {
  return (
    <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5" id="roadmap" style={{ padding: "4rem 0", position: "relative", zIndex: 1 }}>
      <div className="p-3 p-md-4 p-lg-5">
        <div className="mb-5">
          <h2 className="fw-bold mb-3 fs-1" style={{ color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
            Learning Roadmap
          </h2>
          <div>
            <span className="d-lg-none kiet-text-secondary fst-italic" style={{ fontWeight: 500, fontSize: "1.5rem" }}>
              Tap logo to read more
            </span>
            <span className="d-none d-lg-inline fs-3 fst-italic kiet-text-secondary" style={{ fontWeight: 500 }}>
              Hover and view details
            </span>
          </div>
        </div>

        <div className="d-none d-lg-block">
          <div style={{ position: "relative", padding: "1rem 0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gridTemplateRows: "auto 1px auto", gap: "0 0.5rem", position: "relative", zIndex: 2 }}>
              {roadmap.map((item, idx) => {
                const isTop = idx % 2 === 0;
                return (
                  <div
                    key={item.label}
                    className="text-center roadmap-node"
                    style={{
                      gridColumn: String(idx + 1),
                      gridRow: isTop ? "1" : "3",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ width: "85px", height: "85px", borderRadius: "50%", backgroundColor: "#fff", margin: "0 auto 0.4rem", boxShadow: "0 4px 15px rgba(0, 40, 85, 0.3)", border: "none", overflow: "hidden", transition: "all 0.3s ease", transform: "scale(1)" }}>
                      <img src={item.image} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                    </div>
                    <div className="fs-5" style={{ fontWeight: 800, color: "#002855", textTransform: "uppercase", margin: 0, lineHeight: 1.2 }}>
                      {item.label}
                    </div>

                    <div className="roadmap-popup">
                      <button
                        style={{
                          position: "absolute",
                          top: "-14px",
                          right: "-14px",
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
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        ✕
                      </button>
                      <img src={item.slideImage} alt={`${item.label} Slide`} style={{ width: "100%", height: "auto", borderRadius: "6px", display: "block" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="d-lg-none">
          <div style={{ position: "relative", paddingLeft: "50px", minHeight: "700px" }}>
            {roadmap.map((item) => (
              <div key={item.label} style={{ position: "relative", marginBottom: "1.5rem", paddingLeft: "1.5rem", minHeight: "70px", display: "flex", alignItems: "center", cursor: "pointer", zIndex: 2 }}>
                <div style={{ position: "absolute", left: "-27px", top: "10px", width: "60px", height: "60px", borderRadius: "50%", backgroundColor: "#fff", border: "none", boxShadow: "0 3px 10px rgba(0, 40, 85, 0.3)", overflow: "hidden", transition: "all 0.3s ease", transform: "scale(1)" }}>
                  <img src={item.image} alt={item.label} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                </div>
                <h5 style={{ fontSize: "0.95rem", fontWeight: 800, color: "#002855", textTransform: "uppercase", margin: 0, marginLeft: "2.5rem", marginTop: "40px" }}>
                  {item.label}
                </h5>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .roadmap-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 999;
            width: 650px;
            max-width: min(90vw, 900px);
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 25px 80px rgba(0, 0, 0, 0.35);
            border: 4px solid #f26520;
            padding: 16px;
            transform: translate(-50%, -50%) scale(0.95);
          }

          .roadmap-node:hover .roadmap-popup,
          .roadmap-node:focus-within .roadmap-popup {
            opacity: 1;
            pointer-events: auto;
          }

          .roadmap-node:hover .roadmap-popup,
          .roadmap-node:focus-within .roadmap-popup {
            transform: translate(-50%, -50%) scale(1);
          }
        `}</style>
      </div>
    </section>
  );
}
