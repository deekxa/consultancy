"use client";

import { useState, useEffect } from "react";
import Form from "./Form";

// ---------------- EUROPE COURSE DATA ----------------
const DATA = [
  {
    id: 1,
    title: "Bachelor of Computer Science",
    institution: "Technical University of Munich (TUM)",
    logo: "/logos/tum.png",
    tuitionFee: "Free (Semester fee ~ €150)",
    applicationFee: "€0",
    duration: "36 months",
    intakes: "October",
    postStudyWork: true,
    englishScore: "6.5",
    discipline: "Information Technology",
    level: "Undergraduate",
  },
  {
    id: 2,
    title: "Master in Data Science",
    institution: "University of Amsterdam",
    logo: "/logos/uofa.png",
    tuitionFee: "€18,000",
    applicationFee: "€100",
    duration: "24 months",
    intakes: "September",
    postStudyWork: true,
    englishScore: "7.0",
    discipline: "Information Technology",
    level: "Postgraduate",
  },
  {
    id: 3,
    title: "Bachelor of Business Administration",
    institution: "Tilburg University (Netherlands)",
    logo: "/logos/tilburg.png",
    tuitionFee: "€10,900",
    applicationFee: "€80",
    duration: "36 months",
    intakes: "September",
    postStudyWork: true,
    englishScore: "6.0",
    discipline: "Management and Commerce",
    level: "Undergraduate",
  },
  {
    id: 4,
    title: "Master of Mechanical Engineering",
    institution: "RWTH Aachen University (Germany)",
    logo: "/logos/rwth.png",
    tuitionFee: "Free (Semester fee ~ €300)",
    applicationFee: "€0",
    duration: "24 months",
    intakes: "October",
    postStudyWork: true,
    englishScore: "6.5",
    discipline: "Engineering related Technologies",
    level: "Postgraduate",
  },
  {
    id: 5,
    title: "Bachelor of Psychology",
    institution: "University of Helsinki (Finland)",
    logo: "/logos/helsinki.png",
    tuitionFee: "€13,000",
    applicationFee: "€75",
    duration: "36 months",
    intakes: "September",
    postStudyWork: true,
    englishScore: "6.0",
    discipline: "Health",
    level: "Undergraduate",
  },
  {
    id: 6,
    title: "Master of International Relations",
    institution: "Sciences Po (France)",
    logo: "/logos/sciencespo.png",
    tuitionFee: "€14,000",
    applicationFee: "€100",
    duration: "24 months",
    intakes: "September",
    postStudyWork: true,
    englishScore: "7.0",
    discipline: "Creative Arts",
    level: "Postgraduate",
  },
];

// Dropdown filter options
const INTAKES = ["September", "October"];
const LEVELS = ["Undergraduate", "Postgraduate"];
const DISCIPLINES = [
  "Engineering related Technologies",
  "Management and Commerce",
  "Health",
  "Information Technology",
  "Creative Arts",
];

export default function CourseSearchAndApplyEU() {
  const [search, setSearch] = useState("");
  const [intake, setIntake] = useState("");
  const [level, setLevel] = useState("");
  const [selectedDisciplines, setSelectedDisciplines] = useState([]);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = DATA.filter(
    (course) =>
      (!level || course.level === level) &&
      (selectedDisciplines.length === 0 ||
        selectedDisciplines.includes(course.discipline)) &&
      (!intake || (course.intakes && course.intakes.includes(intake))) &&
      (course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.institution.toLowerCase().includes(search.toLowerCase()))
  );

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

  // Prevent scroll when modal is open
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
          Discover courses in Europe
        </h1>
        <p className="mt-1 text-sm sm:text-base text-[#4a4560] mb-10">
          Explore programs across Germany, Netherlands, France, Finland, and more.
        </p>
      </div>

      {/* Search + filters */}
      <form
        className="w-full bg-white rounded-xl shadow px-3 py-4 mb-6 flex flex-col md:flex-row gap-4 items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-[#e6def8] rounded-lg text-sm"
          placeholder="Search courses or universities in Europe..."
        />
        <select
          value={intake}
          onChange={(e) => setIntake(e.target.value)}
          className="w-full md:w-48 px-3 py-2 border border-[#e6def8] rounded-lg text-sm"
        >
          <option value="">All Intakes</option>
          {INTAKES.map((i) => (
            <option key={i}>{i}</option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full md:w-48 px-3 py-2 border border-[#e6def8] rounded-lg text-sm"
        >
          <option value="">All Levels</option>
          {LEVELS.map((l) => (
            <option key={l}>{l}</option>
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
          } fixed md:static z-30 left-0 top-0`}
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
                  <span className="font-medium">Tuition: {course.tuitionFee}</span>
                  <span>Intakes: {course.intakes}</span>
                  <span>Duration: {course.duration}</span>
                  <span>PSW: {course.postStudyWork ? "Yes" : "No"}</span>
                  <span>Discipline: {course.discipline}</span>
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
