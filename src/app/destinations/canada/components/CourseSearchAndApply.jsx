"use client";

import { useState, useEffect } from "react";
import Form from "./Form";

const DATA = [
  {
    id: 1,
    title:
      "International Foundation Program, Arts & Commerce Stream, Pathway to BCom",
    institution: "University of Toronto Mississauga",
    logo: "/logos/u-of-t.png",
    tuitionFee: "61720 CAD / year",
    applicationFee: "CAD 180",
    duration: "12 months",
    intakes: "September, January",
    postStudyWork: true,
    englishScore: "6.5",
    discipline: "Management and Commerce",
    level: "Foundation",
  },
  {
    id: 2,
    title: "Bachelor of Computer Science",
    institution: "University of British Columbia",
    logo: "/logos/ubc.png",
    tuitionFee: "51040 CAD / year",
    applicationFee: "CAD 126",
    duration: "48 months",
    intakes: "September",
    postStudyWork: true,
    englishScore: "6.5",
    discipline: "Information Technology",
    level: "Undergraduate",
  },
  {
    id: 3,
    title: "Bachelor of Commerce",
    institution: "McGill University",
    logo: "/logos/mcgill.png",
    tuitionFee: "69599 CAD / year",
    applicationFee: "CAD 130",
    duration: "48 months",
    intakes: "September, January",
    postStudyWork: true,
    englishScore: "6.5",
    discipline: "Management and Commerce",
    level: "Undergraduate",
  },
  {
    id: 4,
    title: "Master of Public Health",
    institution: "University of Toronto",
    logo: "/logos/u-of-t.png",
    tuitionFee: "47000 CAD / year",
    applicationFee: "CAD 180",
    duration: "24 months",
    intakes: "September",
    postStudyWork: true,
    englishScore: "7.0",
    discipline: "Health",
    level: "Postgraduate",
  },
];

const INTAKES = ["January", "May", "September"];
const LEVELS = ["Foundation", "Undergraduate", "Postgraduate"];
const DISCIPLINES = [
  "Engineering related Technologies",
  "Management and Commerce",
  "Health",
  "Information Technology",
  "Creative Arts",
];

export default function CourseSearchAndApplyCanada() {
  const [search, setSearch] = useState("");
  const [intake, setIntake] = useState("");
  const [level, setLevel] = useState("");
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = DATA.filter((course) => {
    const matchesLevel = !level || course.level === level;
    const matchesDiscipline =
      selectedDisciplines.length === 0 ||
      selectedDisciplines.includes(course.discipline);
    const matchesIntake =
      !intake || (course.intakes && course.intakes.includes(intake));
    const query = search.toLowerCase();
    const matchesSearch =
      course.title.toLowerCase().includes(query) ||
      course.institution.toLowerCase().includes(query);

    return matchesLevel && matchesDiscipline && matchesIntake && matchesSearch;
  });

  const toggleDiscipline = (disc) => {
    setSelectedDisciplines((prev) =>
      prev.includes(disc) ? prev.filter((d) => d !== disc) : [...prev, disc]
    );
  };

  const handleReset = () => {
    setSearch("");
    setIntake("");
    setLevel("");
    setSelectedDisciplines([]);
  };

  const openModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  // lock body scroll when modal open
  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 text-center">
      {/* Top heading */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#110053]">
          Discover courses in Canada
        </h1>
        <p className="mt-1 text-sm sm:text-base text-[#4a4560] mb-10">
          Filter by intake, level, and discipline to find the right Canadian
          program, then apply in one step.
        </p>
      </div>

      {/* Search + filters row */}
      <form
        className="w-full bg-white rounded-xl shadow px-3 py-4 mb-6 flex flex-col md:flex-row gap-4 items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-[#e6def8] rounded-lg text-sm"
          placeholder="Search courses or universities in Canada..."
        />
        <select
          value={intake}
          onChange={(e) => setIntake(e.target.value)}
          className="w-full md:w-48 px-3 py-2 border border-[#e6def8] rounded-lg text-sm"
        >
          <option value="">All Intakes</option>
          {INTAKES.map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full md:w-48 px-3 py-2 border border-[#e6def8] rounded-lg text-sm"
        >
          <option value="">All Levels</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleReset}
          className="bg-white border border-[#46b96e] text-[#46b96e] px-6 py-2 rounded-lg font-semibold text-sm hover:bg-[#ebfbee] transition"
        >
          RESET
        </button>
        <button
          type="button"
          className="block md:hidden bg-[#8b7ae8] px-3 py-2 text-white rounded font-semibold"
          onClick={() => setShowFiltersMobile((x) => !x)}
        >
          Filters
        </button>
      </form>

      <div className="flex w-full gap-8">
        {/* Sidebar filters */}
        <aside
          className={`bg-white rounded-2xl shadow border border-[#e6def8] w-[250px] shrink-0 p-5 md:block ${
            showFiltersMobile ? "" : "hidden md:block"
          }`}
          style={{
            maxHeight: showFiltersMobile ? "90vh" : undefined,
            overflowY: "auto",
          }}
        >
          <span className="block font-semibold text-[#8b7ae8] mb-2">
            Disciplines
          </span>
          <div className="grid grid-cols-1 gap-2">
            {DISCIPLINES.map((disc) => (
              <label
                key={disc}
                className="flex items-center gap-2 text-xs text-[#4a4560] cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedDisciplines.includes(disc)}
                  onChange={() => toggleDiscipline(disc)}
                  className="accent-[#46b96e] w-4 h-4"
                />
                {disc}
              </label>
            ))}
          </div>
          <button
            className="block md:hidden mt-4 text-[#8b7ae8] font-bold"
            onClick={() => setShowFiltersMobile(false)}
          >
            Close
          </button>
        </aside>

        {/* Results */}
        <main className="flex-1 min-w-0 ml-0 md:ml-0">
          <div className="bg-white rounded-xl mb-3 px-6 py-3 flex items-center justify-between text-[#888] text-sm shadow border border-[#e6def8]">
            <span>Showing {filteredCourses.length} result(s)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredCourses.length === 0 && (
              <div className="col-span-full p-6 bg-white border border-[#e6def8] rounded-xl text-center text-[#8b7ae8]">
                No courses found matching your criteria.
              </div>
            )}
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-[#e6def8] shadow p-5 flex flex-col gap-2"
              >
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 flex items-center justify-center bg-[#faf9ff] rounded-lg border border-[#e6def8]">
                    {course.logo && (
                      <img
                        src={course.logo}
                        alt={course.institution}
                        className="h-8 w-8 object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-base font-semibold mb-1 text-[#110053]">
                      {course.title}
                    </div>
                    <div className="text-xs text-[#4a4560]">
                      {course.institution}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs text-[#4a4560] ml-1">
                  <span className="font-medium">
                    Tuition: {course.tuitionFee}
                  </span>
                  <span>Application fee: {course.applicationFee}</span>
                  <span>Intakes: {course.intakes}</span>
                  <span>Duration: {course.duration}</span>
                  <span>PSW: {course.postStudyWork ? "Yes" : "No"}</span>
                  <span>English: IELTS {course.englishScore}</span>
                  <span>Discipline: {course.discipline}</span>
                  <span>Level: {course.level}</span>
                </div>
                <button
                  onClick={() => openModal(course)}
                  className="mt-1 w-max px-5 py-2 bg-gradient-to-r from-[#8b7ae8] to-[#a89fff] text-xs font-semibold text-white rounded-xl shadow hover:scale-105 transition"
                >
                  Apply
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      <Form open={showModal} course={selectedCourse} onClose={closeModal} />
    </div>
  );
}
