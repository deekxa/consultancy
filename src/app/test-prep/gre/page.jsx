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

export default function GREPage() {
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
    alt="GRE preparation hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

 
  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-[#22223b]/60" />

 
  <div className="relative z-10 w-full px-6 lg:px-16 py-20 flex flex-col items-center text-center animate-slideUp">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(30,20,80,0.96)]">
      GRE General Test Preparation
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

      <span className="text-[#a89fff] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">GRE</span>
    </nav>
  </div>
</section>


      
      <section className="mb-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex w-full flex-wrap gap-[1px] rounded-md border border-[#e1d7ff] bg-[#f9f7ff]">
            {[
              { key: "overview", label: "GRE – OVERVIEW" },
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
              GRE Overview & Coaching Guide
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#110053] sm:text-3xl">
              Flip through the GRE information booklet
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[#3e3758] sm:text-base">
              Each tab opens a matching page with clear GRE information, section details and coaching support.
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
                          GRE
                        </h1>
                        <h2 className="max-w-[420px] text-xl font-bold leading-snug tracking-tight text-[#110053] sm:text-2xl">
                          Graduate Record Examination
                          <br />
                          for Master&apos;s & MBA abroad
                        </h2>
                        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a67c1]">
                          New 2-hour GRE General Test – 2025
                        </p>
                      </div>

                      <div className="my-3 grid max-w-md grid-cols-2 gap-3">
                        <div className="rounded-lg border-[3px] border-[#7a67c1] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            Shorter 2-hour format
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            1 Analytical Writing task,
                            <br />
                            2 Verbal & 2 Quant sections[web:130][web:134].
                          </p>
                        </div>
                        <div className="rounded-lg border-[3px] border-[#d92027] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d92027]">
                            Global acceptance
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            Accepted by thousands of
                            <br />
                            grad & business schools[web:140][web:137].
                          </p>
                        </div>
                      </div>

                      <div className="max-w-lg space-y-2.5">
                        <p className="text-[11px] leading-relaxed text-[#110053]/90">
                          The GRE General Test is used for admission to master&apos;s, MBA and some PhD programs in the US, Canada, Europe and other destinations, measuring Verbal Reasoning, Quantitative Reasoning and Analytical Writing skills[web:130][web:140][web:137].
                        </p>
                        <div className="rounded-lg border-[3px] border-[#110053] bg-white/95 p-2.5 shadow-lg">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            What we focus on
                          </p>
                          <p className="text-[11px] font-medium leading-relaxed text-[#110053]">
                            Concept building in Quant, vocabulary and reading strategies for Verbal, essay writing practice, full-length mocks and profile-based target score planning.
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
                      GRE test dates & centres in Nepal
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The GRE General Test is offered year‑round at ETS authorized test centres in Nepal, usually with multiple dates each month in Kathmandu and selected other cities[web:139][web:136].
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      You create an ETS account, choose the GRE General Test, select your preferred city, centre and date, then pay the fee in USD by card or other accepted methods before confirmation[web:145][web:148].
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      GRE centres in Nepal (common locations)
                    </h4>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-800">
                      <span>• Kathmandu (multiple centres)</span>
                      <span>• Lalitpur</span>
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
                          Target booking your GRE at least 1.5–2 months before university deadlines so you have time for a retake if needed and for scores to reach all your shortlisted institutions[web:134][web:137].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7f6cff]">
                          How we help
                        </p>
                        <p className="mt-1 text-slate-800">
                          We help you align GRE dates with application rounds, identify ideal centres and plan backward from your target intake to avoid last‑minute pressure.
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      If preferred test centres are full, we suggest alternative dates or nearby locations and adjust your university list and timelines accordingly.
                    </p>
                  </div>
                </BookPage>

           
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Eligibility
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Who can take the GRE General Test?
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      ETS does not specify any official age or qualification limit for the GRE, so technically anyone can take the test[web:135][web:138][web:141][web:144].
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      In practice, most test takers are in the final year of a bachelor&apos;s degree or have already graduated, since GRE scores are used for admission to master&apos;s, MBA and PhD programs[web:135][web:144].
                    </p>

                    <div className="mt-3 grid gap-3 text-xs mb-4 md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Basic eligibility checklist
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>No official minimum or maximum age set by ETS[web:135][web:138][web:141][web:147].</li>
                          <li>Valid passport as primary ID for international candidates[web:135][web:138][web:144].</li>
                          <li>Ideally in final year of a bachelor&apos;s degree or already graduated.</li>
                          <li>Planning to apply for MS, MBA, MA, MEng or PhD where GRE is accepted.</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Attempts & retakes
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>You can take the GRE up to 5 times in a rolling 12‑month period[web:141].</li>
                          <li>There must be at least 21 days between two test dates[web:141].</li>
                          <li>You can choose which scores to send using ETS ScoreSelect, depending on university policy.</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      Our counsellors first confirm if your target universities require GRE or consider it optional, then help you decide your ideal test window.
                    </p>
                  </div>
                </BookPage>

                
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Preparation
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      GRE preparation strategies & our classes
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The shorter GRE General Test still demands strong reasoning skills, vocabulary and quantitative concepts; good preparation balances concept learning with practice under the new timing[web:130][web:132][web:134][web:137][web:149].
                    </p>

                    <div className="mt-3 grid gap-3 text-xs md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Self-study plan
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Take a diagnostic test to understand your starting scaled score (260–340 overall)[web:137].</li>
                          <li>Revise arithmetic, algebra, geometry and data analysis basics for Quant.</li>
                          <li>Learn high‑frequency GRE vocabulary and practice Text Completion and Sentence Equivalence daily[web:132][web:137].</li>
                          <li>Write sample Issue essays and review official scoring samples to understand the 0–6 AWA scale[web:133][web:137].</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Our coaching support
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Concept classes for Quant and Verbal with shortcuts and test strategies.</li>
                          <li>Section‑wise and full‑length mock tests in the new 2‑hour pattern[web:130][web:134].</li>
                          <li>Detailed analysis to identify weak topics and question types.</li>
                          <li>Personalized score plan to move from 290→305, 300→315 or 310→325+ depending on your target schools[web:147].</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      With 8–12 weeks of focused prep, many students can push their scores by 10–20 points, especially if they combine concept revision with realistic mocks and feedback.
                    </p>
                  </div>
                </BookPage>

                
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Pattern & Tasks
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      GRE test pattern & main sections
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The new GRE General Test (from Sept 2023) is about 1 hour 58 minutes long, with one Analytical Writing task, two Verbal sections and two Quant sections, totalling about 55 scored questions[web:130][web:132][web:133][web:134][web:137][web:149].
                    </p>

                    <div className="mt-3 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">Section</th>
                            <th className="border-b px-3 py-2 text-left">Questions</th>
                            <th className="border-b px-3 py-2 text-left">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">Analytical Writing</td>
                            <td className="border-b px-3 py-2">1 &quot;Analyze an Issue&quot; essay</td>
                            <td className="border-b px-3 py-2">30 minutes[web:130][web:134].</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Verbal Reasoning – Section 1 & 2</td>
                            <td className="border-b px-3 py-2">
                              Total around 27 questions across 2 sections (Text Completion, Sentence Equivalence, Reading Comprehension)[web:132][web:133][web:149].
                            </td>
                            <td className="border-b px-3 py-2">About 41 minutes combined[web:133].</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Quantitative Reasoning – Section 1 & 2</td>
                            <td className="px-3 py-2">
                              Total around 27 questions across 2 sections (Problem Solving, Quant Comparison, Data Interpretation)[web:130][web:133][web:149].
                            </td>
                            <td className="px-3 py-2">About 47 minutes combined[web:133][web:134].</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      Scores for Verbal and Quant range from 130–170 each, in 1‑point increments, while Analytical Writing is scored 0–6 in half‑point steps, giving a combined GRE score range of 260–340 plus AWA[web:137][web:149].
                    </p>
                  </div>
                </BookPage>

               
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f5f2ff] px-7 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Results, Scores & Fees
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      GRE scores, reporting & fees in Nepal
                    </h3>

                    <p className="mt-2 text-xs text-slate-700">
                      Unofficial Verbal and Quant scores are shown on screen immediately after the test, while official scores (including AWA) are available in your ETS account within about 8–10 days and can be sent to universities[web:130][web:148].
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      GRE exam fee in Nepal (2025)
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
                            <td className="border-b px-3 py-2">GRE General Test registration</td>
                            <td className="border-b px-3 py-2">$220</td>
                            <td className="border-b px-3 py-2">
                              ≈ NPR 33,000 including local bank charges[web:136][web:139][web:148].
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Late registration</td>
                            <td className="border-b px-3 py-2">$25</td>
                            <td className="border-b px-3 py-2">≈ NPR 3,000[web:136][web:148].</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Rescheduling / standby etc.</td>
                            <td className="border-b px-3 py-2">$25–$60</td>
                            <td className="border-b px-3 py-2">
                              ≈ NPR 3,000–8,000 depending on service[web:136][web:148][web:145][web:142].
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">GRE Subject Test (if needed)</td>
                            <td className="px-3 py-2">$150</td>
                            <td className="px-3 py-2">≈ NPR 22,000[web:136][web:148].</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      GRE fees are set by ETS in USD; local currency amounts vary with exchange rate and bank/agent charges, so always check current figures when registering[web:136][web:148][web:145][web:142].
                    </p>

                    <div className="mt-3 grid gap-3 text-[11px] md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Score range & targets
                        </p>
                        <p className="mt-1 text-slate-800">
                          Typical target ranges are 300+, 310+, or 320+ depending on program selectivity. Top engineering and analytics programs may look for 320–330 with strong Quant scores, while many good universities accept 300–310[web:137][web:147][web:149].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Score reporting & validity
                        </p>
                        <p className="mt-1 text-slate-800">
                          GRE scores are generally valid for 5 years, giving flexibility to apply across multiple admission cycles. You can send four free score reports on test day and additional reports later for an extra fee[web:148][web:137].
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      We help you decide the right GRE target for your profile and shortlist universities where that score range keeps you competitive.
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
                      GRE quick FAQs
                    </h3>
                    <div className="mt-3 space-y-2 text-xs text-slate-800">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Is GRE mandatory for all master&apos;s programs?</p>
                        <p className="mt-1">
                          No. Some universities and programs have made GRE optional or waived it, while others still require competitive scores. Requirements vary by country, university and course, so always check official program pages.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. How many times can I take the GRE?</p>
                        <p className="mt-1">
                          You can take the GRE up to five times within any 12‑month period, with at least 21 days between attempts[web:141].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. What is a good GRE score?</p>
                        <p className="mt-1">
                          For many solid universities, 300–310 is competitive; for top 100 programs 310–320 is common; and for highly selective schools 320+ with strong Quant and Verbal is often expected, alongside good GPA and profile[web:137][web:147][web:149].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. How long should I prepare for GRE?</p>
                        <p className="mt-1">
                          Most students need 2–3 months of regular study to reach their target range, though some may require more time depending on current level and schedule[web:132][web:134][web:137].
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      In one‑to‑one counselling, we help you decide if GRE adds value to your profile and how to plan prep around your college and work commitments.
                    </p>
                  </div>
                </BookPage>

               
                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Download Guide
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Download the complete GRE booklet
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      Download a PDF guide that collects GRE overview, dates, updated fees in Nepal, eligibility, preparation tips, pattern, section‑wise syllabus, scoring and FAQs in one place.
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      Use it as your personal checklist from first enquiry to GRE booking, score reporting and university applications.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 max-w-xs">
                      <a
                        href="/downloads/GRE_Preparation_Guide_2025.pdf"
                        download="GRE_Preparation_Guide_2025.pdf"
                        className="inline-flex items-center justify-center rounded-full border border-[#110053] bg-[#110053] px-5 py-2 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-[#1b0d7a]"
                      >
                        ⬇ Download GRE Guide PDF
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
