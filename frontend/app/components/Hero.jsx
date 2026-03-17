export default function Hero({
  title = "Our Faculty",
  subtitle = "Meet the distinguished faculty members of CSE (AI) & CSE (AI & ML)",
  backHref = "/programs/undergraduate-programs/cse-aiml",
  backLabel = "Back to Home",
}) {
  return (
    <section
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "2rem 0 2.5rem 0",
      }}
    >
      <div className="container px-3 px-md-4">
        <a
          className="text-decoration-none d-inline-flex align-items-center mb-4 fs-5"
          style={{ color: "#6b7280", fontWeight: 500 }}
          href={backHref}
        >
          <span style={{ fontSize: "1.3rem", marginRight: "0.6rem" }}>←</span>
          {backLabel}
        </a>
        <h1
          className="fw-bold mb-3"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#111827",
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </h1>
        <p
          className="mb-0 fs-4"
          style={{ color: "#6b7280", maxWidth: "700px", lineHeight: 1.6 }}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}
