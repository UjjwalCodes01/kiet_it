/**
 * HighlightsSection — Six department highlight cards (desktop: image + text side-by-side;
 * mobile: image on top, text below).
 */
const HIGHLIGHTS = [
  {
    image: "/department_highlights/Emerging_it_technologies.webp",
    title: "Emerging IT Technologies",
    description:
      "Our curriculum is strategically designed to build strong foundations in computing and programming while introducing students to emerging technologies such as Quantum Computing, AWS Cloud, Artificial Intelligence, Machine Learning, Deep Learning, Cybersecurity, Data Engineering, Computer Vision, and Full-Stack Development. Delivered by a highly qualified faculty team from premier institutions and reputed universities, the program ensures a perfect blend of academic rigor and industry-aligned expertise.",
  },
  {
    image: "/department_highlights/Experiential_Learning_with_an_AI-Driven_Approach.webp",
    title: "Experiential Learning with an AI-Driven Approach",
    description:
      "A future-focused, experiential learning ecosystem integrating AI-driven assessments, cloud-based labs, and industry-oriented projects. Students gain hands-on expertise in Quantum Computing, AWS Cloud, AI, and Cybersecurity through platforms like AWS Academy, Kaggle, and HackerRank—ensuring strong practical skills, innovation, and industry readiness.",
  },
  {
    image: "/department_highlights/Industry-Centric_Tracks.webp",
    title: "Industry-Centric Tracks with Globally Recognized Certifications",
    description:
      "Our Information Technology program integrates strong computing foundations with industry-centric specialization tracks in Quantum Computing, AWS Cloud, AI & ML, and Data Engineering, aligned with globally recognized certifications. Enriched through expert-led sessions and hands-on learning, it prepares students to be certification-ready, technically proficient, and highly employable in the evolving digital and quantum-driven landscape.",
  },
  {
    image: "/department_highlights/LeetCode_Sharing.webp",
    title: "Comprehensive Placement Preparation Platform",
    description:
      "The department delivers a structured placement preparation framework combining DSA mastery, competitive coding, and continuous assessments through platforms like CodeTantra, Leetcode, HackerRank, CodeChef, and IAMNeo. With added focus on cloud and emerging technologies, students receive certification support, career profiling, technical bootcamps, and expert mentoring—ensuring holistic, industry-ready placement outcomes.",
  },
  {
    image: "/department_highlights/Future_Technology_Quantum_Computation.webp",
    title: "Future Technology — Quantum Computing",
    description:
      "The department pioneers next-generation learning by integrating Quantum Computing with core Information Technology. Through hands-on experience with IBM Qiskit, quantum algorithms, and hybrid quantum-classical systems, students explore the future of computation. This forward-looking approach empowers learners to innovate at the intersection of IT, AI, and quantum intelligence, preparing them for disruptive technological advancements.",
  },
  {
    image: "/department_highlights/Hands-on_Learning_and_Innovative_Ecosystem.webp",
    title: "Hands-on Learning and Innovative Ecosystem",
    description:
      "The department fosters an experiential and innovation-driven learning environment where students engage in real-world projects, cloud-based labs, and emerging technologies like Quantum Computing, AWS, and AI. Through hackathons, research initiatives, and industry collaborations, students develop practical skills, creativity, and problem-solving abilities—preparing them to innovate and excel in a rapidly evolving technological landscape.",
  },
];

export default function HighlightsSection() {
  return (
    <div id="infrastructure">
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          <h2
            className="fw-bold mb-4 mb-md-5 kiet-text-primary"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", borderBottom: "3px solid var(--kiet-secondary)", paddingBottom: "10px", display: "inline-block" }}
          >
            Department&apos;s Highlights
          </h2>

          <div className="row g-4">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="col-12 col-lg-6">
                {/* Desktop card: image left, text right */}
                <div
                  className="d-none d-md-flex bg-white rounded-3 overflow-hidden h-100 highlight-card"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease", cursor: "pointer", borderLeft: "4px solid transparent" }}
                >
                  <div style={{ flex: "0 0 160px", position: "relative" }}>
                    <img src={item.image} alt={item.title} className="w-100 h-100" style={{ objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
                  </div>
                  <div className="p-5 m-2 flex-grow-1">
                    <h3 className="fw-semibold mb-2 fs-2 kiet-text-primary" style={{ lineHeight: 1.4 }}>{item.title}</h3>
                    <p className="mb-0 fs-4" style={{ color: "#666", lineHeight: 1.5, textAlign: "justify" }}>{item.description}</p>
                  </div>
                </div>

                {/* Mobile card: image on top, text below */}
                <div
                  className="d-md-none bg-white rounded-3 overflow-hidden"
                  style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", border: "1px solid rgba(241, 91, 32, 0.12)" }}
                >
                  <div style={{ height: "180px", overflow: "hidden" }}>
                    <img src={item.image} alt={item.title} className="w-100 h-100" style={{ objectFit: "cover" }} />
                  </div>
                  <div className="p-3">
                    <h3 className="fw-semibold mb-2 fs-2 kiet-text-primary" style={{ lineHeight: 1.4 }}>{item.title}</h3>
                    <p className="mb-0 fs-4" style={{ color: "#666", lineHeight: 1.5, textAlign: "justify" }}>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


