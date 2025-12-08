'use client';

import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="
        relative w-full text-white
        bg-gradient-to-b from-[#262163] via-[#1b154a] to-[#0b061f]
      "
    >
      {/* Wave at the top */}
      <div className="absolute inset-x-0 -top-24 h-28 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#262163"  // match top gradient color
            d="
              M0,192
              C120,176 240,144 360,138
              C480,132 600,152 720,176
              C860,206 980,242 1100,246
              C1220,250 1330,230 1440,200
              L1440,320
              L0,320
              Z
            "
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-16 pt-20 pb-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
          {/* Left: logo + line */}
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#8b7ae8] via-[#a89fff] to-[#6F6597] flex items-center justify-center text-[9px] font-semibold tracking-[0.16em]">
                ET
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                  EducationTreeGlobal
                </p>
                <p className="text-sm sm:text-base font-semibold text-white">
                  Study abroad with clarity and timing.
                </p>
              </div>
            </div>

            <p className="text-xs text-white/50 max-w-sm leading-relaxed">
              Helping students choose the right course, country, and timing with honest, structured guidance.
            </p>
          </div>

          {/* Middle: links */}
          <div className="flex-1 flex flex-col sm:flex-row gap-10 lg:gap-16">
            <div className="min-w-[140px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-3">
                Quick Links
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-[#a89fff] transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-[#a89fff] transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/destinations" className="hover:text-[#a89fff] transition-colors">
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-[#a89fff] transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#a89fff] transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-w-[160px]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-3">
                Services
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/services#career-counseling"
                    className="hover:text-[#a89fff] transition-colors"
                  >
                    Career Counseling
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#university-selection"
                    className="hover:text-[#a89fff] transition-colors"
                  >
                    University Selection
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#course-guidance"
                    className="hover:text-[#a89fff] transition-colors"
                  >
                    Course Guidance
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#visa-processing"
                    className="hover:text-[#a89fff] transition-colors"
                  >
                    Visa Processing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#test-preparation"
                    className="hover:text-[#a89fff] transition-colors"
                  >
                    Test Preparation
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: socials */}
          <div className="flex-1 flex flex-col items-start lg:items-end gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Connect
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex items-center gap-2 hover:text-[#a89fff] transition-colors"
              >
                <span className="h-7 w-7 rounded-full border border-white/20 flex items-center justify-center text-xs">
                  IG
                </span>
                <span>@educationtreeglobal</span>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="inline-flex items-center gap-2 hover:text-[#a89fff] transition-colors"
              >
                <span className="h-7 w-7 rounded-full border border-white/20 flex items-center justify-center text-xs">
                  X
                </span>
                <span>Twitter</span>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="inline-flex items-center gap-2 hover:text-[#a89fff] transition-colors"
              >
                <span className="h-7 w-7 rounded-full border border-white/20 flex items-center justify-center text-xs">
                  in
                </span>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom text only – no straight border line */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/55">
          <p>© {year} EducationTreeGlobal. All rights reserved.</p>
          <p className="sm:text-right">
            Designed for students who want clear options and honest guidance.
          </p>
        </div>
      </div>
    </footer>
  );
}
