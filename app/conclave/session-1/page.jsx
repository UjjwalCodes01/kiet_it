import Link from "next/link";

export const metadata = {
  title: "Digital Conclave 2025 - Session 1 | Industry Academia Connect",
  description: "Digital Conclave 2025 Expert Talk Series Session 1 - Department of Information Technology, KIET Group of Institutions",
};

export default function ConclaveSession1Page() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f8fafc 0%, #fff 50%, #fff8f5 100%)" }}>
      {/* Hero Section */}
      <section style={{ background: "linear-gradient(135deg, #002855 0%, #003d7a 100%)", padding: "4rem 0", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "linear-gradient(135deg, transparent 0%, rgba(242, 101, 32, 0.1) 100%)", clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)" }} />
        <div className="container position-relative">
          <div className="mb-3">
            <Link href="/" className="btn btn-outline-light btn-sm px-3 py-1" style={{ fontSize: "0.85rem" }}>
              ← Back to Home
            </Link>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-7">
              <div className="d-inline-block mb-3 px-3 py-1 rounded-pill" style={{ backgroundColor: "rgba(242, 101, 32, 0.15)", border: "1px solid rgba(242, 101, 32, 0.3)" }}>
                <span className="fw-semibold" style={{ color: "#ff8a50" }}>Industry Academia Connect</span>
              </div>
              <h1 className="fw-bold mb-4" style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1.2 }}>
                Digital Conclave 2025
                <span style={{ color: "#f26520", display: "block" }}>Expert Talk Series - Session 1</span>
              </h1>
              <p className="mb-4" style={{ color: "rgba(255,255,255,0.8)", fontSize: "1.25rem", lineHeight: 1.7 }}>
                The Department of Information Technology, KIET Group of Institutions, demonstrated its vision and leadership by successfully hosting Digital Conclave 2025.
              </p>
              <a
                href="https://youtu.be/-Agff_KdsHg?si=A4XU7HZ-UkZd90gv"
                target="_blank"
                rel="noopener noreferrer"
                className="btn px-5 py-3 text-white fw-semibold"
                style={{ backgroundColor: "#f26520", borderRadius: "8px", border: "none", boxShadow: "0 4px 16px rgba(242, 101, 32, 0.4)", fontSize: "1.1rem" }}
              >
                Watch Video
              </a>
            </div>
            <div className="col-lg-5 mt-4 mt-lg-0">
              <img src="/conclave/session1.webp" alt="Digital Conclave 2025 - Session 1" className="img-fluid rounded-4" style={{ boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              {/* Introduction */}
              <div className="mb-5">
                <h2 className="fw-bold mb-4" style={{ color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                  1. Introduction
                </h2>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  The Department of Information Technology, KIET Group of Institutions, once again demonstrated its vision and leadership by successfully hosting Digital Conclave 2025 – Expert Talk Series (Session 1).
                </p>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  The conclave was designed under the theme <strong>&ldquo;Beyond Earth, Beyond Limits: Shaping Tomorrow&apos;s Technology&rdquo;</strong> to inspire students to think beyond boundaries and embrace innovation that connects space, technology, and human imagination.
                </p>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  This event not only celebrated the spirit of technological transformation but also reflected the Department of IT&apos;s commitment to nurturing talent, bridging industry with academia, and promoting global exposure for students.
                </p>
              </div>

              {/* Event Proceedings */}
              <div className="mb-5">
                <h2 className="fw-bold mb-4" style={{ color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                  2. Event Proceedings
                </h2>

                <h4 className="fw-bold mb-3" style={{ color: "#f26520" }}>Ceremonial Opening</h4>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  The program began with a warm welcome followed by the lighting of the ceremonial lamp by esteemed dignitaries:
                </p>
                <ul style={{ fontSize: "1.1rem", lineHeight: 2, color: "#444" }}>
                  <li><strong>Dr. Lovneesh Chanana</strong>, Sr. VP & Regional Head – Government Affairs (Asia Pacific), SAP</li>
                  <li><strong>Dr. Prabhat Manocha</strong>, Account Technical Leader, IBM India/South Asia & Professor of Practice, Dept. of IT, KIET</li>
                  <li><strong>Dr. Jaijit Bhattacharya</strong>, Founder & President, Centre for Domestic Economy Policy Research</li>
                  <li><strong>Ms. Ashima Mathur</strong>, Director – Marketing, APAC, Pitney Bowes</li>
                  <li><strong>Dr. Manoj Goel</strong>, Executive Director, KIET</li>
                  <li><strong>Dr. Aadesh Pandey</strong>, Director Academics, KIET</li>
                  <li><strong>Dr. Puneet Goswami</strong>, Dean IT, KIET</li>
                </ul>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  The ceremonial lamp symbolized the light of knowledge and innovation guiding the conclave forward.
                </p>

                <h4 className="fw-bold mb-3 mt-4" style={{ color: "#f26520" }}>Institutional Presentation & Teaser</h4>
                <ul style={{ fontSize: "1.1rem", lineHeight: 2, color: "#444" }}>
                  <li>A short film highlighted KIET&apos;s journey, achievements, and contribution to education and technology.</li>
                  <li>The event teaser, themed &ldquo;Beyond Earth, Beyond Limits&rdquo;, provided glimpses of the conclave&apos;s futuristic vision.</li>
                </ul>

                <h4 className="fw-bold mb-3 mt-4" style={{ color: "#f26520" }}>Felicitation of Speakers</h4>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  Each distinguished speaker was honored with a memento, shield, and stole by KIET leadership, symbolizing respect and gratitude.
                </p>
              </div>

              {/* Key Addresses */}
              <div className="mb-5">
                <h2 className="fw-bold mb-4" style={{ color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                  3. Key Addresses
                </h2>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  The formal session included thought-provoking addresses from KIET leadership:
                </p>
                <ul style={{ fontSize: "1.1rem", lineHeight: 2, color: "#444" }}>
                  <li><strong>Dr. Puneet Goswami, Dean IT</strong> – extended a heartfelt welcome, highlighting the Department of IT&apos;s initiative in curating this expert talk series for the growth of students.</li>
                  <li><strong>Dr. Aadesh Pandey, Director Academics</strong> – emphasized the academic importance of such conclaves in aligning student learning with emerging technological demands.</li>
                  <li><strong>Dr. Manoj Goel, Executive Director</strong> – delivered an inspiring address, urging students to innovate fearlessly and contribute to the nation&apos;s technological advancement.</li>
                </ul>
              </div>

              {/* Distinguished Speakers */}
              <div className="mb-5">
                <h2 className="fw-bold mb-4" style={{ color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                  4. Distinguished Speakers & Sessions
                </h2>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  The core of the conclave revolved around expert talks by eminent leaders, who brought diverse perspectives to the theme:
                </p>

                {[
                  {
                    name: "Dr. Lovneesh Chanana",
                    role: "Sr. Vice President & Asia Pacific Head for Government Affairs, SAP",
                    topic: "AI × Innovation: A Two-Way Street",
                    description: "Dr. Chanana shared his experience in driving digital governance and public policy, highlighting the symbiotic relationship between AI and innovation in shaping sustainable economic growth.",
                    youtubeLink: "https://youtu.be/a45AkG_C2Vk"
                  },
                  {
                    name: "Dr. Jaijit Bhattacharya",
                    role: "Founder & President, Centre for Domestic Economy Policy Research",
                    topic: "Monetizing Space",
                    description: "As a thought leader in technology-led governance, Dr. Bhattacharya discussed how space technologies can drive economic and strategic advantage, encouraging students to view space as a domain of limitless opportunities.",
                    youtubeLink: "https://youtu.be/7EGeW-m-JYc"
                  },
                  {
                    name: "Ms. Ashima Mathur",
                    role: "Director – Marketing, APAC, Pitney Bowes",
                    topic: "Building Personal Brands in the Digital World",
                    description: "A seasoned marketer, Ms. Mathur emphasized the importance of personal branding in a hyper-connected world, equipping students with practical strategies to position themselves effectively in the digital ecosystem.",
                    youtubeLink: "https://youtu.be/NfznO9FfCR0"
                  },
                  {
                    name: "Dr. Prabhat Manocha",
                    role: "Account Technical Leader, IBM India/South Asia & Professor of Practice, Dept. of IT, KIET",
                    topic: "Unearthing the Technology for Future Needs",
                    description: "A distinguished strategist with 30+ years of experience, Dr. Manocha explored AI, hybrid cloud, and future technologies, urging students to innovate responsibly and be future-ready.",
                    youtubeLink: "https://youtu.be/cWKS3fU4Whc"
                  }
                ].map((speaker) => (
                  <div key={speaker.name} className="mb-4 p-4 rounded-4" style={{ background: "#f8fafc", border: "1px solid #e9ecef" }}>
                    <h4 className="fw-bold mb-1" style={{ color: "#002855" }}>{speaker.name}</h4>
                    <p className="mb-2 text-muted" style={{ fontSize: "0.95rem" }}>{speaker.role}</p>
                    <p className="mb-2"><strong style={{ color: "#f26520" }}>Topic:</strong> {speaker.topic}</p>
                    <p className="mb-3" style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "#444" }}>{speaker.description}</p>
                    <a
                      href={speaker.youtubeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm px-4 py-2 text-white fw-semibold"
                      style={{ backgroundColor: "#f26520", borderRadius: "6px", border: "none", boxShadow: "0 2px 8px rgba(242, 101, 32, 0.3)", fontSize: "0.9rem" }}
                    >
                      Watch Session →
                    </a>
                  </div>
                ))}
              </div>

              {/* Student Engagement */}
              <div className="mb-5">
                <h2 className="fw-bold mb-4" style={{ color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                  5. Student Engagement
                </h2>
                <ul style={{ fontSize: "1.1rem", lineHeight: 2, color: "#444" }}>
                  <li>Student representatives played an active role in the discussions and interactive sessions.</li>
                  <li>The conclave witnessed enthusiastic student participation, particularly in interactive Q&A segments with speakers.</li>
                  <li>The recognition of alumni achievements inspired students to push their boundaries and envision their role in future technology landscapes.</li>
                </ul>
              </div>

              {/* Conclusion */}
              <div className="mb-5">
                <h2 className="fw-bold mb-4" style={{ color: "#002855", borderBottom: "3px solid #f26520", paddingBottom: "10px", display: "inline-block" }}>
                  6. Conclusion
                </h2>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  The Digital Conclave 2025 – Expert Talk Series (Session 1), hosted by the Department of Information Technology, was a resounding success. It created a platform where academia, industry, and students converged to exchange ideas and inspire innovation.
                </p>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify" }}>
                  The conclave highlighted:
                </p>
                <ul style={{ fontSize: "1.1rem", lineHeight: 2, color: "#444" }}>
                  <li>The Department of IT&apos;s role in spearheading futuristic learning opportunities.</li>
                  <li>The multi-dimensional knowledge shared by global experts on AI, space, branding, and future technologies.</li>
                  <li>The active role of students as participants, presenters, and future innovators.</li>
                </ul>
                <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "#444", textAlign: "justify", fontWeight: 500 }}>
                  The event truly embodied its theme — <span style={{ color: "#f26520" }}>Beyond Earth, Beyond Limits</span> — leaving the audience motivated to embrace innovation without boundaries and to shape tomorrow&apos;s technology with creativity, courage, and vision.
                </p>
              </div>

              {/* CTA */}
              <div className="text-center p-5 rounded-4" style={{ background: "linear-gradient(135deg, #002855 0%, #003d7a 100%)" }}>
                <h3 className="fw-bold mb-3 text-white">Watch the Full Session</h3>
                <p className="text-white-50 mb-4">Experience the insights and discussions from Digital Conclave 2025</p>
                <a
                  href="https://youtu.be/-Agff_KdsHg?si=A4XU7HZ-UkZd90gv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn px-5 py-3 text-white fw-semibold"
                  style={{ backgroundColor: "#f26520", borderRadius: "8px", border: "none", boxShadow: "0 4px 16px rgba(242, 101, 32, 0.4)", fontSize: "1.1rem" }}
                >
                  Watch Video
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#001a3a", padding: "2rem 0" }}>
        <div className="container text-center">
          <p className="mb-0 text-white-50">
            &copy; 2025 Department of Information Technology, KIET Group of Institutions
          </p>
        </div>
      </footer>
    </div>
  );
}


