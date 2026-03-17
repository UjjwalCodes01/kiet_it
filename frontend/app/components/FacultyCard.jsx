export default function FacultyCard({ member, variant = "main" }) {
  if (variant === "faculty") {
    return (
      <div
        className="card border-0 shadow-sm h-100"
        style={{ borderRadius: "12px", overflow: "hidden", cursor: "pointer" }}
      >
        <div
          className="d-flex align-items-center justify-content-center mx-auto"
          style={{
            position: "relative",
            width: "70%",
            aspectRatio: "3/4",
            overflow: "hidden",
          }}
        >
          <img
            alt={member.name}
            src={member.image}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              objectFit: "contain",
              objectPosition: "center",
            }}
          />
        </div>
        <div className="card-body text-center px-2 px-md-3 py-3">
          <h2
            className="fw-bold mb-2 fs-3"
            style={{
              fontSize: "clamp(0.85rem, 1.3vw, 1.2rem)",
              color: "#00304c",
              lineHeight: 1.3,
            }}
          >
            {member.name}
          </h2>
          <p className="mb-2 fs-5 text-center" style={{ color: "#666", fontWeight: 500 }}>
            {member.role}
          </p>
          {member.qualification ? (
            <p className="small text-muted mb-0 text-center fs-5">{member.qualification}</p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "12px" }}>
      <div style={{ position: "relative", width: "100%", height: "180px", overflow: "hidden" }}>
        <img
          src={member.image}
          alt={member.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
        />
      </div>
      <div className="card-body p-2 text-center">
        <h3 className="fs-6 fw-bold mb-1" style={{ color: "#00304c" }}>{member.name}</h3>
        <p className="small text-muted mb-0">{member.role}</p>
      </div>
    </div>
  );
}
