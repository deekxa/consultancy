"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CourseSearchAndApplyUK from "./components/CourseSearchAndApply";  // you may rename components appropriately
import FAQSectionUK from "./components/FAQSectionUK";

export default function UKPage() {
  const [angleOffset, setAngleOffset] = useState(0);

  // Smooth slow rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAngleOffset((prev) => prev + 0.0008);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const imageW = 500;
  const imageH = 350;
  const RADIUS = 500;

  const cardConfig = [
    {
      title: "Benefits",
      items: [
        "World‑class universities & research",
        "Diverse multicultural environment",
        "One‑year master’s (many courses)",
        "Post‑study work visa (Graduate Route)",
      ],
    },
    {
      title: "Key Facts",
      items: [
        "Language: English",
        "UG typically 3 yrs (Scotland 4 yrs) / PG ~1 yr",
        "Tuition & living cost vary by city & course",
      ],
    },
    {
      title: "Exam Requirements",
      items: [
        "IELTS / TOEFL accepted by most universities",
        "Some universities accept PTE or own English tests",
      ],
    },
    {
      title: "Typical Costs (International Students)",
      items: [
        "UG: ~£11,000–£38,000 / year",  // depending on uni & subject :contentReference[oaicite:0]{index=0}
        "PG: ~£9,000–£30,000 / year (varies by field)",  // :contentReference[oaicite:1]{index=1}
        "Living (London): ~£1,300–£1,400 / month",  // :contentReference[oaicite:2]{index=2}
        "Living (other cities): ~£900–£1,300 / month",  // :contentReference[oaicite:3]{index=3}
      ],
    },
    {
      title: "Timeline & Visa",
      items: [
        "Main intake: September", 
        "Some universities offer January / February intake",  // :contentReference[oaicite:4]{index=4}
        "Apply 6–9 months early (CAS, visa, funds)", 
        "Show funds: tuition + living cost per UKVI rules",  // :contentReference[oaicite:5]{index=5}
      ],
    },
    {
      title: "Requirements",
      items: [
        "Acceptance (CAS) from licensed university", 
        "Tuition fees + living cost funds in bank",  // :contentReference[oaicite:6]{index=6}
        "English language proof (IELTS/TOEFL etc.)", 
        "Academic transcripts / credentials", 
        "Health insurance (NHS surcharge)",  // many universities include/require this :contentReference[oaicite:7]{index=7}
      ],
    },
    {
      title: "Scholarships & Aid",
      items: [
        "University‑specific scholarships / bursaries", 
        "Government / external scholarships (when available)", 
        "Research assistantships (for PG/PhD)", 
      ],
    },
    {
      title: "Why UK?",
      items: [
        "Globally recognised degrees",
        "One‑year master’s → faster entry to job market",
        "Vibrant student life & multicultural society",
        "Work part-time while studying, plus post‑study visa",  // assume post‑study visa (Graduate Route)
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
    <main className="min-h-screen w-full bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#ebe8ff] relative">
    {/* TOP HERO SECTION */}
<section className="relative w-full min-h-[550px] flex items-center justify-center overflow-hidden mb-0">
  {/* Background Image */}
  <img
    src="/country/uk3.jpeg"
    alt="Study in UK hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-[#22223b]/60" />

  {/* Center Text */}
  <div className="relative z-10 w-full px-6 lg:px-16 py-20 flex flex-col items-center text-center animate-slideUp">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(30,20,80,0.96)]">
      Study in UK
    </h1>

    <p className="mt-4 max-w-2xl text-base sm:text-lg text-white/80">
      Explore universities, visa options, and everything you need to start your UK study journey.
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

      <span className="text-[#a89fff] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">UK</span>
    </nav>
  </div>
</section>


      {/* ORBIT SECTION WITH FIXED SPACING */}
      <section
        className="
          relative
          w-full
          min-h-[1200px]
          md:min-h-[1300px]
          flex
          items-center
          justify-center
          select-none
          pt-30
          pb-30
          overflow-hidden
        "
      >
        {/* SVG connectors */}
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
            src="/country/uk2.jpeg"
            width={imageW}
            height={imageH}
            alt="Study in UK"
            className="rounded-3xl shadow-2xl border-4 border-[#a89fff] object-cover"
          />
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#110053] mt-8 tracking-tight">
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

      {/* BOTTOM SECTIONS WITH FIXED SPACING */}
      <section className="w-full pb-20 space-y-16">
        <CourseSearchAndApplyUK />
        <FAQSectionUK />
      </section>

      <style jsx global>{`
        @keyframes draw-line {
          from {
            stroke-dasharray: 600;
            stroke-dashoffset: 600;
          }
          to {
            stroke-dasharray: 600;
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </main>
  );
}
