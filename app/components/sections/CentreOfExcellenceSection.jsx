/**
 * CentreOfExcellenceSection — Quantum Computing Lab and Tech Mahindra COE cards.
 */
export default function CentreOfExcellenceSection() {
  return (
    <div id="coe">
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          <h2
            className="fw-bold mb-4 kiet-text-primary"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", borderBottom: "3px solid var(--kiet-secondary)", paddingBottom: "10px", display: "inline-block" }}
          >
            Centre of Excellence
          </h2>

          {/* Quantum Computing Lab */}
          <div
            className="rounded-4 overflow-hidden mb-4"
            style={{ background: "linear-gradient(135deg, #f0f4f8 0%, #fff 50%, #fff8f5 100%)", border: "2px solid rgba(0,40,85,0.12)" }}
          >
            <div style={{ height: "5px", background: "linear-gradient(90deg, var(--kiet-primary), var(--kiet-secondary))" }} />
            <div className="p-4 p-md-5">
              <div className="row align-items-center">
                <div className="col-12 col-lg-8">
                  <div
                    className="d-inline-block mb-3 px-3 py-1 rounded-pill"
                    style={{ backgroundColor: "rgba(241, 91, 32, 0.08)", border: "1px solid rgba(241, 91, 32, 0.15)" }}
                  >
                    <span className="fw-semibold fs-5 kiet-text-secondary">Next-Gen Computing</span>
                  </div>
                  <h3 className="fw-bold mb-3 kiet-text-primary" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.3 }}>
                    Quantum Computing <span className="kiet-text-secondary">Laboratory</span>
                  </h3>
                  <p className="fs-3 mb-0" style={{ lineHeight: 1.8, color: "#444", textAlign: "justify", maxWidth: "900px" }}>
                    The Quantum Computing Laboratory at KIET&apos;s IT Department is a pioneering facility dedicated to
                    exploring the frontiers of quantum technology. Equipped with access to IBM Qiskit and quantum
                    simulation platforms, students gain hands-on experience with quantum algorithms, qubit manipulation,
                    and hybrid quantum-classical computing. This state-of-the-art lab prepares students to lead
                    innovations at the intersection of quantum mechanics and information technology, positioning them
                    at the forefront of the next computing revolution.
                  </p>
                </div>
                <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                  <img
                    src="/coi/quantum_computing.webp"
                    alt="Quantum Computing Lab"
                    className="img-fluid rounded-3"
                    style={{ width: "100%", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tech Mahindra Centre of Excellence */}
          <div
            className="rounded-4 overflow-hidden"
            style={{ background: "linear-gradient(135deg, #fff8f5 0%, #fff 50%, #f0f4f8 100%)", border: "2px solid rgba(241, 91, 32, 0.12)" }}
          >
            <div style={{ height: "5px", background: "linear-gradient(90deg, var(--kiet-secondary), var(--kiet-primary))" }} />
            <div className="p-4 p-md-5">
              <div className="row align-items-center">
                <div className="col-12 col-lg-8">
                  <div
                    className="d-inline-block mb-3 px-3 py-1 rounded-pill"
                    style={{ backgroundColor: "rgba(8, 82, 144, 0.08)", border: "1px solid rgba(8, 82, 144, 0.15)" }}
                  >
                    <span className="fw-semibold fs-5 kiet-text-primary">Industry &ndash; Academia Initiative</span>
                  </div>
                  <h3 className="fw-bold mb-3 kiet-text-primary" style={{ fontSize: "clamp(1.5rem, 3vw, 2.2rem)", lineHeight: 1.3 }}>
                    Tech Mahindra <span className="kiet-text-secondary">Centre of Excellence</span>
                  </h3>
                  <p className="fs-3 mb-0" style={{ lineHeight: 1.8, color: "#444", textAlign: "justify", maxWidth: "900px" }}>
                    The Tech Mahindra Centre of Excellence at KIET, established within the Department of Information
                    Technology, is an industry&ndash;academia initiative focused on employability enhancement. It
                    provides training to students selected by Tech Mahindra, ensuring their skills align with current
                    industry demands.
                  </p>
                </div>
                <div className="col-12 col-lg-4 mt-4 mt-lg-0">
                  <img
                    src="/coi/tech_mahindra.webp"
                    alt="Tech Mahindra Centre of Excellence"
                    className="img-fluid rounded-3"
                    style={{ width: "100%", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


