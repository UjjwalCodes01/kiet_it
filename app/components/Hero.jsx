export default function Hero({
  title = "Our Faculty",
  subtitle = "Meet the distinguished faculty members of Information Technology",
  backHref = "/",
  backLabel = "Back to Home",
}) {
  return (
    <section className="kiet-hero-section">
      <div className="container px-3 px-md-4">
        <a
          className="text-decoration-none d-inline-flex align-items-center mb-4 fs-5 kiet-hero-back"
          href={backHref}
        >
          <span className="kiet-hero-back-arrow">←</span>
          {backLabel}
        </a>
        <h1 className="fw-bold mb-3 kiet-hero-title">
          {title}
        </h1>
        <p className="mb-0 fs-4 kiet-hero-subtitle">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
