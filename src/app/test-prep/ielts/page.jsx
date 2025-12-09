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

export default function IELTSPage() {
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
    alt="IELTS preparation hero"
    className="absolute inset-0 w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-[#22223b]/60" />

 
  <div className="relative z-10 w-full px-6 lg:px-16 py-20 flex flex-col items-center text-center animate-slideUp">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(30,20,80,0.96)]">
      IELTS Test Preparation
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

      <span className="text-[#a89fff] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">IELTS</span>
    </nav>
  </div>
</section>


      
      <section className="mb-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-wrap gap-[1px] rounded-md border border-[#e1d7ff] bg-[#f9f7ff]">
            {[
              { key: "overview", label: "IELTS – OVERVIEW" },
              { key: "dates", label: "DATES & CENTRES" },
              { key: "eligibility", label: "ELIGIBILITY" },
              { key: "preparation", label: "PREPARATION" },
              { key: "syllabus", label: "SYLLABUS" },
              { key: "results", label: "RESULTS & SCORES" },
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
              IELTS Overview & Coaching Guide
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[#110053] sm:text-3xl">
              Flip through the IELTS information booklet
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-[#3e3758] sm:text-base">
              Each tab opens a matching page with clear information, mini tables and coaching support.
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
                          IELTS
                        </h1>
                        <h2 className="max-w-[420px] text-xl font-bold leading-snug tracking-tight text-[#110053] sm:text-2xl">
                          Master Your
                          <br />
                          Target Band Score
                        </h2>
                        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#7a67c1]">
                          Comprehensive Coaching 2025
                        </p>
                      </div>

                      <div className="my-3 grid max-w-md grid-cols-2 gap-3">
                        <div className="rounded-lg border-[3px] border-[#7a67c1] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            Certified Trainers
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            Expert faculty with
                            <br />
                            strong IELTS track record
                          </p>
                        </div>
                        <div className="rounded-lg border-[3px] border-[#d92027] bg-white/90 p-2.5 shadow-lg backdrop-blur-sm">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#d92027]">
                            Structured Practice
                          </p>
                          <p className="text-[11px] font-semibold leading-snug text-[#110053]">
                            Personalised study plans &
                            <br />
                            weekly mock tests
                          </p>
                        </div>
                      </div>

                      <div className="max-w-lg space-y-2.5">
                        <p className="text-[11px] leading-relaxed text-[#110053]/90">
                          Achieve your desired IELTS band with structured coaching, real exam strategies and timed
                          practice for Listening, Reading, Writing and Speaking, recognised by universities and
                          immigration bodies worldwide[web:59][web:60][web:66].
                        </p>
                        <div className="rounded-lg border-[3px] border-[#110053] bg-white/95 p-2.5 shadow-lg">
                          <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#7a67c1]">
                            End-to-End Support
                          </p>
                          <p className="text-[11px] font-medium leading-relaxed text-[#110053]">
                            Test registration assistance • Weekly mock tests • Speaking practice sessions • Score review
                            for university choices • Scholarship and visa documentation guidance.
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
                      IELTS exam dates & centres in Nepal
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      IELTS test dates run almost every week for both paper-based and computer-delivered formats, so
                      you can usually find a suitable slot close to your preferred intake month[web:65][web:77].
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      To book for 2025, you create an IELTS account, select a nearby authorised centre, choose IELTS on
                      Paper or IELTS on Computer and pay the fee online or via bank deposit as per IDP instructions for
                      Nepal[web:65][web:77].
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      IELTS exam centres in Nepal (major cities)
                    </h4>
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-800">
                      <span>• Kathmandu</span>
                      <span>• Pokhara</span>
                      <span>• Chitwan</span>
                      <span>• Biratnagar</span>
                      <span>• Butwal</span>
                      <span>• Birtamod</span>
                      <span>• Banepa</span>
                      <span>• Ghorahi</span>
                      <span>• Hetauda</span>
                      <span>• Itahari</span>
                      <span>• Nepalgunj</span>
                    </div>

                    <div className="mt-4 grid gap-3 text-[11px] md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7f6cff]">
                          Booking window tip
                        </p>
                        <p className="mt-1 text-slate-800">
                          Always keep at least 2–3 weeks between your test date and the last date to submit scores for
                          university, visa or scholarship documents. This buffer covers result release plus any delay in
                          score reporting[web:59][web:63].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7f6cff]">
                          How we help
                        </p>
                        <p className="mt-1 text-slate-800">
                          Our counsellors read the latest test date grids for each centre, compare weekdays vs weekends
                          and advise which city and timing fits your travel, work schedule and application deadlines.
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      You can also combine your IELTS booking with university shortlisting so you choose a date that
                      aligns with offer letter, CAS/COE and visa timelines.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Eligibility
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Who can take the IELTS exam?
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      IELTS is open to all nationalities and does not set any maximum age limit; the test is generally
                      recommended for candidates aged 16 and above with a valid passport as primary ID[web:64][web:67][web:78].
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      There is no minimum educational qualification. Any non-native English speaker planning to study,
                      work or migrate abroad can register and sit for the exam as long as they pay the fee and follow
                      the identity rules of the chosen test centre[web:64][web:67].
                    </p>

                    <div className="mt-3 grid gap-3 text-xs mb-4 md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Basic eligibility checklist
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Non-native English speaker aiming for study, work or migration abroad.</li>
                          <li>Valid passport for registration and on test day (mandatory in Nepal)[web:64][web:67].</li>
                          <li>Age ideally 16+; parental consent may be needed if under 18[web:64][web:73].</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-4 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          IELTS test types
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>IELTS Academic – for UG/PG study and professional registration[web:62].</li>
                          <li>IELTS General Training – for migration, work and training programmes[web:62].</li>
                          <li>IELTS for UKVI – Secure English Language Test approved for UK visas[web:62].</li>
                          <li>IELTS Life Skills – speaking & listening only for specific UK family routes[web:73].</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      Education Tree Global checks your destination country, course level and visa category, then
                      confirms which IELTS version you must take so you do not waste fees on the wrong test type.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Preparation
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      IELTS preparation strategies & our classes
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The exam has four fixed sections Listening, Reading, Writing and Speaking and the format has
                      remained stable for many years, so practising with the right pattern and timing gives an immediate
                      advantage[web:59][web:63][web:66].
                    </p>

                    <div className="mt-3 grid gap-3 text-xs md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Self-study plan
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Start with a full practice test to know your current band.</li>
                          <li>Study official format and sample questions for each module[web:60][web:66].</li>
                          <li>Practise under timed conditions at least 3–4 days per week.</li>
                          <li>Build topic vocabulary for education, work, health, environment and culture.</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Our coaching support
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>Section-wise strategy classes for LRWS with examiner-style feedback.</li>
                          <li>Timed mock tests in real exam pattern with band estimates.</li>
                          <li>Speaking practice with cue cards, follow-up questions and body-language tips.</li>
                          <li>Personalised study plan based on target band and time left before intake.</li>
                        </ul>
                      </div>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      With 6–8 weeks of focused coaching and consistent home practice, many students improve from a mid
                      5.0 range to 6.5–7.0, especially when they follow feedback honestly.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Syllabus
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      IELTS test pattern & syllabus
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      The test lasts around 2 hours 45 minutes and has four sections. Listening and Speaking remain the
                      same for Academic and General Training, while Reading and Writing differ in the type of texts and
                      tasks you see[web:59][web:63][web:66].
                    </p>

                    <div className="mt-3 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">Section</th>
                            <th className="border-b px-3 py-2 text-left">Time</th>
                            <th className="border-b px-3 py-2 text-left">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">Listening</td>
                            <td className="border-b px-3 py-2">≈ 30 min</td>
                            <td className="border-b px-3 py-2">
                              4 recordings, 40 questions; accents from different English-speaking countries with
                              multiple question types such as MCQ, matching and completion[web:63][web:72].
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Reading</td>
                            <td className="border-b px-3 py-2">60 min</td>
                            <td className="border-b px-3 py-2">
                              3 passages, 40 questions; Academic uses longer academic texts, General Training uses
                              everyday and workplace texts like notices, adverts and articles[web:63][web:66].
                            </td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">Writing</td>
                            <td className="border-b px-3 py-2">60 min</td>
                            <td className="border-b px-3 py-2">
                              Task 1: graph/report or process (Academic) or letter (General). Task 2: opinion or
                              discussion essay of at least 250 words in both versions[web:66].
                            </td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">Speaking</td>
                            <td className="px-3 py-2">11–14 min</td>
                            <td className="px-3 py-2">
                              Face-to-face interview in 3 parts: introduction, cue-card/long turn and follow-up
                              questions on more abstract topics[web:59][web:66].
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      In class, each task type is explained with examples, band descriptors and do&apos;s/don&apos;ts so you
                      walk into the test knowing exactly what the examiner expects.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f5f2ff] px-7 py-7 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Results, Scores & Fees
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      IELTS bands, updated fees in Nepal & score comparison
                    </h3>

                    <p className="mt-2 text-xs text-slate-700">
                      Each section Listening, Reading, Writing and Speaking is scored on a band scale from 1 (non-user)
                      to 9 (expert user). The overall band score is the average of the four, rounded to the nearest
                      half band (0.0 or 0.5)[web:59][web:66][web:76].
                    </p>

                    <h4 className="mt-3 text-[11px] font-semibold text-slate-900">
                      IELTS exam fee in Nepal (2025)
                    </h4>
                    <div className="mt-1 mb-3 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">Test Type</th>
                            <th className="border-b px-3 py-2 text-left">Fee (NPR)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">IELTS on Paper (Academic/General)</td>
                            <td className="border-b px-3 py-2">36,200</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">IELTS on Computer (Academic/General)</td>
                            <td className="border-b px-3 py-2">33,000</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">IELTS for UKVI (Paper)</td>
                            <td className="border-b px-3 py-2">34,000</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">IELTS for UKVI (Computer)</td>
                            <td className="border-b px-3 py-2">28,800</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">IELTS Life Skills (A1/B1)</td>
                            <td className="px-3 py-2">24,000</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      Note: These fees match the latest official update effective from mid‑2025 for Nepal; always check
                      the IDP IELTS Nepal page for any fresh changes before booking[web:65][web:71][web:74][web:77].
                    </p>

                    <div className="mt-3 grid gap-3 text-[11px] md:grid-cols-2">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Cancellation & refund (typical rules)
                        </p>
                        <ul className="mt-1 ml-4 list-disc space-y-1 text-slate-800">
                          <li>More than 14 days before the test – partial refund (often around 75%).</li>
                          <li>Within 14 days – reduced refund percentage, subject to admin charges.</li>
                          <li>Within 2 days or on test day – usually no refund unless valid medical reason[web:77].</li>
                        </ul>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7f6cff]">
                          Rescheduling & one-skill retake
                        </p>
                        <p className="mt-1 text-slate-800">
                          Date change is usually allowed if requested at least 5 weeks before your test date, and the
                          new date must fall within 3 months of the original booking; an admin fee applies[web:77]. For
                          computer-based IELTS, some centres also offer One Skill Retake, where you can repeat only one
                          module (LRWS) once per test booking by paying an extra fee[web:71][web:49].
                        </p>
                      </div>
                    </div>

                    <h4 className="mt-4 text-[11px] font-semibold text-slate-900">
                      TOEFL vs IELTS score comparison (quick view)
                    </h4>
                    <div className="mt-1 overflow-hidden rounded-lg bg-white text-[11px] text-slate-800 shadow-sm">
                      <table className="w-full border-collapse">
                        <thead className="bg-[#ece7ff] text-[10px] uppercase tracking-[0.12em] text-[#4b3f91]">
                          <tr>
                            <th className="border-b px-3 py-2 text-left">TOEFL iBT</th>
                            <th className="border-b px-3 py-2 text-left">Approx. IELTS band</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border-b px-3 py-2">0–31</td>
                            <td className="border-b px-3 py-2">0–4</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">32–34</td>
                            <td className="border-b px-3 py-2">4.5</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">35–45</td>
                            <td className="border-b px-3 py-2">5.0</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">46–59</td>
                            <td className="border-b px-3 py-2">5.5</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">60–78</td>
                            <td className="border-b px-3 py-2">6.0</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">79–93</td>
                            <td className="border-b px-3 py-2">6.5</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">94–101</td>
                            <td className="border-b px-3 py-2">7.0</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">102–109</td>
                            <td className="border-b px-3 py-2">7.5</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">110–114</td>
                            <td className="border-b px-3 py-2">8.0</td>
                          </tr>
                          <tr>
                            <td className="border-b px-3 py-2">115–117</td>
                            <td className="border-b px-3 py-2">8.5</td>
                          </tr>
                          <tr>
                            <td className="px-3 py-2">118–120</td>
                            <td className="px-3 py-2">9.0</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      Our counsellors explain which test is better recognised in your target country and whether your
                      current English profile is better suited to IELTS or TOEFL.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      FAQs
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      IELTS quick FAQs
                    </h3>
                    <div className="mt-3 space-y-2 text-xs text-slate-800">
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Which is easier – IELTS or TOEFL?</p>
                        <p className="mt-1">
                          Many students find the IELTS style more familiar because tasks are shorter and the speaking
                          test is face to face, whereas TOEFL is fully computer-based and can feel more intense,
                          especially for integrated tasks.
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Which test is more widely accepted?</p>
                        <p className="mt-1">
                          IELTS is particularly popular for the UK, Australia, New Zealand and many European
                          institutions, while TOEFL is more traditional for US universities, though both tests are now
                          widely accepted across most English-speaking destinations[web:76].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. How many times can I take IELTS?</p>
                        <p className="mt-1">
                          There is no official limit on the number of attempts; you can re-book the test whenever you
                          feel prepared, as long as seats are available and you pay the fee again[web:76].
                        </p>
                      </div>
                      <div className="rounded-lg bg-white p-3 shadow-sm">
                        <p className="font-semibold">Q. Is scholarship possible with IELTS?</p>
                        <p className="mt-1">
                          Many universities consider strong IELTS scores along with academic grades when awarding
                          scholarships, tuition discounts or international student bursaries, especially in the UK,
                          Europe, Australia and Canada[web:76].
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-[11px] leading-relaxed text-slate-700">
                      For queries about re-marking (Enquiry on Results), special needs arrangements or country-specific
                      score requirements, our team can guide you in a one-to-one counselling session.
                    </p>
                  </div>
                </BookPage>

                <BookPage>
                  <div className="flex h-full w-full flex-col bg-[#f4f1ff] px-7 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[#7f6cff]">
                      Download Guide
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Download the complete IELTS booklet
                    </h3>
                    <p className="mt-2 text-xs text-slate-700">
                      Download a PDF guide that collects overview, dates, latest fees in Nepal, eligibility, preparation
                      tips, syllabus breakdown, score explanation and FAQs in one organised booklet.
                    </p>
                    <p className="mt-1 text-xs text-slate-700">
                      Use it as your personal checklist from first enquiry to test booking, result planning and final
                      visa documentation.
                    </p>

                    <div className="mt-4 flex flex-col gap-2 max-w-xs">
                      <a
                        href="/downloads/IELTS_Preparation_Guide__1_.pdf"
                        download="IELTS_Preparation_Guide__1_.pdf"
                        className="inline-flex items-center justify-center rounded-full border border-[#110053] bg-[#110053] px-5 py-2 text-xs font-medium text-slate-50 shadow-sm transition hover:bg-[#1b0d7a]"
                      >
                        ⬇ Download IELTS Guide PDF
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
