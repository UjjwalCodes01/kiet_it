import Roadmap from "./Roadmap";
import OverviewSection from "./sections/OverviewSection";
import HighlightsSection from "./sections/HighlightsSection";
import PlacementSection from "./sections/PlacementSection";
import CentreOfExcellenceSection from "./sections/CentreOfExcellenceSection";
import ClubsSection from "./sections/ClubsSection";
import DeanMessageSection from "./sections/DeanMessageSection";
import FacultySection from "./sections/FacultySection";
import AchieversSection from "./sections/AchieversSection";
import ResearchSection from "./sections/ResearchSection";
import AcademicsSection from "./sections/AcademicsSection";

/**
 * ProgramDetails — Orchestrates all IT department page sections in order.
 * Each section is an independent, focused component in /sections/.
 *
 * @param {{ faculty: object[], facultyPageHref: string }} props
 */
export default function ProgramDetails({ faculty, facultyPageHref }) {
  return (
    <>
      <OverviewSection />
      <HighlightsSection />
      <PlacementSection />
      <Roadmap />
      <CentreOfExcellenceSection />
      <ClubsSection />
      <DeanMessageSection />
      <FacultySection faculty={faculty} facultyPageHref={facultyPageHref} />
      <AchieversSection />
      <ResearchSection />
      <section className="mx-2 mx-md-4 mx-lg-5 px-0 px-md-3 px-lg-5 py-3 py-md-4">
        <div className="p-3 p-md-4 p-lg-5">
          <AcademicsSection />
        </div>
      </section>
    </>
  );
}
