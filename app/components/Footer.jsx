export default function Footer() {
  return (
    <footer className="edu-footer footer-dark bg-image footer-style-3">
      <div className="footer-top">
        <div className="kiet-container">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="edu-footer-widget">
                <div className="logo">
                  <a href="https://kiet.edu/">
                    <img src="/assets/images/logo/dark_logo.webp" alt="KIET-Logo" width={260} height={80} className="logo-light" />
                  </a>
                </div>
                <div className="widget-information mt-4">
                  <div>
                    <p className="mb-2" style={{ textAlign: "left" }}>
                      <span className="me-1">Address :</span> KIET, Delhi-NCR, Ghaziabad-Meerut Road, Ghaziabad (201206)
                    </p>
                    <p className="mb-2">
                      <span className="me-1">Helpline Number:</span>
                      <a href="tel:+91-7949335337">+91-7949335337</a>
                    </p>
                    <p className="mb-2">
                      <span className="me-1">For admission, call us at:</span>
                      <a href="tel:+91-8445557599">+91-8445557599</a>
                    </p>
                    <div className="d-flex gap-2">
                      <p className="m-0 me-1">Email:</p>
                      <div className="d-flex flex-column">
                        <a href="mailto:director@kiet.edu">director@kiet.edu<br /></a>
                        <a href="mailto:executivedirector@kiet.edu ">executivedirector@kiet.edu <br /></a>
                        <a href="mailto:registrar@kiet.edu">registrar@kiet.edu<br /></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="edu-footer-widget explore-widget">
                <h4 className="widget-title">About</h4>
                <div className="inner">
                  <ul className="footer-link link-hover">
                    <li><a href="https://kiet.edu/about/Overview/">Overview</a></li>
                    <li><a href="https://kiet.edu/about/executive-leadership/">Governance</a></li>
                    <li><a href="https://kiet.edu/about/recognitions-approvals/">Approvals</a></li>
                    <li><a href="https://kiet.edu/campus-life/infrastructure/">Infrastructure</a></li>
                    <li><a href="https://kiet.edu/academics/Overview/">Academics</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="edu-footer-widget quick-link-widget">
                <h4 className="widget-title">Courses &amp; Admission</h4>
                <div className="inner">
                  <ul className="footer-link link-hover">
                    <li><a href="https://kiet.edu/programs/undergraduate-programs/">Undergraduate Course</a></li>
                    <li><a href="https://kiet.edu/programs/postgraduate-programs/">Postgraduate Course</a></li>
                    <li><a href="https://kiet.edu/programs/diploma-programs/">Diploma Course</a></li>
                    <li><a href="https://kiet.edu/doctoral-program/">Doctoral Course</a></li>
                    <li><a href="https://kiet.edu/post-doc-program/">Post-Doctoral Course</a></li>
                    <li><a href="https://kiet.edu/admissions/admission-procedure/">Admission Procedure</a></li>
                    <li><a href="https://kiet.edu/admissions/mandatory-disclosure/">Mandatory Disclosure</a></li>
                    <li><a href="https://admission.kiet.edu/">Apply Online</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="edu-footer-widget quick-link-widget">
                <h4 className="widget-title">Important</h4>
                <div className="inner">
                  <ul className="footer-link link-hover">
                    <li><a href="https://kiet.edu/student-welfare/internal-complaints-committee/">Internal Complaints Committee (ICC)</a></li>
                    <li><a href="https://kiet.edu/academics/student-grievance-redressal/">Student Grievance Redressal</a></li>
                    <li><a href="https://kiet.edu/student-welfare/student-discipline-policy/">Student Discipline Policy</a></li>
                    <li><a href="https://kiet.edu/student-welfare/counselling-support/">Counselling Support</a></li>
                    <li><a href="https://kiet.edu/careers/">Careers</a></li>
                    <li><a href="https://kiet.edu/contact-us/">Contact Us</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner text-center">
                <p className="text-center">
                  Copyright 2026 KIET. All Rights Reserved | <a href="https://kiet.edu/assets/docs/admissions/Privacy Policy.pdf" target="_blank" className="text-primary">Privacy Policy</a>
                  <br />
                  KIET under the aegis of Krishna Charitable Society.
                  <br />
                  Made with ❤️ by <a href="https://tech.kiet.edu/team-erp/" rel="noreferrer" target="_blank" className="text-success">TEAM ERP</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

