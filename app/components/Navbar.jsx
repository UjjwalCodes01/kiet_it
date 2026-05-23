"use client";

import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenDropdown(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <header className="edu-header header-style-1 header-fullwidth">
      <div className="header-top-bar">
        <div className="container-fluid">
          <div className="header-top">
            <div className="header-top-right">
              <div className="mobile-header-bar">
                <a target="_blank" className="mobile-apply-link" href="https://admission.kiet.edu/" rel="noreferrer">
                  <span className="apply-text">Apply Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
                <div className="header-top-toggle">
                  <div className="toggle-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="7" height="7"></rect>
                      <rect x="14" y="3" width="7" height="7"></rect>
                      <rect x="14" y="14" width="7" height="7"></rect>
                      <rect x="3" y="14" width="7" height="7"></rect>
                    </svg>
                  </div>
                </div>
              </div>
              <ul className="header-info">
                <li className="desktop-apply-btn">
                  <a className="d-flex justify-content-center justify-content-lg-start" target="_blank" href="https://admission.kiet.edu/" rel="noreferrer">
                    <button className="edu-btn btn-secondary btn-small" type="button">
                      Apply Now
                      <i className="icon-4 text-white "></i>
                    </button>
                  </a>
                </li>
                <li><a href="https://kiet.edu/announcements">ANNOUNCEMENTS</a></li>
                <li><a href="https://kiet.edu/academics/student-grievance-redressal">GRIEVANCE REDRESSAL</a></li>
                <li><a href="https://kiet.edu/erp">ERP</a></li>
                <li><a href="https://www.tbi-kiet.in/">TBI</a></li>
                <li><a href="https://kiet.edu/pr-ir">PR &amp; IR</a></li>
                <li><a href="https://kiet.edu/alumni">ALUMNI</a></li>
                <li><a href="https://kiet.edu/library">LIBRARY</a></li>
                <li><a href="https://kiet.edu/careers">CAREERS</a></li>
                <li><a href="https://kiet.edu/contact-us">CONTACT US</a></li>
                <li className="social-icon d-flex align-items-center justify-content-center">
                  <a href="https://x.com/Kiet_edu" target="_blank" rel="noreferrer" aria-label="X">
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="currentColor" className="bi bi-twitter-x" viewBox="0 0 16 16">
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"></path>
                    </svg>
                  </a>
                  <a href="https://www.facebook.com/kiet.edu/" target="_blank" rel="noreferrer">
                    <i className="icon-facebook"></i>
                  </a>
                  <a href="https://www.linkedin.com/school/kiet-group-of-institutions/" target="_blank" rel="noreferrer">
                    <i className="icon-linkedin2"></i>
                  </a>
                  <a href="https://www.instagram.com/kiet_edu/" target="_blank" rel="noreferrer">
                    <i className="icon-instagram"></i>
                  </a>
                  <a href="https://www.youtube.com/@KietEduGzb/" target="_blank" rel="noreferrer">
                    <i className="icon-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id="edu-sticky-placeholder"></div>
      <div className="header-mainmenu">
        <div className="container-fluid">
          <div className="header-navbar">
            <div className="header-brand">
              <div className="logo">
                <a href="https://kiet.edu/">
                  <img
                    src="/assets/images/logo/KIET-Logo.webp"
                    alt="KIET Logo"
                    className="logo-light p-2"
                    width={210}
                    height={60}
                  />
                </a>
              </div>
            </div>
            <div className="header-mainnav">
              <nav className="mainmenu-nav">
                <ul className="mainmenu">
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">About</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/about/Overview/">Overview</a></li>
                      <li><a href="https://kiet.edu/about/vision-mission/">Vision &amp; Mission</a></li>
                      <li><a href="https://kiet.edu/about/executive-leadership/">Governance</a></li>
                      <li><a href="https://kiet.edu/about/chancellor-message/">Chancellor&apos;s Message</a></li>
                      <li><a href="https://kiet.edu/about/executive-director-message/">Executive Director&apos;s Message</a></li>
                      <li><a href="https://kiet.edu/about/awards-rankings/">Awards &amp; Rankings</a></li>
                      <li><a href="https://kiet.edu/about/recognitions-approvals/">Approvals</a></li>
                      <li><a href="https://www.youtube.com/watch?v=LEJcSr4wHBA">Campus Tour</a></li>
                      <li><a href="https://kiet.edu/about/infrastructure/">Infrastructure</a></li>
                      <li><a href="https://kiet.edu/about/academic-collaborations/">Academic Collaborations</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Approval - Rankings / Accreditations</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/ranking-accreditations/ugc/">UGC</a></li>
                      <li><a href="https://kiet.edu/ranking-accreditations/aicte/">AICTE</a></li>
                      <li><a href="https://kiet.edu/ranking-accreditations/naac/">NAAC</a></li>
                      <li><a href="https://kiet.edu/ranking-accreditations/nirf/">NIRF</a></li>
                      <li><a href="https://kiet.edu/ranking-accreditations/iso/">ISO</a></li>
                      <li><a href="https://kiet.edu/ranking-accreditations/bte/">BTE</a></li>
                      <li><a href="https://kiet.edu/ranking-accreditations/pci/">PCI</a></li>
                      <li><a href="https://kiet.edu/ranking-accreditations/nba/">NBA</a></li>
                      <li><a href="https://kiet.edu/ranking-accreditations/qs-igauge/">QS I-GAUGE</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Academics</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/academics/Overview/">About</a></li>
                      <li><a href="https://kiet.edu/academics/team-director-academics/">Team Director Academics</a></li>
                      <li><a href="https://kiet.edu/academics/institutes/">Institutes</a></li>
                      <li><a href="https://kiet.edu/academics/iqac/">IQAC</a></li>
                      <li><a href="https://kiet.edu/academics/curriculum-structure/">Curriculum Structure and Syllabus</a></li>
                      <li><a href="https://kiet.edu/academics/innovation-pedagogy/">Teaching &amp; Learning Pedagogy</a></li>
                      <li><a href="https://kiet.edu/academics/academic-calendar/">Academic Calendar</a></li>
                      <li><a href="https://kiet.edu/academics/student-grievance-redressal/">Grievance Redressal</a></li>
                      <li><a href="https://kiet.edu/academics/circulars-notices/">Circulars &amp; Notices</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Programs</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/programs/undergraduate-programs/">Undergraduate</a></li>
                      <li><a href="https://kiet.edu/programs/postgraduate-programs/">Postgraduate</a></li>
                      <li><a href="https://kiet.edu/programs/diploma-programs/">Diploma</a></li>
                      <li><a href="https://kiet.edu/doctoral-program/">Doctoral</a></li>
                      <li><a href="https://kiet.edu/post-doc-program/">Post-Doctoral</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Admission</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/admissions/admission-procedure/">Admission Procedure</a></li>
                      <li><a href="https://kiet.edu/admissions/international-admissions/">International Admissions</a></li>
                      <li><a href="https://kiet.edu/admissions/KEE/">KIET Entrance Examination</a></li>
                      <li><a href="https://kiet.edu/admissions/fee-structure/">Fee Structure</a></li>
                      <li><a href="https://kiet.edu/admissions/payment-procedure/">Payment Procedure</a></li>
                      <li><a href="https://kiet.edu/admissions/scholarship-schemes/">Scholarship Schemes</a></li>
                      <li><a href="https://kiet.edu/admissions/education-loan/">Education Loan Assistance</a></li>
                      <li><a href="https://kiet.edu/admissions/info-brochure/">Information Brochure</a></li>
                      <li><a href="https://kiet.edu/admissions/refund-policy/">Refund Policy</a></li>
                      <li><a href="https://kiet.edu/admissions/mandatory-disclosure/">Mandatory Disclosure</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Research</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/research/about/">About</a></li>
                      <li><a href="https://kiet.edu/research/publications-patents/">Publications &amp; Patents</a></li>
                      <li><a href="https://kiet.edu/research/consultancy/">Funded Projects/Consultancy</a></li>
                      <li><a href="https://kiet.edu/research/research-guidance/">Research Guidance (Ph.D.)</a></li>
                      <li><a href="https://kiet.edu/research/researchers-of-repute/">Researchers of Repute</a></li>
                      <li><a href="https://kiet.edu/research/research-policy/">Research Policy</a></li>
                      <li><a href="https://kiet.edu/research/kiet-research-magazine/">KIET Research Magazine</a></li>
                      <li><a href="https://kiet.edu/research/idea-lab/">IDEA Lab</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Placements</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/placements/Overview/">Overview</a></li>
                      <li><a href="https://kiet.edu/placements/team-crpc/">Team CRPC</a></li>
                      <li><a href="https://kiet.edu/placements/placement-recs/">Placement Records</a></li>
                      <li><a href="https://kiet.edu/placements/iipc/">Internships@IIPC</a></li>
                      <li><a href="https://kiet.edu/placements/training-div/">Training Division</a></li>
                      <li><a href="https://kiet.edu/placements/recruiters/">Recruiters@KIET</a></li>
                      <li><a href="https://kiet.edu/placements/kiet-ssb/">KIET SSB</a></li>
                      <li><a href="https://kiet.edu/placements/student-testimonials/">Student Testimonials</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Industry Readiness</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/industry-readiness/iicc/">Industry Institute Collaboration Cell (IICC)</a></li>
                      <li><a href="https://kiet.edu/industry-readiness/centre-of-excellence/">Centre of Excellence</a></li>
                      <li><a href="https://kiet.edu/industry-readiness/pop/">Professors of Practice</a></li>
                      <li><a href="https://kiet.edu/industry-readiness/adjunct-faculty/">Adjunct Faculty</a></li>
                      <li><a href="https://forms.gle/EuAbWvdwS585x2928">Apply for Professor of Practice</a></li>
                      <li><a href="https://kiet.edu/industry-readiness/technical-training/">Technical Training</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Events</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/events/kiet-in-media/">KIET in Media</a></li>
                      <li><a href="https://kiet.edu/events/upcoming-events/">Upcoming Events</a></li>
                      <li><a href="https://kiet.edu/events/kiet-news-letters/">KIET Newsletters</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Campus Life</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/campus-life/overview/">Overview</a></li>
                      <li><a href="https://kiet.edu/campus-life/gallery/">Gallery</a></li>
                      <li><a href="https://kiet.edu/campus-life/hostel/">Hostel</a></li>
                      <li><a href="https://kiet.edu/campus-life/sports/">Sports</a></li>
                      <li><a href="https://kiet.edu/campus-life/cultural-clubs/">Cultural Clubs</a></li>
                      <li><a href="https://kiet.edu/campus-life/technical-clubs/">Technical Clubs</a></li>
                      <li><a href="https://kiet.edu/campus-life/cultural-activities/">Cultural Activities</a></li>
                      <li><a href="https://kiet.edu/campus-life/common-facilities/">Common Facilities</a></li>
                      <li><a href="https://kiet.edu/campus-life/infrastructure/">Infrastructure</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Student Welfare</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/student-welfare/anti-ragging/">Anti-Ragging</a></li>
                      <li><a href="https://kiet.edu/student-welfare/proctorial-board/">Proctorial Board</a></li>
                      <li><a href="https://kiet.edu/student-welfare/student-discipline-policy/">Student Discipline Policy</a></li>
                      <li><a href="https://kiet.edu/student-welfare/student-handbook/">Student Handbook</a></li>
                      <li><a href="https://kiet.edu/student-welfare/internal-complaints-committee/">Internal Complaints Committee</a></li>
                      <li><a href="https://kiet.edu/student-welfare/career-guidance/">Career Counselling Centre</a></li>
                      <li><a href="https://kiet.edu/student-welfare/counselling-support/">Counselling Support</a></li>
                      <li><a href="https://kiet.edu/student-welfare/medical-facilities/">Medical Facilities</a></li>
                      <li><a href="https://kiet.edu/student-welfare/institutional-fitness-committee/">Institutional Fitness Committee</a></li>
                      <li><a href="https://kiet.edu/student-welfare/mental-health-policy/">Mental Health Well Being Policy</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Study in India</a>
                    <ul className="submenu">
                      <li><a href="https://www.studyinindia.gov.in/">Click here</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Doctoral</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/doctoral-program/">Click here</a></li>
                    </ul>
                  </li>
                  <li className="has-droupdown">
                    <a href="#" className="text-nowrap">Post-Doctoral</a>
                    <ul className="submenu">
                      <li><a href="https://kiet.edu/post-doc-program/">Click here</a></li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header-right">
              <ul className="header-action">
                <li className="mobile-menu-bar d-block d-xl-none">
                  <button className="hamberger-button" aria-label="Open menu" onClick={toggleMobileMenu}>
                    <i className="icon-54"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="notification-marquee-container">
        <a href="https://kiet.edu/announcements/">
          <div className="marquee-wrapper py-3">
            <div className="marquee-content">
              <span className="notification-item">
                Student/Faculty Feedback Facility in AICTE Web Portal
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* Mobile Menu Sidebar */}
      <div className={`popup-mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="inner">
          <div className="header-top">
            <div className="logo">
              <a href="https://kiet.edu/">
                <img
                  src="/assets/images/logo/KIET-Logo.webp"
                  alt="KIET Logo"
                  width={180}
                  height={50}
                />
              </a>
            </div>
            <div className="close-menu">
              <button className="close-button" onClick={closeMobileMenu} aria-label="Close menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
          <ul className="mainmenu">
            <li className={`has-droupdown ${openDropdown === 0 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(0); }}>About</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/about/Overview/">Overview</a></li>
                <li><a href="https://kiet.edu/about/vision-mission/">Vision &amp; Mission</a></li>
                <li><a href="https://kiet.edu/about/executive-leadership/">Governance</a></li>
                <li><a href="https://kiet.edu/about/chancellor-message/">Chancellor&apos;s Message</a></li>
                <li><a href="https://kiet.edu/about/executive-director-message/">Executive Director&apos;s Message</a></li>
                <li><a href="https://kiet.edu/about/awards-rankings/">Awards &amp; Rankings</a></li>
                <li><a href="https://kiet.edu/about/recognitions-approvals/">Approvals</a></li>
                <li><a href="https://www.youtube.com/watch?v=LEJcSr4wHBA">Campus Tour</a></li>
                <li><a href="https://kiet.edu/about/infrastructure/">Infrastructure</a></li>
                <li><a href="https://kiet.edu/about/academic-collaborations/">Academic Collaborations</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 1 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(1); }}>Approval - Rankings / Accreditations</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/ranking-accreditations/ugc/">UGC</a></li>
                <li><a href="https://kiet.edu/ranking-accreditations/aicte/">AICTE</a></li>
                <li><a href="https://kiet.edu/ranking-accreditations/naac/">NAAC</a></li>
                <li><a href="https://kiet.edu/ranking-accreditations/nirf/">NIRF</a></li>
                <li><a href="https://kiet.edu/ranking-accreditations/iso/">ISO</a></li>
                <li><a href="https://kiet.edu/ranking-accreditations/bte/">BTE</a></li>
                <li><a href="https://kiet.edu/ranking-accreditations/pci/">PCI</a></li>
                <li><a href="https://kiet.edu/ranking-accreditations/nba/">NBA</a></li>
                <li><a href="https://kiet.edu/ranking-accreditations/qs-igauge/">QS I-GAUGE</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 2 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(2); }}>Academics</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/academics/Overview/">About</a></li>
                <li><a href="https://kiet.edu/academics/team-director-academics/">Team Director Academics</a></li>
                <li><a href="https://kiet.edu/academics/institutes/">Institutes</a></li>
                <li><a href="https://kiet.edu/academics/iqac/">IQAC</a></li>
                <li><a href="https://kiet.edu/academics/curriculum-structure/">Curriculum Structure and Syllabus</a></li>
                <li><a href="https://kiet.edu/academics/innovation-pedagogy/">Teaching &amp; Learning Pedagogy</a></li>
                <li><a href="https://kiet.edu/academics/academic-calendar/">Academic Calendar</a></li>
                <li><a href="https://kiet.edu/academics/student-grievance-redressal/">Grievance Redressal</a></li>
                <li><a href="https://kiet.edu/academics/circulars-notices/">Circulars &amp; Notices</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 3 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(3); }}>Programs</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/programs/undergraduate-programs/">Undergraduate</a></li>
                <li><a href="https://kiet.edu/programs/postgraduate-programs/">Postgraduate</a></li>
                <li><a href="https://kiet.edu/programs/diploma-programs/">Diploma</a></li>
                <li><a href="https://kiet.edu/doctoral-program/">Doctoral</a></li>
                <li><a href="https://kiet.edu/post-doc-program/">Post-Doctoral</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 4 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(4); }}>Admission</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/admissions/admission-procedure/">Admission Procedure</a></li>
                <li><a href="https://kiet.edu/admissions/international-admissions/">International Admissions</a></li>
                <li><a href="https://kiet.edu/admissions/KEE/">KIET Entrance Examination</a></li>
                <li><a href="https://kiet.edu/admissions/fee-structure/">Fee Structure</a></li>
                <li><a href="https://kiet.edu/admissions/payment-procedure/">Payment Procedure</a></li>
                <li><a href="https://kiet.edu/admissions/scholarship-schemes/">Scholarship Schemes</a></li>
                <li><a href="https://kiet.edu/admissions/education-loan/">Education Loan Assistance</a></li>
                <li><a href="https://kiet.edu/admissions/info-brochure/">Information Brochure</a></li>
                <li><a href="https://kiet.edu/admissions/refund-policy/">Refund Policy</a></li>
                <li><a href="https://kiet.edu/admissions/mandatory-disclosure/">Mandatory Disclosure</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 5 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(5); }}>Research</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/research/about/">About</a></li>
                <li><a href="https://kiet.edu/research/publications-patents/">Publications &amp; Patents</a></li>
                <li><a href="https://kiet.edu/research/consultancy/">Funded Projects/Consultancy</a></li>
                <li><a href="https://kiet.edu/research/research-guidance/">Research Guidance (Ph.D.)</a></li>
                <li><a href="https://kiet.edu/research/researchers-of-repute/">Researchers of Repute</a></li>
                <li><a href="https://kiet.edu/research/research-policy/">Research Policy</a></li>
                <li><a href="https://kiet.edu/research/kiet-research-magazine/">KIET Research Magazine</a></li>
                <li><a href="https://kiet.edu/research/idea-lab/">IDEA Lab</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 6 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(6); }}>Placements</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/placements/Overview/">Overview</a></li>
                <li><a href="https://kiet.edu/placements/team-crpc/">Team CRPC</a></li>
                <li><a href="https://kiet.edu/placements/placement-recs/">Placement Records</a></li>
                <li><a href="https://kiet.edu/placements/iipc/">Internships@IIPC</a></li>
                <li><a href="https://kiet.edu/placements/training-div/">Training Division</a></li>
                <li><a href="https://kiet.edu/placements/recruiters/">Recruiters@KIET</a></li>
                <li><a href="https://kiet.edu/placements/kiet-ssb/">KIET SSB</a></li>
                <li><a href="https://kiet.edu/placements/student-testimonials/">Student Testimonials</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 7 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(7); }}>Industry Readiness</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/industry-readiness/iicc/">Industry Institute Collaboration Cell (IICC)</a></li>
                <li><a href="https://kiet.edu/industry-readiness/centre-of-excellence/">Centre of Excellence</a></li>
                <li><a href="https://kiet.edu/industry-readiness/pop/">Professors of Practice</a></li>
                <li><a href="https://kiet.edu/industry-readiness/adjunct-faculty/">Adjunct Faculty</a></li>
                <li><a href="https://forms.gle/EuAbWvdwS585x2928">Apply for Professor of Practice</a></li>
                <li><a href="https://kiet.edu/industry-readiness/technical-training/">Technical Training</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 8 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(8); }}>Events</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/events/kiet-in-media/">KIET in Media</a></li>
                <li><a href="https://kiet.edu/events/upcoming-events/">Upcoming Events</a></li>
                <li><a href="https://kiet.edu/events/kiet-news-letters/">KIET Newsletters</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 9 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(9); }}>Campus Life</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/campus-life/overview/">Overview</a></li>
                <li><a href="https://kiet.edu/campus-life/gallery/">Gallery</a></li>
                <li><a href="https://kiet.edu/campus-life/hostel/">Hostel</a></li>
                <li><a href="https://kiet.edu/campus-life/sports/">Sports</a></li>
                <li><a href="https://kiet.edu/campus-life/cultural-clubs/">Cultural Clubs</a></li>
                <li><a href="https://kiet.edu/campus-life/technical-clubs/">Technical Clubs</a></li>
                <li><a href="https://kiet.edu/campus-life/cultural-activities/">Cultural Activities</a></li>
                <li><a href="https://kiet.edu/campus-life/common-facilities/">Common Facilities</a></li>
                <li><a href="https://kiet.edu/campus-life/infrastructure/">Infrastructure</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 10 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(10); }}>Student Welfare</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/student-welfare/anti-ragging/">Anti-Ragging</a></li>
                <li><a href="https://kiet.edu/student-welfare/proctorial-board/">Proctorial Board</a></li>
                <li><a href="https://kiet.edu/student-welfare/student-discipline-policy/">Student Discipline Policy</a></li>
                <li><a href="https://kiet.edu/student-welfare/student-handbook/">Student Handbook</a></li>
                <li><a href="https://kiet.edu/student-welfare/internal-complaints-committee/">Internal Complaints Committee</a></li>
                <li><a href="https://kiet.edu/student-welfare/career-guidance/">Career Counselling Centre</a></li>
                <li><a href="https://kiet.edu/student-welfare/counselling-support/">Counselling Support</a></li>
                <li><a href="https://kiet.edu/student-welfare/medical-facilities/">Medical Facilities</a></li>
                <li><a href="https://kiet.edu/student-welfare/institutional-fitness-committee/">Institutional Fitness Committee</a></li>
                <li><a href="https://kiet.edu/student-welfare/mental-health-policy/">Mental Health Well Being Policy</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 11 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(11); }}>Study in India</a>
              <ul className="submenu">
                <li><a href="https://www.studyinindia.gov.in/">Click here</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 12 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(12); }}>Doctoral</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/doctoral-program/">Click here</a></li>
              </ul>
            </li>
            <li className={`has-droupdown ${openDropdown === 13 ? 'open' : ''}`}>
              <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(13); }}>Post-Doctoral</a>
              <ul className="submenu">
                <li><a href="https://kiet.edu/post-doc-program/">Click here</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="popup-mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
    </header>
  );
}

