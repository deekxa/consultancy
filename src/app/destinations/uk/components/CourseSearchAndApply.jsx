"use client";

import { useState, useEffect } from "react";
import Form from "./Form";

const DATA = [
  {
    id: 1,
    title: "BSc Computer Science",
    institution: "University of Manchester",
    logo: "/logos/um.png",
    tuitionFee: "£22,000 / year",      // typical international tuition range £11,400–£38,000 :contentReference[oaicite:1]{index=1}
    applicationFee: "£100",            // set real application fee
    duration: "36 months",             // UK bachelor 3 yrs (4 yrs in Scotland) :contentReference[oaicite:2]{index=2}
    intakes: "September", 
    postStudyWork: true,               // UK offers post-study options (subject to visa rules)
    englishScore: "6.5",               // typical IELTS requirement
    discipline: "Information Technology",
    level: "Undergraduate",
  },
  {
    id: 2,
    title: "MSc Data Science",
    institution: "University of Edinburgh",
    logo: "/logos/ed.png",
    tuitionFee: "£24,500 / year",      // typical PG range £9,000–£30,000 :contentReference[oaicite:3]{index=3}
    applicationFee: "£120",
    duration: "12 months",             // many UK master's are 1 year :contentReference[oaicite:4]{index=4}
    intakes: "September",
    postStudyWork: true,
    englishScore: "6.5",
    discipline: "Data Science / Computing",
    level: "Postgraduate",
  },
  // more items ...
];

const INTAKES = ["September", "January"];  // adjust as per actual unis
const LEVELS = ["Undergraduate", "Postgraduate", "Foundation"];
const DISCIPLINES = [
  "Information Technology",
  "Engineering",
  "Business & Management",
  "Health / Medicine",
  "Arts & Humanities",
];

export default function CourseSearchAndApplyUK() {
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
    const q = search.toLowerCase();
    const matchesSearch =
      course.title.toLowerCase().includes(q) ||
      course.institution.toLowerCase().includes(q);

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

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [showModal]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-2 text-center">
      <div className="mb-4 sm:mb-6">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#110053]">
          Discover courses in the UK
        </h1>
        <p className="mt-1 text-sm sm:text-base text-[#4a4560] mb-10">
          Filter by intake, level, and discipline to find the right UK program, then apply in one step.
        </p>
      </div>

      <form
        className="w-full bg-white rounded-xl shadow px-3 py-4 mb-6 flex flex-col md:flex-row gap-4 items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-[#e6def8] rounded-lg text-sm"
          placeholder="Search courses or universities in UK..."
        />
        <select
          value={intake}
          onChange={(e) => setIntake(e.target.value)}
          className="w-full md:w-48 px-3 py-2 border border-[#e6def8] rounded-lg text-sm"
        >
          <option value="">All Intakes</option>
          {INTAKES.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full md:w-48 px-3 py-2 border border-[#e6def8] rounded-lg text-sm"
        >
          <option value="">All Levels</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>{l}</option>
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
        <aside
          className={`bg-white rounded-2xl shadow border border-[#e6def8] w-[250px] shrink-0 p-5 md:block ${
            showFiltersMobile ? "" : "hidden md:block"
          }`}
          style={{
            maxHeight: showFiltersMobile ? "90vh" : undefined,
            overflowY: "auto",
          }}
        >
          <span className="block font-semibold text-[#8b7ae8] mb-2">Disciplines</span>
          <div className="grid grid-cols-1 gap-2">
            {DISCIPLINES.map((disc) => (
              <label key={disc} className="flex items-center gap-2 text-xs text-[#4a4560] cursor-pointer">
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
