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

export default function SATPage() {
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
<section className="relative w-full min-h-[550px] flex items-center justify-center overflow-hidden mb-0">
  <img
    src="/heroimage/image3.jpg"
    alt="SAT preparation hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-[#22223b]/60" />

  <div className="relative z-10 w-full px-6 lg:px-16 py-20 flex flex-col items-center text-center animate-slideUp">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(30,20,80,0.96)]">
      SAT (Digital) Test Preparation
    </h1>
  </div>

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

      <span className="text-[#a89fff] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">SAT</span>
    </nav>
  </div>
</section>


      <section className="mb-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex w-full flex-wrap gap-[1px] rounded-md border border-[#e1d7ff] bg-[#f9f7ff]">
            {[
              { key: "overview", label: "SAT – OVERVIEW" },
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

      <section className="pb-24 pt-2">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6">
          <div className="space-y-2 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
              SAT Overview & Coaching Guide
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#110053] sm:text-3xl">
              Flip through the SAT information booklet
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[#3e3758] sm:text-base">
              Each tab opens a matching page with clear SAT information, section breakdowns and coaching support.
            </p>
          </div>

          <div className="relative mt-4 flex justify-center">
            <button
              aria-label="Previous page"
              onClick={handlePrev}
              className="absolute left-[-60px] top-1/2 z-40 hidden -translate-y-1/2 transform rounded-full border border-slate-300 bg-white px-4 py-2 text-xs text-slate-700 shadow-sm hover:bg-slate-50 sm:inline-flex"
            >
              Prev
            </button>

            <button
              aria-label="Next page"
              onClick={handleNext}
              className="absolute right-[-60px] top-1/2 z-40 hidden -translate-y-1/2 transform rounded-full border border-[#110053] bg-[#110053] px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-[#1b0d7a] sm:inline-flex"
            >
              Next
            </button>

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
                          SAT
                        </h1>
                        <h2 className="max-w-[420px] text-xl font-bold leading-snug tracking-tight text-[#110053] sm:text-2xl">
                          Digital SAT for undergraduate
                          <br />
                          admissions worldwide
                        </h2>
                        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a67c1]">
                          New Digital SAT – 2025
                        </p>
                      </div>

                      <div className="my-3 grid max-w-md grid-cols-2 gap-3">
                        <div className="rounded-lg border-[3px] border-[#7a67c1] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            Shorter & adaptive
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            2 hr 14 min, section‑adaptive
                            <br />
                            Reading & Writing + Math[web:150][web:151][web:152][web:155].
                          </p>
                        </div>
                        <div className="rounded-lg border-[3px] border-[#d92027] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d92027]">
                            Global recognition
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            Accepted by thousands of
                            <br />
                            universities for bachelor&apos;s.
                          </p>
                        </div>
                      </div>

                      <div className="max-w-lg space-y-2.5">
                        <p className="text-[11px] leading-relaxed text-[#110053]/90">
                          The Digital SAT has two sections—Reading & Writing and Math—with a total score out of 1600 (200–800 per section). It is used for undergraduate admissions and scholarships in the US and many other countries[web:150][web:152][web:154][web:156].
                        </p>
                        <div className="rounded-lg border-[3px] border-[#110053] bg-white/95 p-2.5 shadow-lg">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            What we focus on
                          </p>
                          <p className="text-[11px] font-medium leading-relaxed text-[#110053]">
                            Foundation in algebra and data analysis, reading strategy for short passages, grammar rules, full‑length digital mocks and college‑wise target score planning.
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

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Dates & Centres
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      SAT test dates & centres
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The Digital SAT is offered several times a year worldwide. Students choose an international test centre, select one of the official monthly test dates and register through their College Board account.
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      You register online, pick a nearby test centre (often at schools or test centres in major cities), and pay the SAT fee in USD by card. Seats are limited for each date, so earlier booking gives better choice.
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      Typical international test centres
                    </h4>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-800">
                      <span>• Major schools in capital cities</span>
                      <span>• Partner testing centres</span>
                      <span>• Select international schools</span>
                      <span>• Regional hubs in big towns</span>
                    </div>

                    <div className="mt-4 grid gap-3 text-[11px] md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7f6cff]">
                          Booking timeline tip
                        </p>
                        <p className="mt-1 text-slate-800">
                          Plan your SAT at least 3–4 months before college deadlines so you have time for a possible retake and for sending scores to all shortlisted universities.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7f6cff]">
                          Our support
                        </p>
                        <p className="mt-1 text-slate-800">
                          We help select the right test date in relation to your school exams, SAT prep schedule and US/other college application rounds.
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      If your first preferred date is full, we help you switch centres or move to the next available session without disturbing your application plan.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Eligibility
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Who can take the SAT?
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The College Board does not set a strict minimum or maximum age for the SAT. Most test takers are in classes 11–12 or gap year students aiming for undergraduate programs abroad.
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      A valid passport (or other accepted government ID) is required for international students, and those under 18 may need parental consent while registering or on test day, depending on local rules.
                    </p>

                    <div className="mt-3 grid gap-3 text-xs mb-4 md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Basic eligibility checklist
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Typically in grade 11, 12 or recent school graduate.</li>
                          <li>Valid passport or acceptable government ID on test day.</li>
                          <li>College plans that accept or recommend SAT scores.</li>
                          <li>Comfort using a computer for the digital exam.</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Attempts & policies
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>No official limit on the number of attempts.</li>
                          <li>Students often take SAT 1–3 times to reach their target score.</li>
                          <li>You can choose which scores to send to colleges (Score Choice), if allowed by the institution.</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      We review your grade level, target countries and timelines to decide the right SAT attempt window and whether you need multiple attempts.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Preparation
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      SAT preparation strategies & our classes
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The Digital SAT focuses on high‑school level math and English skills, but with adaptive modules and strict timing. Preparation needs both concept review and practice with the digital format[web:150][web:152][web:153][web:155][web:156].
                    </p>

                    <div className="mt-3 grid gap-3 text-xs md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Self-study plan
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Take a diagnostic SAT practice test to know your starting score (400–1600).</li>
                          <li>Revise algebra, functions, data analysis and geometry basics for Math.</li>
                          <li>Practice reading short passages (25–150 words) and answering single MCQs per passage quickly[web:152][web:153][web:154].</li>
                          <li>Strengthen grammar rules: punctuation, verb tenses, pronouns, modifiers and parallel structure[web:152][web:153][web:156].</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Our coaching support
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Section‑wise classes for Reading & Writing and Math with digital practice drills.</li>
                          <li>Full‑length computer‑based mocks in the adaptive module pattern.</li>
                          <li>Timed practice with on‑screen calculator and SAT‑style tools.</li>
                          <li>Score planning for 1100+, 1300+ or 1450+ depending on target colleges.</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      Many students need 2–4 months of consistent practice to move from an initial 1000–1100 to 1250–1400, depending on school background and study discipline.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Pattern & Tasks
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      SAT test pattern & main sections
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The Digital SAT is section‑adaptive with two sections: Reading & Writing and Math. Each section has 2 modules and the entire test lasts about 2 hours 14 minutes, plus a 10‑minute break between sections[web:150][web:151][web:152][web:154][web:155][web:157].
                    </p>

                    <div className="mt-3 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">Section</th>
                            <th className="border-b px-3 py-2 text-left">Questions</th>
                            <th className="border-b px-3 py-2 text-left">Time</th>
                            <th className="border-b px-3 py-2 text-left">Score range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">Reading & Writing</td>
                            <td className="border-b px-3 py-2">
                              54 questions across 2 modules (27 + 27), short passages with one question each, testing comprehension, vocabulary in context and grammar[web:150][web:152][web:154][web:156][web:157].
                            </td>
                            <td className="border-b px-3 py-2">64 minutes (32 + 32)[web:150][web:152][web:153][web:154][web:155][web:157].</td>
                            <td className="border-b px-3 py-2">200–800[web:152][web:154][web:156].</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Math</td>
                            <td className="px-3 py-2">
                              44 questions across 2 modules (22 + 22), about 75% MCQ and 25% student‑produced responses; calculator allowed throughout[web:152][web:153][web:154][web:156].
                            </td>
                            <td className="px-3 py-2">70 minutes (35 + 35)[web:150][web:152][web:153][web:154][web:155][web:157].</td>
                            <td className="px-3 py-2">200–800[web:152][web:154][web:156].</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      The total SAT score is 400–1600 (Reading & Writing + Math). The digital format adapts the difficulty of the second module in each section based on performance in the first module[web:150][web:152][web:155][web:156].
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f5f2ff] px-7 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Results, Scores & Fees
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      SAT scores, reporting & fee
                    </h3>

                    <p className="mt-2 text-xs text-slate-700">
                      SAT scores are usually released within about 2 weeks of the test date, and can be sent electronically to colleges directly from your College Board account. Many universities publish minimum or average SAT ranges for admitted students.
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      SAT exam fee (international)
                    </h4>
                    <div className="mt-1 mb-3 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">Item</th>
                            <th className="border-b px-3 py-2 text-left">Fee (USD)</th>
                            <th className="border-b px-3 py-2 text-left">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">Digital SAT registration (international)</td>
                            <td className="border-b px-3 py-2">≈ $103–$120</td>
                            <td className="border-b px-3 py-2">
                              Amount varies slightly by region; charged in USD and converted by your bank at current rates.
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Late registration / date change</td>
                            <td className="border-b px-3 py-2">≈ $25–$35</td>
                            <td className="border-b px-3 py-2">Exact fee depends on service and timing.</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Additional score reports</td>
                            <td className="px-3 py-2">≈ $12 each</td>
                            <td className="px-3 py-2">A few reports may be free within a deadline; extra reports cost per college.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Fees are set in USD; final cost in local currency depends on exchange rates and bank/card charges, so always check the latest figures on the official registration page.
                    </p>

                    <div className="mt-3 grid gap-3 text-[11px] md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Target score ranges
                        </p>
                        <p className="mt-1 text-slate-800">
                          Many universities consider 1100–1200 acceptable, 1250–1350 strong, and 1400+ competitive for more selective programs. Highly selective US colleges often see admitted ranges of 1450–1550.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Score validity & reporting
                        </p>
                        <p className="mt-1 text-slate-800">
                          SAT scores typically remain valid for several years; many colleges accept scores that are up to 3–5 years old, but check individual policies. You choose which test dates to send using Score Choice, if the college allows.
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      We help you pick a realistic SAT target (for example 1200+, 1350+ or 1450+) and match it with a balanced list of universities.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      FAQs
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      SAT quick FAQs
                    </h3>
                    <div className="mt-3 space-y-2 text-xs text-slate-800">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Is SAT mandatory for all US colleges?</p>
                        <p className="mt-1">
                          No. Some colleges are test‑optional or test‑free, while others still recommend or require SAT scores. Requirements change regularly, so always check each college&apos;s admission page.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. How many times can I take the SAT?</p>
                        <p className="mt-1">
                          There is no official limit; many students take it 1–3 times. It is generally better to plan ahead and aim for your target score in one or two well‑prepared attempts.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Is the Digital SAT easier than the old SAT?</p>
                        <p className="mt-1">
                          The digital test is shorter and adaptive, with shorter passages and a calculator allowed for all Math, which many students find more comfortable. However, colleges treat scores from old and new formats as equivalent.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Can SAT scores give scholarships?</p>
                        <p className="mt-1">
                          Yes. Many universities and some organizations offer merit scholarships or tuition discounts based partly on strong SAT scores combined with school grades and overall profile.
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      In counselling, we discuss whether SAT is necessary for your specific college list and how to balance it with school grades, essays and other application components.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Download Guide
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Download the complete SAT booklet
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      Download a PDF guide that collects SAT overview, dates, updated fees, eligibility, preparation tips, pattern, section‑wise syllabus, scoring and FAQs in one place.
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      Use it as your personal checklist from first enquiry to SAT booking, score sending and final application submissions.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 max-w-xs">
                      <a
                        href="/downloads/SAT_Preparation_Guide_2025.pdf"
                        download="SAT_Preparation_Guide_2025.pdf"
                        className="inline-flex items-center justify-center rounded-full border border-[#110053] bg-[#110053] px-5 py-2 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-[#1b0d7a]"
                      >
                        ⬇ Download SAT Guide PDF
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
