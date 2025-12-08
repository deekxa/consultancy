"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CourseSearchAndApply from "./components/CourseSearchAndApply";
import FAQSectionNZ from "./components/FAQSectionNZ";

export default function NewZealandPage() {
  const [angleOffset, setAngleOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngleOffset((prev) => prev + 0.0008);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const imageW = 500;
  const imageH = 350;
  const RADIUS = 500;

  // ------------------------------------------
  //      NEW ZEALAND — COMPLETE ACCURATE INFO
  // ------------------------------------------
  const cardConfig = [
    {
      title: "Benefits",
      items: [
        "Globally ranked universities",
        "Safe & peaceful country",
        "Post-study work (1–3 years)",
      ],
    },
    {
      title: "Key Facts",
      items: [
        "Language: English",
        "Levels: UG, PG, Diploma, Masters",
        "Intakes: February & July (main)",
      ],
    },
    {
      title: "Exam Requirements",
      items: [
        "IELTS / TOEFL / PTE",
        "Foundation pathway for low scores",
        "Portfolio for design/creative programs",
      ],
    },
    {
      title: "Typical Costs",
      items: [
        "UG: $22,000 – $35,000 / year",
        "PG: $26,000 – $45,000 / year",
        "Living Cost: $15,000 – $20,000 / year",
      ],
    },
    {
      title: "Timeline & Visa",
      items: [
        "Main intakes: Feb & July",
        "Student Visa: Fee-Paying Student Visa",
        "Processing: 4–8 weeks",
      ],
    },
    {
      title: "Requirements",
      items: [
        "Valid passport & academics",
        "English proficiency score",
        "Financial proof ($20,000+)",
        "Offer of Place (OOP)",
      ],
    },
    {
      title: "Scholarships",
      items: [
        "Manaaki New Zealand Scholarship",
        "University International Excellence Awards",
        "Graduate Research Scholarships",
      ],
    },
    {
      title: "Why New Zealand?",
      items: [
        "High-quality education",
        "Work allowed 20 hrs/week",
        "PR pathways after study",
        "Friendly multicultural environment",
      ],
    },
  ];

  const cards = cardConfig.map((cfg, idx, arr) => {
    const total = arr.length;
    const angle = (360 / total) * idx * (Math.PI / 180) + angleOffset;
    const x = Math.cos(angle) * RADIUS;
    const y = Math.sin(angle) * RADIUS;
    return { ...cfg, x, y };
  });

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-[#fdfcff] via-[#f3f0ff] to-[#ece9ff] relative">

      {/* ---------------- HERO ---------------- */}
     {/* HERO SECTION */}
<section className="relative w-full min-h-[550px] flex items-center justify-center overflow-hidden mb-0">
  {/* Background Image */}
  <img
    src="/country/newzealand2.jpg"
    alt="Study in New Zealand hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-[#241d46]/60" />

  {/* Center Text */}
  <div className="relative z-10 w-full px-6 lg:px-16 py-20 flex flex-col items-center text-center animate-slideUp">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(30,20,80,0.96)]">
      Study in New Zealand
    </h1>

    <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80">
      Explore universities, visa options, and everything you need to start your New Zealand study journey.
    </p>
  </div>

  {/* ⭐ ULTRA GLASSY TRANSPARENT BREADCRUMB - PURPLE THEME WITH SLIDE UP */}
  <div className="absolute bottom-0 left-0 w-full backdrop-blur-sm bg-white/[0.02] border-t border-white/5 py-4 animate-slideUpBreadcrumb">
    <nav className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center gap-3 text-base sm:text-lg font-bold">
      <a
        href="/"
        className="relative group text-[#e6def8] hover:text-white transition duration-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
      >
        Home
        <span className="absolute left-0 -bottom-0.5 w-0 h-[2px] bg-[#a89fff] rounded-full transition-all duration-300 group-hover:w-full" />
      </a>

      <span className="text-[#a89fff]/60">›</span>

      <span className="text-[#a89fff] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">New Zealand</span>
    </nav>
  </div>
</section>

      {/* ---------------- ORBIT SECTION ---------------- */}
      <section
        className="
          relative w-full min-h-[1200px] md:min-h-[1300px]
          flex items-center justify-center select-none
          pt-30 pb-30 overflow-hidden
        "
      >
        {/* Lines + Dots */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          width="2000"
          height="2000"
          viewBox="-1000 -1000 2000 2000"
        >
          {cards.map((card, i) => (
            <g key={i}>
              <line
                x1={0}
                y1={0}
                x2={card.x}
                y2={card.y}
                stroke="#7f6cff"
                strokeWidth={1.2}
                strokeLinecap="round"
                opacity={0.25}
              />
              <circle cx={card.x} cy={card.y} r={4} fill="#6F6597" opacity={0.4} />
            </g>
          ))}
        </svg>

        {/* Center Image */}
        <div className="absolute z-20 text-center">
          <Image
            src="/country/newzealand1.jpg"
            width={imageW}
            height={imageH}
            alt="Study in New Zealand"
            className="rounded-3xl shadow-2xl border-4 border-[#a89fff] object-cover"
          />
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#1b0a69] mt-8 tracking-tight">
            Key Highlights
          </h2>
        </div>

        {/* Orbit Cards */}
        {cards.map((card, i) => (
          <div
            key={i}
            className="absolute z-30"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(${card.x}px, ${card.y}px) translate(-50%, -50%)`,
            }}
          >
            <div className="backdrop-blur-xl bg-white/80 border border-[#e6def8] shadow-xl px-6 py-6 rounded-2xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.05] transition-all duration-300 w-[290px]">
              <h3 className="text-lg font-semibold text-[#7f6cff] mb-3 text-center tracking-wide">
                {card.title}
              </h3>
              <ul className="text-sm text-[#3e3758] space-y-1.5 list-disc pl-5">
                {card.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {/* ---------------- BOTTOM ---------------- */}
      <section className="w-full pb-20 space-y-16">
        <CourseSearchAndApply />
        <FAQSectionNZ />
      </section>
    </main>
  );
}
