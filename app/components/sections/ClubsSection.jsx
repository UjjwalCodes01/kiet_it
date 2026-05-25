/**
 * ClubsSection — Innogeeks and GEEK Room club cards with overlapping hover effect on desktop.
 */
const CLUBS = [
  {
    name: "Innogeeks",
    image: "/it_club/innogeeks.webp",
    website: "https://www.innogeeks.in/",
    description:
      "At Innogeeks, we embody our motto, 'We Learn, We Teach, We Conquer,' as a guiding principle in fostering a vibrant community of innovators, developers, and tech enthusiasts. Over the years, Innogeeks has grown into a cornerstone of technical excellence at KIET, fostering a culture of collaboration, learning, and impactful innovation.",
    accentColor: "var(--kiet-primary)",
  },
  {
    name: "GEEK Room",
    image: "/it_club/geekroom.webp",
    website: "https://geekroom-kiet-six.vercel.app/",
    description:
      "GEEK Room is a dynamic tech community dedicated to fostering innovation, collaboration, and continuous learning. The chapter actively hosts hackathons, technical events, workshops, and engaging meetups that bring together passionate students from diverse domains.",
    accentColor: "var(--kiet-primary)",
  },
];

export default function ClubsSection() {
  return (
    <div id="clubs">
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          <div className="row mb-4">
            <div className="col-12 text-start">
              <h2 className="fw-bold mb-4 kiet-text-primary kiet-section-heading">
                Our Clubs
              </h2>
            </div>
          </div>

          <div className="clubs-stack">
            {CLUBS.map((club) => (
              <div key={club.name} className="club-card-outer">
                <div className="club-card-inner bg-white h-100 border-0 kiet-clubs-card">
                  <div style={{ height: "6px", background: `linear-gradient(90deg, var(--kiet-secondary) 0%, ${club.accentColor} 100%)` }} />

                  <div className="p-4 p-md-5 d-flex flex-column flex-md-row h-100">
                    {/* Club logo */}
                    <div className="flex-shrink-0 mb-3 mb-md-0 me-md-4 align-self-center">
                      <div className="kiet-clubs-logo-wrapper">
                        <img alt={club.name} src={club.image} />
                      </div>
                    </div>

                    {/* Club info */}
                    <div className="flex-grow-1 text-center text-md-start d-flex flex-column justify-content-center">
                      <h3 className="fw-bold mb-2 fs-1" style={{ color: club.accentColor }}>{club.name}</h3>
                      <p className="text-muted fs-3 mb-4 kiet-clubs-desc">{club.description}</p>
                      <div>
                        <a
                          href={club.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn px-5 py-2 fw-semibold fs-3 text-white kiet-bg-secondary kiet-clubs-btn"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
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
