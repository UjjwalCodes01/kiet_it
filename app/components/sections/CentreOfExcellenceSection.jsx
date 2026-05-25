/**
 * CentreOfExcellenceSection — Quantum Computing Lab and Tech Mahindra COE cards.
 */
export default function CentreOfExcellenceSection() {
  return (
    <div id="coe">
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          <h2 className="fw-bold mb-4 kiet-text-primary kiet-section-heading">
            Centre of Excellence
          </h2>

          {/* Quantum Computing Lab */}
          <div className="rounded-4 overflow-hidden mb-4 kiet-coe-card-primary">
            <div className="kiet-coe-topbar-ps" />
            <div className="p-4 p-md-5">
              <div className="row align-items-center">
                <div className="col-12 col-lg-8">
                  <div className="d-inline-block mb-3 px-3 py-1 rounded-pill kiet-coe-badge-secondary">
                    <span className="fw-semibold fs-5 kiet-text-secondary">Next-Gen Computing</span>
                  </div>
                  <h3 className="fw-bold mb-3 kiet-text-primary kiet-sub-heading">
                    Quantum Computing <span className="kiet-text-secondary">Laboratory</span>
                  </h3>
                  <p className="fs-3 mb-0 kiet-coe-text">
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
                    className="img-fluid rounded-3 kiet-coe-img"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Tech Mahindra Centre of Excellence */}
          <div className="rounded-4 overflow-hidden kiet-coe-card-secondary">
            <div className="kiet-coe-topbar-sp" />
            <div className="p-4 p-md-5">
              <div className="row align-items-center">
                <div className="col-12 col-lg-8">
                  <div className="d-inline-block mb-3 px-3 py-1 rounded-pill kiet-coe-badge-primary">
                    <span className="fw-semibold fs-5 kiet-text-primary">Industry &ndash; Academia Initiative</span>
                  </div>
                  <h3 className="fw-bold mb-3 kiet-text-primary kiet-sub-heading">
                    Tech Mahindra <span className="kiet-text-secondary">Centre of Excellence</span>
                  </h3>
                  <p className="fs-3 mb-0 kiet-coe-text">
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
                    className="img-fluid rounded-3 kiet-coe-img"
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
