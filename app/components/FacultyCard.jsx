export default function FacultyCard({ member, variant = "main" }) {
  if (variant === "faculty") {
    return (
      <div className="card border-0 shadow-sm h-100 kiet-faculty-card-border overflow-hidden kiet-faculty-card-hover">
        <div className="overflow-hidden kiet-faculty-card-img-wrap kiet-faculty-img-bg">
          <img alt={member.name} src={member.image} />
        </div>
        <div className="card-body text-center px-2 px-md-3 py-3">
          <h2 className="fw-bold mb-2 fs-3 kiet-text-primary kiet-faculty-name-clamp">
            {member.name}
          </h2>
          <p className="mb-2 fs-5 text-center kiet-faculty-role fw-medium">
            {member.role}
          </p>
          {member.qualification ? (
            <p className="small text-muted mb-0 text-center fs-6 kiet-line-height-14">
              {member.qualification}
              {member.university && (
                <>
                  <br />
                  <span className="kiet-faculty-uni">{member.university}</span>
                </>
              )}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm h-100 kiet-faculty-card-border">
      <div className="kiet-faculty-mini-img-wrap">
        <img src={member.image} alt={member.name} />
      </div>
      <div className="card-body p-2 text-center">
        <h3 className="fs-6 fw-bold mb-1 kiet-text-primary">{member.name}</h3>
        <p className="small text-muted mb-0">{member.role}</p>
      </div>
    </div>
  );
}
