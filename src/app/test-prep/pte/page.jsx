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

export default function PTEPage() {
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
    alt="PTE preparation hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-[#22223b]/60" />

  <div className="relative z-10 w-full px-6 lg:px-16 py-20 flex flex-col items-center text-center animate-slideUp">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(30,20,80,0.96)]">
      PTE Test Preparation
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

      <span className="text-[#a89fff] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">PTE</span>
    </nav>
  </div>
</section>


<section className="mb-8">
  <div className="mx-auto max-w-5xl px-0"> 
    <div className="flex w-full flex-wrap gap-[1px] rounded-md border border-[#e1d7ff] bg-[#f9f7ff]">
      {[
        { key: "overview", label: "PTE – OVERVIEW" },
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
            className={`px-4 py-2 text-[11px] font-semibold tracking-[0.13em] uppercase transition-colors ${
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
              PTE Overview & Coaching Guide
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#110053] sm:text-3xl">
              Flip through the PTE information booklet
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[#3e3758] sm:text-base">
              Each tab opens a matching page with clear PTE information, task lists and coaching support.
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
                          PTE
                        </h1>
                        <h2 className="max-w-[420px] text-xl font-bold leading-snug tracking-tight text-[#110053] sm:text-2xl">
                          Fast, computer-based English test
                          <br />
                          for study, work & migration
                        </h2>
                        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a67c1]">
                          PTE Academic & PTE Core – 2025
                        </p>
                      </div>

                      <div className="my-3 grid max-w-md grid-cols-2 gap-3">
                        <div className="rounded-lg border-[3px] border-[#7a67c1] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            Computer-based & AI scored
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            Fully computer-delivered exam
                            <br />
                            scored on a 10–90 scale[web:90][web:94].
                          </p>
                        </div>
                        <div className="rounded-lg border-[3px] border-[#d92027] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d92027]">
                            Fast results
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            Results typically within
                            <br />
                            1–2 business days[web:94][web:103].
                          </p>
                        </div>
                      </div>

                      <div className="max-w-lg space-y-2.5">
                        <p className="text-[11px] leading-relaxed text-[#110053]/90">
                          PTE Academic and PTE Core are accepted by thousands of universities and by governments for
                          student visas, skilled migration and work routes in the UK, Australia, New Zealand, Canada and
                          more[web:94][web:103].
                        </p>
                        <div className="rounded-lg border-[3px] border-[#110053] bg-white/95 p-2.5 shadow-lg">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            What we focus on
                          </p>
                          <p className="text-[11px] font-medium leading-relaxed text-[#110053]">
                            Module-wise strategies, task-by-task techniques, realistic mock tests, AI-style feedback and
                            score planning for your target course and visa.
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
                      PTE exam dates & centres in Nepal
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      PTE test dates run frequently across the year as computer-based sessions, and you can usually
                      find weekday and weekend slots in major cities like Kathmandu and Pokhara[web:95][web:105].
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      You register through a myPTE account, select PTE Academic or PTE Core, choose your preferred test
                      centre and available date, and pay the fee online in USD using an international card or other
                      supported method[web:94][web:108].
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      PTE test centres in Nepal (common locations)
                    </h4>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-800">
                      <span>• Kathmandu</span>
                      <span>• Pokhara</span>
                      <span>• Chitwan</span>
                      <span>• Biratnagar</span>
                      <span>• Butwal</span>
                      <span>• Itahari</span>
                      <span>• Birtamod</span>
                      <span>• Nepalgunj</span>
                    </div>

                    <div className="mt-4 grid gap-3 text-[11px] md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7f6cff]">
                          Booking timeline tip
                        </p>
                        <p className="mt-1 text-slate-800">
                          Because PTE results come fast, many students book closer to deadlines. Still keep at least
                          1–2 weeks buffer for score reporting and any re-test if you want to improve your score[web:94][web:103].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7f6cff]">
                          Our support
                        </p>
                        <p className="mt-1 text-slate-800">
                          We help you compare PTE vs IELTS dates, choose the best city and time slot, and coordinate the
                          test with university deadlines, financial documentation and visa lodgement.
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      If your nearest city is full, we can help you explore other centres or adjust your intake plan so
                      you still meet offer and visa timelines comfortably.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Eligibility
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Who can take the PTE exam?
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      PTE has straightforward rules: there is no upper age limit, but you must meet the minimum age and
                      identity requirements to sit for the test[web:98][web:101][web:104][web:109].
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      For PTE Academic and PTE Core, the minimum age is 16 years; candidates between 16 and 17 must
                      submit parental consent. A valid passport is the main identity document for test takers in
                      Nepal[web:98][web:104].
                    </p>

                    <div className="mt-3 grid gap-3 text-xs mb-4 md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Basic eligibility checklist
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Age 16+ at the time of test booking[web:98][web:104].</li>
                          <li>Parental consent if you are under 18 years old[web:98][web:101].</li>
                          <li>Valid passport as primary ID in Nepal[web:98][web:104].</li>
                          <li>Intent to use PTE for study, work or migration in a country that accepts it.</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          PTE test options
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>PTE Academic – university and college admissions abroad[web:94].</li>
                          <li>PTE Core – skilled migration and work routes for options like Canada[web:94].</li>
                          <li>PTE Academic UKVI – UK student visas that need a SELT-listed test[web:94][web:108].</li>
                          <li>PTE Home (A1/A2/B1) – some family and settlement visa categories for the UK[web:94].</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      Our counsellors confirm whether your chosen college or visa category accepts PTE and then guide
                      you on which PTE version and score you should target.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Preparation
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      PTE preparation strategies & our classes
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      PTE is fully computer-based and task-oriented, with integrated skills such as speaking while
                      reading or listening. A smart preparation plan targets high-weightage question types first and
                      then polishes overall language skills[web:90][web:91][web:92][web:97][web:103].
                    </p>

                    <div className="mt-3 grid gap-3 text-xs md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Self-study plan
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Attempt a full PTE mock to know your starting score on the 10–90 scale.</li>
                          <li>Understand timing and scoring for each task (Read Aloud, Repeat Sentence, etc.)[web:90][web:91].</li>
                          <li>Practise speaking into a microphone daily to build fluency and pronunciation comfort.</li>
                          <li>Use official-style practice questions and review AI feedback for accuracy and fluency.</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Our coaching support
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Task-wise strategy classes for all major PTE question types[web:91][web:97].</li>
                          <li>Computer-lab mock tests with detailed score reports by skill.</li>
                          <li>Speaking labs that simulate the real mic/headset environment.</li>
                          <li>Score planning for 50–58, 58–65 or 65–79+ based on your course and visa goal[web:98].</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      With 4–8 weeks of guided coaching and consistent home practice, many students move from the low
                      40s to 55–65, and with a longer plan can target 70+ for competitive programs.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Pattern & Tasks
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      PTE test pattern & main tasks
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The updated PTE Academic test runs for about 2 hours–2 hours 15 minutes and is divided into three
                      parts: Speaking & Writing, Reading and Listening, with integrated tasks in each section[web:90][web:91][web:94][web:97][web:103].
                    </p>

                    <div className="mt-3 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">Part</th>
                            <th className="border-b px-3 py-2 text-left">Time (approx.)</th>
                            <th className="border-b px-3 py-2 text-left">Main tasks</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">
                              Speaking & Writing
                              <br />
                              (Part 1)
                            </td>
                            <td className="border-b px-3 py-2">54–67 min</td>
                            <td className="border-b px-3 py-2">
                              Personal Introduction, Read Aloud, Repeat Sentence, Describe Image, Retell Lecture, Answer
                              Short Question, Summarize Group Discussion, Respond to a Situation, Summarize Written Text
                              and Essay Writing (200–300 words)[web:90][web:91][web:100].
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">
                              Reading
                              <br />
                              (Part 2)
                            </td>
                            <td className="border-b px-3 py-2">29–30 min</td>
                            <td className="border-b px-3 py-2">
                              Multiple-choice multiple answers, Re-order Paragraphs, Fill in the Blanks (Drag & Drop and
                              Dropdown), Multiple-choice single answer[web:91][web:92][web:93].
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">
                              Listening
                              <br />
                              (Part 3)
                            </td>
                            <td className="px-3 py-2">30–43 min</td>
                            <td className="px-3 py-2">
                              Summarize Spoken Text, Multiple-choice multiple answers, Fill in the Blanks (type), Highlight
                              Correct Summary, Select Missing Word, Highlight Incorrect Word, Write from Dictation[web:91][web:94][web:97].
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      In class, we show you which tasks carry more marks for each skill so you can prioritise your time
                      and effort smartly when preparing.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f5f2ff] px-7 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Results, Scores & Fees
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      PTE scoring, results & updated fee in Nepal
                    </h3>

                    <p className="mt-2 text-xs text-slate-700">
                      PTE scores range from 10 to 90, with separate scores for Speaking, Writing, Reading and Listening,
                      plus an overall score. Most universities ask for 50–65, while more competitive courses and visa
                      routes may want 58–65 or 65–79+ depending on the destination[web:94][web:97][web:98][web:109].
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      PTE exam fee in Nepal (2025)
                    </h4>
                    <div className="mt-1 mb-3 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">Test Type</th>
                            <th className="border-b px-3 py-2 text-left">Fee (USD)</th>
                            <th className="border-b px-3 py-2 text-left">Approx. fee (NPR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">PTE Academic / PTE Core</td>
                            <td className="border-b px-3 py-2">$205</td>
                            <td className="border-b px-3 py-2">
                              ≈ NPR 27,000–28,500 depending on exchange rate and bank charges[web:96][web:99][web:105][web:102].
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">PTE Academic UKVI</td>
                            <td className="border-b px-3 py-2">$205</td>
                            <td className="border-b px-3 py-2">
                              Similar NPR range as PTE Academic/Core, converted on payment day[web:96][web:105].
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">PTE Home (A1/A2/B1)</td>
                            <td className="px-3 py-2">$170</td>
                            <td className="px-3 py-2">≈ NPR 23,000+ depending on rate[web:96][web:99].</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      PTE fees are charged in USD internationally, so the exact Nepali amount can vary slightly each
                      time you book due to currency conversion and card or bank fees[web:96][web:108].
                    </p>

                    <div className="mt-3 grid gap-3 text-[11px] md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Cancellation & rescheduling
                        </p>
                        <p className="mt-1 text-slate-800">
                          Through your myPTE account, you can usually reschedule or cancel your booking. Charges depend
                          on how early you change; closer dates can attract higher fees or restrictions, so always read
                          Pearson&apos;s latest policy before booking[web:96][web:108].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Score reports & validity
                        </p>
                        <p className="mt-1 text-slate-800">
                          Scores are generally released within 1–2 days and can be sent electronically to universities
                          from your myPTE account. Most institutions accept PTE Academic scores for up to 2 years, but
                          always confirm with the specific university or immigration authority[web:94][web:103].
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      During counselling, we map your PTE target (for example 50+, 58+, 65+ or 79+) to your preferred
                      countries, courses and visa rules so you have a clear score goal before you book.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      FAQs
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      PTE quick FAQs
                    </h3>
                    <div className="mt-3 space-y-2 text-xs text-slate-800">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Is PTE easier than IELTS?</p>
                        <p className="mt-1">
                          Some students find PTE easier because everything is computer-based and there is no in-person
                          interview, while others prefer IELTS because it feels more traditional. The best test depends
                          on whether you are comfortable speaking into a microphone and reading from a screen.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Where is PTE accepted?</p>
                        <p className="mt-1">
                          PTE Academic and PTE Core are accepted by many universities in Australia, New Zealand, the UK,
                          Canada, Ireland and Europe, and by governments such as Australia and New Zealand for several
                          visa categories[web:94][web:103].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. How many times can I take PTE?</p>
                        <p className="mt-1">
                          There is no fixed cap on attempts, but you must wait for your score report before booking
                          again and can only hold one active booking at a time in the system[web:98][web:101].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. What is a good PTE score?</p>
                        <p className="mt-1">
                          Many universities accept scores around 50–58, stronger programs often want 58–65, and highly
                          competitive or specialised options can look for 65–79+. Visa rules may set separate minimums,
                          especially for migration applications[web:94][web:98][web:109].
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      In a one-to-one session, our counsellors can help you choose between PTE and IELTS, plan your
                      preparation and decide how many attempts to budget for realistically.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Download Guide
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Download the complete PTE booklet
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      Download a PDF guide that collects PTE overview, dates, updated fees in Nepal, eligibility,
                      preparation tips, pattern, task list, scoring and FAQs in one handy booklet.
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      Use it as your personal checklist from first enquiry to PTE booking, score reporting and final
                      visa file preparation.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 max-w-xs">
                      <a
                        href="/downloads/PTE_Preparation_Guide_2025.pdf"
                        download="PTE_Preparation_Guide_2025.pdf"
                        className="inline-flex items-center justify-center rounded-full border border-[#110053] bg-[#110053] px-5 py-2 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-[#1b0d7a]"
                      >
                        ⬇ Download PTE Guide PDF
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
