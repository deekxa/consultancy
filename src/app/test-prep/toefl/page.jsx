"use client";

import React, { useRef, forwardRef, useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

const BookPage = forwardRef(function BookPage(props, ref) {
  const { children, className } = props || {};
  return (
    <div ref={ref} className={`flip-page ${className ?? ""}`}>
      {children}
    </div>
  );
});

// 1 TAB = 1 PAGE
const TAB_TO_PAGE = {
  overview: 0,
  dates: 1,
  eligibility: 2,
  preparation: 3,
  syllabus: 4,
  results: 5,
  faqs: 6,
  guide: 7,
};

const PAGE_TO_TAB = {
  0: "overview",
  1: "dates",
  2: "eligibility",
  3: "preparation",
  4: "syllabus",
  5: "results",
  6: "faqs",
  7: "guide",
};

export default function TOEFLPage() {
  const bookRef = useRef(null);
  const [activeTab, setActiveTab] = useState("overview");

  const [flipSize, setFlipSize] = useState({ width: 1100, height: 650 });

  useEffect(() => {
    const updateSize = () => {
      const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
      const vh = typeof window !== "undefined" ? window.innerHeight : 800;

      const maxWidth = 1000;
      const minWidth = 420;
      const maxHeight = 860;
      const minHeight = 560;

      const width = Math.min(Math.max(vw * 0.95, minWidth), maxWidth);
      const height = Math.min(Math.max(vh * 0.8, minHeight), maxHeight);

      setFlipSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleTabClick = (key) => {
    const pageIndex = TAB_TO_PAGE[key] ?? 0;
    const api = bookRef.current?.pageFlip();
    if (!api) return;
    api.turnToPage(pageIndex);
    setActiveTab(key);
  };

  useEffect(() => {
    let mounted = true;
    let retryTimer = null;

    const attach = () => {
      const api = bookRef.current?.pageFlip();
      if (!api) {
        retryTimer = setTimeout(attach, 200);
        return;
      }

      const onFlip = (e) => {
        const pageIndex = e.data;
        const mapped = PAGE_TO_TAB[pageIndex];
        if (mapped && mounted) setActiveTab(mapped);
      };

      api.on("flip", onFlip);

      return () => {
        api.off("flip", onFlip);
      };
    };

    const cleanup = attach();
    return () => {
      mounted = false;
      if (retryTimer) clearTimeout(retryTimer);
      if (typeof cleanup === "function") cleanup();
    };
  }, []);

  const handlePrev = () => {
    const api = bookRef.current?.pageFlip();
    if (!api) return;
    api.flipPrev("bottom");
  };

  const handleNext = () => {
    const api = bookRef.current?.pageFlip();
    if (!api) return;
    api.flipNext("bottom");
  };

  return (
    <main className="relative min-h-screen w-full bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#ebe8ff]">
      {/* HERO */}
     {/* HERO SECTION */}
<section className="relative w-full min-h-[550px] flex items-center justify-center overflow-hidden mb-0">
  {/* Background Image */}
  <img
    src="/heroimage/image3.jpg"
    alt="TOEFL preparation hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-[#22223b]/60" />

  {/* Center Text */}
  <div className="relative z-10 w-full px-6 lg:px-16 py-20 flex flex-col items-center text-center animate-slideUp">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(30,20,80,0.96)]">
      TOEFL Test Preparation
    </h1>
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

      <span className="text-[#a89fff] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">TOEFL</span>
    </nav>
  </div>
</section>


      {/* NAVBAR */}
      <section className="mb-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex w-full flex-wrap gap-[1px] rounded-md border border-[#e1d7ff] bg-[#f9f7ff]">
            {[
              { key: "overview", label: "TOEFL – OVERVIEW" },
              { key: "dates", label: "DATES & CENTRES" },
              { key: "eligibility", label: "ELIGIBILITY" },
              { key: "preparation", label: "PREPARATION" },
              { key: "syllabus", label: "PATTERN & TASKS" },
              { key: "results", label: "RESULTS & FEES" },
              { key: "faqs", label: "FAQS" },
              { key: "guide", label: "DOWNLOAD GUIDE" },
            ].map((tab) => {
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabClick(tab.key)}
                  className={`px-4 py-2 text-[11px] font-semibold tracking-[0.13em] uppercase transition-colors whitespace-normal break-words ${
                    isActive
                      ? "bg-[#7a67c1] text-white"
                      : "bg-white text-[#7a67c1] hover:bg-[#f0edff] cursor-pointer"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FLIPBOOK SECTION */}
      <section className="pb-24 pt-2">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
              TOEFL Overview & Coaching Guide
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#110053] sm:text-3xl">
              Flip through the TOEFL information booklet
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[#3e3758] sm:text-base">
              Each tab opens a matching page with clear TOEFL information, task details and coaching support.
            </p>
          </div>

          <div className="relative mt-4 flex justify-center">
            {/* Left (Prev) */}
            <button
              aria-label="Previous page"
              onClick={handlePrev}
              className="absolute left-[-60px] top-1/2 z-40 hidden -translate-y-1/2 transform rounded-full border border-slate-300 bg-white px-4 py-2 text-xs text-slate-700 shadow-sm hover:bg-slate-50 sm:inline-flex"
            >
              Prev
            </button>

            {/* Right (Next) */}
            <button
              aria-label="Next page"
              onClick={handleNext}
              className="absolute right-[-60px] top-1/2 z-40 hidden -translate-y-1/2 transform rounded-full border border-[#110053] bg-[#110053] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#1b0d7a] sm:inline-flex"
            >
              Next
            </button>

            {/* FLIPBOOK (center) */}
            <div className="flex justify-center overflow-hidden">
              <HTMLFlipBook
                ref={bookRef}
                key={`${flipSize.width}-${flipSize.height}`}
                width={flipSize.width}
                height={flipSize.height}
                size="fixed"
                minWidth={420}
                maxWidth={1000}
                minHeight={560}
                maxHeight={860}
                startPage={0}
                autoSize={true}
                maxShadowOpacity={0.45}
                drawShadow={true}
                flippingTime={700}
                showCover={true}
                mobileScrollSupport={true}
                usePortrait={true}
                showPageCorners={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                disableFlipByClick={false}
                className="flipbook-shadow rounded-3xl bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#ebe8ff]"
              >
                {/* 0 – OVERVIEW COVER */}
                <BookPage className="overflow-hidden rounded-xl !p-0">
                  <section className="relative flex h-full w-full flex-col overflow-hidden rounded-xl bg-gradient-to-br from-[#e8e3ff] via-[#f0edff] to-[#ebe8ff]">
                    <div className="absolute left-6 top-10 h-14 w-14 rotate-12 bg-[#7a67c1] opacity-25"></div>
                    <div className="absolute right-10 top-1/3 h-16 w-16 -rotate-6 bg-[#d92027] opacity-20"></div>
                    <div className="absolute bottom-12 left-1/4 h-10 w-10 rotate-45 bg-[#0066cc] opacity-15"></div>
                    <div className="absolute inset-5 rounded-lg border-[5px] border-[#110053]"></div>

                    <div className="relative z-10 flex h-full w-full flex-col justify-between px-8 py-8 sm:px-10 sm:py-8">
                      <div>
                        <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#7a67c1]">
                          Expert Test Preparation
                        </p>
                        <h1 className="mb-1 max-w-[480px] text-5xl font-black leading-[0.95] tracking-[-0.01em] text-[#110053] sm:text-6xl">
                          TOEFL iBT
                        </h1>
                        <h2 className="max-w-[420px] text-xl font-bold leading-snug tracking-tight text-[#110053] sm:text-2xl">
                          Internet-based test for academic
                          <br />
                          English proficiency worldwide
                        </h2>
                        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a67c1]">
                          TOEFL iBT – 2025 Edition
                        </p>
                      </div>

                      <div className="my-3 grid max-w-md grid-cols-2 gap-3">
                        <div className="rounded-lg border-[3px] border-[#7a67c1] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            Four integrated skills
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            Reading, Listening, Speaking
                            <br />
                            and Writing in under 2 hours.
                          </p>
                        </div>
                        <div className="rounded-lg border-[3px] border-[#d92027] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d92027]">
                            Globally recognized
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            Accepted by 11,000+ institutions
                            <br />
                            in 150+ countries worldwide.
                          </p>
                        </div>
                      </div>

                      <div className="max-w-lg space-y-2.5">
                        <p className="text-[11px] leading-relaxed text-[#110053]/90">
                          TOEFL iBT is the world's most widely accepted English-language test for study abroad, accepted by top universities in the US, UK, Canada, Australia, New Zealand and across Europe and Asia.
                        </p>
                        <div className="rounded-lg border-[3px] border-[#110053] bg-white/95 p-2.5 shadow-lg">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            What we focus on
                          </p>
                          <p className="text-[11px] font-medium leading-relaxed text-[#110053]">
                            Section-wise techniques, academic vocabulary building, integrated task practice, timed mock tests and score improvement plans for your target university.
                          </p>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center justify-between border-t border-[#110053]/15 pt-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="h-6 w-6 rounded-sm bg-gradient-to-br from-[#7a67c1] to-[#110053]"></div>
                          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#110053]/70">
                            Education Tree Global
                          </span>
                        </div>
                        <span className="text-base font-black text-[#110053]/60">2025</span>
                      </div>
                    </div>
                  </section>
                </BookPage>

                {/* 1 – DATES & CENTRES */}
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Dates & Centres
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      TOEFL exam dates & centres in Nepal
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      TOEFL iBT is available year-round with test dates offered multiple times a month at authorized ETS centres across Nepal, including weekdays and weekends.
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      You register through your ETS TOEFL account, select a nearby test centre and date, and pay the fee online in USD (around NPR 27,000 after conversion).
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      TOEFL test centres in Nepal (common locations)
                    </h4>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-800">
                      <span>• Kathmandu (multiple centres)</span>
                      <span>• Lalitpur</span>
                      <span>• Butwal</span>
                      <span>• Chitwan</span>
                      <span>• Pokhara</span>
                      <span>• Biratnagar</span>
                    </div>

                    <div className="mt-4 grid gap-3 text-[11px] md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7f6cff]">
                          Booking timeline tip
                        </p>
                        <p className="mt-1 text-slate-800">
                          TOEFL scores are typically available within 4–8 days after the test, so book at least 2–3 weeks before your university application deadline to account for score sending time.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7f6cff]">
                          Our support
                        </p>
                        <p className="mt-1 text-slate-800">
                          We help you find the nearest test centre, compare TOEFL and IELTS dates, and align your test booking with university deadlines and visa timelines.
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      If your preferred date or centre is full, our team can suggest alternative locations or intake adjustments so you still meet your application timeline.
                    </p>
                  </div>
                </BookPage>

                {/* 2 – ELIGIBILITY */}
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Eligibility
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Who can take the TOEFL exam?
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      TOEFL iBT has no strict eligibility criteria set by ETS. Any non-native English speaker aged 16 or above can register and sit for the test.
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      There is no maximum age limit, and candidates below 18 can take the exam with guardian consent. A valid passport is required as the primary ID document for test day in Nepal.
                    </p>

                    <div className="mt-3 grid gap-3 text-xs mb-4 md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Basic eligibility checklist
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Age 16 or above (recommended minimum age).</li>
                          <li>Valid passport as primary ID in Nepal.</li>
                          <li>Guardian consent if under 18 years of age.</li>
                          <li>Planning to use TOEFL for university admission or professional certification.</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Why choose TOEFL
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Preferred by 90% of US universities for undergraduate and graduate programs.</li>
                          <li>Accepted by top institutions in UK, Canada, Australia and 150+ countries.</li>
                          <li>100% internet-based with standardized grading from ETS.</li>
                          <li>Scores valid for 2 years from test date.</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      Our counsellors help you confirm if TOEFL is accepted for your chosen course and country, or whether IELTS or PTE might be a better alternative.
                    </p>
                  </div>
                </BookPage>

                {/* 3 – PREPARATION */}
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Preparation
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      TOEFL preparation strategies & our classes
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      TOEFL iBT is fully computer-based with integrated tasks that test multiple skills together. Effective preparation focuses on academic vocabulary, note-taking and time management for each section.
                    </p>

                    <div className="mt-3 grid gap-3 text-xs md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Self-study plan
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Start with a full-length official TOEFL mock to know your baseline score (0–120).</li>
                          <li>Study the format and timing for Reading, Listening, Speaking and Writing sections.</li>
                          <li>Build academic vocabulary from TOEFL word lists and sample passages.</li>
                          <li>Practice typing essays and speaking responses within strict time limits.</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Our coaching support
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Section-wise strategy classes covering all question types.</li>
                          <li>Timed mock tests with score analysis and personalized feedback.</li>
                          <li>Speaking and writing labs with expert correction and templates.</li>
                          <li>Score planning for 70+, 80+, 90+ or 100+ based on your target university.</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      With 6–10 weeks of focused coaching, many students improve from mid-60s to 80–90 range, and with dedicated effort can reach 100+ for top-tier programs.
                    </p>
                  </div>
                </BookPage>

                {/* 4 – PATTERN & TASKS */}
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Pattern & Tasks
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      TOEFL test pattern & main tasks
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The updated TOEFL iBT (from July 2023) takes just under 2 hours and has four sections: Reading, Listening, Speaking and Writing, all completed on computer.
                    </p>

                    <div className="mt-3 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">Section</th>
                            <th className="border-b px-3 py-2 text-left">Time</th>
                            <th className="border-b px-3 py-2 text-left">Tasks / Questions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">Reading</td>
                            <td className="border-b px-3 py-2">35 min</td>
                            <td className="border-b px-3 py-2">
                              2 academic passages, 20 questions total covering main ideas, details, inference and vocabulary.
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Listening</td>
                            <td className="border-b px-3 py-2">36 min</td>
                            <td className="border-b px-3 py-2">
                              3 lectures and 2 conversations, 28 questions testing comprehension, function and attitude.
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Speaking</td>
                            <td className="border-b px-3 py-2">16 min</td>
                            <td className="border-b px-3 py-2">
                              4 tasks: 1 independent (personal opinion) and 3 integrated (read/listen then speak).
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Writing</td>
                            <td className="px-3 py-2">29 min</td>
                            <td className="px-3 py-2">
                              2 tasks: 1 integrated essay (read/listen then write) and 1 discussion board response.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      In class, we break down the scoring rubrics for Speaking and Writing so you know exactly what evaluators look for in grammar, organization, fluency and content.
                    </p>
                  </div>
                </BookPage>

                {/* 5 – RESULTS, SCORES & FEES */}
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f5f2ff] px-7 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Results, Scores & Fees
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      TOEFL scoring, results & updated fee in Nepal
                    </h3>

                    <p className="mt-2 text-xs text-slate-700">
                      TOEFL iBT scores range from 0 to 120, with each of the four sections (Reading, Listening, Speaking, Writing) scored 0–30. Most universities require a total score of 70–100 depending on the program level.
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      TOEFL exam fee in Nepal (2025)
                    </h4>
                    <div className="mt-1 mb-3 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">Item</th>
                            <th className="border-b px-3 py-2 text-left">Fee (USD)</th>
                            <th className="border-b px-3 py-2 text-left">Approx. NPR</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">TOEFL iBT registration</td>
                            <td className="border-b px-3 py-2">$195</td>
                            <td className="border-b px-3 py-2">≈ NPR 27,000 (varies with exchange rate)</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Late registration</td>
                            <td className="border-b px-3 py-2">$40</td>
                            <td className="border-b px-3 py-2">≈ NPR 5,500</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Rescheduling fee</td>
                            <td className="border-b px-3 py-2">$60</td>
                            <td className="border-b px-3 py-2">≈ NPR 8,300</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Additional score report (per institution)</td>
                            <td className="px-3 py-2">$20</td>
                            <td className="px-3 py-2">≈ NPR 2,800</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      ETS charges in USD; your card or bank converts to NPR at the current rate plus service fees, so the exact amount can vary slightly per booking.
                    </p>

                    <div className="mt-3 grid gap-3 text-[11px] md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Score reports & validity
                        </p>
                        <p className="mt-1 text-slate-800">
                          Scores are available 4–8 days after the test and can be sent electronically to universities directly from your ETS account. TOEFL scores are valid for 2 years from the test date.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          TOEFL vs IELTS score comparison
                        </p>
                        <p className="mt-1 text-slate-800">
                          TOEFL 100 ≈ IELTS 7.0 | TOEFL 90 ≈ IELTS 6.5 | TOEFL 80 ≈ IELTS 6.0 | TOEFL 70 ≈ IELTS 5.5. Both tests are widely accepted but TOEFL is preferred in North America while IELTS is stronger in the UK and Australia.
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      Our team helps you understand which TOEFL score range (70–79, 80–89, 90–99, 100+) matches your target universities and programs, and builds a prep plan accordingly.
                    </p>
                  </div>
                </BookPage>

                {/* 6 – FAQS */}
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      FAQs
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      TOEFL quick FAQs
                    </h3>
                    <div className="mt-3 space-y-2 text-xs text-slate-800">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Is TOEFL easier than IELTS?</p>
                        <p className="mt-1">
                          Some students find TOEFL easier because it uses multiple-choice questions and is fully computer-based, while others prefer IELTS for its face-to-face speaking interview. The best choice depends on your comfort with typing, academic reading and integrated tasks.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Where is TOEFL accepted?</p>
                        <p className="mt-1">
                          TOEFL is accepted by over 11,000 institutions in 150+ countries, including 90% of US universities, top programs in Canada, UK, Australia, New Zealand and across Europe and Asia.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. How many times can I take TOEFL?</p>
                        <p className="mt-1">
                          There is no limit on attempts, but you must wait at least 3 days between test dates. You can retake the exam as often as needed to achieve your target score.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. What is a good TOEFL score?</p>
                        <p className="mt-1">
                          For undergraduate programs, 70–80 is common; for graduate programs, 80–100 is typical; and for highly competitive programs or scholarships, 100+ is often expected. Check your specific university requirements.
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      For detailed questions about score improvement, re-scoring, or choosing between TOEFL and other tests, our counsellors offer one-on-one guidance sessions.
                    </p>
                  </div>
                </BookPage>

                {/* 7 – DOWNLOAD GUIDE */}
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Download Guide
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Download the complete TOEFL booklet
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      Download a PDF guide that collects TOEFL overview, test dates, updated fees in Nepal, eligibility, preparation tips, pattern, section details, scoring and FAQs in one place.
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      Use it as your personal checklist from first enquiry to TOEFL booking, score reporting and final university application.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 max-w-xs">
                      <a
                        href="/downloads/TOEFL_Preparation_Guide_2025.pdf"
                        download="TOEFL_Preparation_Guide_2025.pdf"
                        className="inline-flex items-center justify-center rounded-full border border-[#110053] bg-[#110053] px-5 py-2 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-[#1b0d7a]"
                      >
                        ⬇ Download TOEFL Guide PDF
                      </a>
                      <a
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-[#d5cfff] bg-transparent px-5 py-2 text-xs font-medium text-[#110053] transition hover:bg-[#f4f0ff]"
                      >
                        Talk to a Counsellor
                      </a>
                    </div>
                  </div>
                </BookPage>
              </HTMLFlipBook>
            </div>
          </div>

          {/* Small-screen Prev/Next */}
          <div className="mt-4 flex items-center justify-center gap-3 sm:hidden">
            <button
              onClick={handlePrev}
              className="inline-flex items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-xs text-slate-700 transition hover:bg-slate-100"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="inline-flex items-center justify-center rounded-full border border-[#110053] bg-[#110053] px-4 py-2 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-[#1b0d7a]"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
