// src/app/services/page.jsx
"use client";

import Link from "next/link";
import Image from "next/image";

export default function Services() {
  return (
    <main className="w-full bg-gradient-to-b from-[#faf9ff] via-[#f4f1ff] to-[#ebe8ff]">
      {/* HERO */}
     {/* HERO SECTION */}
<section className="relative w-full min-h-[550px] flex items-center justify-center overflow-hidden mb-0">
  {/* Background Image */}
  <img
    src="/heroimage/image3.jpg"
    alt="Services banner"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-[#22223b]/60" />

  {/* Center Text */}
  <div className="relative z-10 w-full px-6 lg:px-16 py-20 flex flex-col items-center text-center animate-slideUp">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(30,20,80,0.96)]">
      Our Services
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

      <span className="text-[#a89fff] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">Services</span>
    </nav>
  </div>
</section>


      {/* JOURNEY STRIP */}
      <section className="pb-10 pt-0 mt-12 ">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="rounded-2xl bg-white/90 border border-[#e5e0ff] px-5 py-4 sm:px-6 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm">
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9ca3af] mb-1">
                Your journey with us
              </p>
              <p className="text-sm sm:text-base text-[#4a4560]">
                We guide you through every critical phase: plan, apply, and arrive.
              </p>
            </div>
            <ol className="flex flex-wrap gap-3 text-xs sm:text-sm text-[#4b5563]">
              <li className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full border border-[#8b7ae8] flex items-center justify-center text-[11px] text-[#8b7ae8]">1</span>
                Plan your path
              </li>
              <li className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full border border-[#8b7ae8] flex items-center justify-center text-[11px] text-[#8b7ae8]">2</span>
                Apply with support
              </li>
              <li className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full border border-[#8b7ae8] flex items-center justify-center text-[11px] text-[#8b7ae8]">3</span>
                Arrive ready
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES SECTIONS */}
      {/* 1. Career & Course Planning */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9ca3af] mb-2">
              Phase 1 · Plan
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#110053] mb-3">
              Career & Course Planning
            </h2>
            <p className="text-sm sm:text-base text-[#4a4560] mb-4">
              Personalized sessions to uncover your strengths, clarify your education and immigration goals, and select the right country, course, and intake.
            </p>
            <ul className="space-y-1.5 text-sm text-[#4b5563]">
              <li>• 1:1 career counseling aligned with future work/PR opportunities.</li>
              <li>• Course and major selection based on academics, budget, and destination preferences.</li>
              <li>• Advice on realistic timelines for English tests, applications, and visas.</li>
              <li>• Guidance on long-term options and post-study pathways.</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2 h-64 sm:h-72 lg:h-80 bg-[#f7f5ff] rounded-2xl overflow-hidden shadow-md border border-[#e5e0ff] relative">
            <Image
              src="/services/counseling.jpg"
              alt="Career & Course Counseling"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. University Selection */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="h-64 sm:h-72 lg:h-80 bg-[#f7f5ff] rounded-2xl overflow-hidden shadow-md border border-[#e5e0ff] relative">
            <Image
              src="/services/university.jpg"
              alt="University Selection Help"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9ca3af] mb-2">
              Phase 1 · Plan
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#110053] mb-3">
              University Selection
            </h2>
            <p className="text-sm sm:text-base text-[#4a4560] mb-4">
              Tailored shortlist based on your real profile, budget, city preferences, scholarships, and visa odds—not random Google results.
            </p>
            <ul className="space-y-1.5 text-sm text-[#4b5563]">
              <li>• Realistic profile assessment to filter options and avoid wasted effort.</li>
              <li>• Balanced “safe, match, and reach” list for best chances.</li>
              <li>• Clear explanations of entry requirements, fees, and scholarships.</li>
              <li>• Matched intakes/deadlines for every option.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Applications & Visa */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9ca3af] mb-2">
              Phase 2 · Apply
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#110053] mb-3">
              Applications & Visa Processing
            </h2>
            <p className="text-sm sm:text-base text-[#4a4560] mb-4">
              Complete guidance from SOP drafts to final visa—so you submit strong, mistake-free files and maximize approval chances.
            </p>
            <ul className="space-y-1.5 text-sm text-[#4b5563] mb-4">
              <li>• SOP/personal statement strategy, feedback, and editing.</li>
              <li>• All documentation—recommendation letters, transcripts, translations, forms.</li>
              <li>• Scholarship and financial aid support where available.</li>
              <li>• Full visa checklist, bank/financial review, GTE statements, and interview prep.</li>
            </ul>
          </div>
          <div className="order-1 lg:order-2 h-64 sm:h-72 lg:h-80 bg-[#f7f5ff] rounded-2xl overflow-hidden shadow-md border border-[#e5e0ff] relative">
            <Image
              src="/services/visa.jpg"
              alt="Application and Visa Guidance"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4. Test Preparation */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="h-64 sm:h-72 lg:h-80 bg-[#f7f5ff] rounded-2xl overflow-hidden shadow-md border border-[#e5e0ff] relative">
            <Image
              src="/loved.jpg"
              alt="IELTS and PTE Test Preparation"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9ca3af] mb-2">
              Phase 2 · Apply
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#110053] mb-3">
              Test Preparation: IELTS & PTE
            </h2>
            <p className="text-sm sm:text-base text-[#4a4560] mb-4">
              Small group classes focusing on exactly the skills and strategy you need for the scores your offer and visa require.
            </p>
            <ul className="space-y-1.5 text-sm text-[#4b5563]">
              <li>• Diagnostic test to identify weak areas.</li>
              <li>• Module-by-module lessons, regular mock tests, and personalised feedback.</li>
              <li>• Flexible evening/weekend scheduling.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Pre-departure & Arrival */}
      <section className="py-16 pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9ca3af] mb-2">
              Phase 3 · Arrive
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#110053] mb-3">
              Pre‑departure briefings & Arrival Support
            </h2>
            <p className="text-sm sm:text-base text-[#4a4560] mb-4">
              Everything you need for a smooth landing—step-by-step checklists, briefings, and on-ground support.
            </p>
            <ul className="space-y-1.5 text-sm text-[#4b5563] mb-4">
              <li>• Pre-departure seminar: packing, documents, airport process, and cultural tips.</li>
              <li>• Help arranging accommodation, SIMs, banking, local transport, part-time work rules.</li>
              <li>• On-arrival check-ins and community connections.</li>
              <li>• Support with essential registrations where needed.</li>
            </ul>
            <div className="mt-5">
              <Link
                href="/consultation"
                className="inline-flex items-center justify-center bg-gradient-to-r bg-[#110053]  text-white px-5 py-2.5 rounded-lg font-semibold text-xs sm:text-sm tracking-wide shadow-sm shadow-black/30
                                   hover:shadow-md hover:shadow-black/40
                                   hover:-translate-y-[1px]
                                   transition-all duration-150"
              >
                Ask about pre-departure support
              </Link>
            </div>
          </div>
          <div className="order-1 lg:order-2 h-64 sm:h-72 lg:h-80 bg-[#f7f5ff] rounded-2xl overflow-hidden shadow-md border border-[#e5e0ff] relative">
            <Image
              src="/services/arrival.jpg"
              alt="Pre-departure and Arrival Support"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
