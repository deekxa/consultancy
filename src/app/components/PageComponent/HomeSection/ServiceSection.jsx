// components/ServicesSectionCombined.jsx
"use client";

import Image from "next/image";

const tileServices = [
  {
    key: "plan",
    title: "Career & Course Planning",
    subtitle:
      "Clarify your goals and choose the right country, course and path.",
    cta: "Explore planning",
    image: "/services/counseling.jpg",
  },
  {
    key: "universities",
    title: "University Selection",
    subtitle:
      "Shortlist universities that fit your budget, profile and intake timeline.",
    cta: "View universities",
    image: "/services/university.jpg",
  },
  {
    key: "applications",
    title: "Applications & Visa",
    subtitle:
      "Documentation, test prep, scholarships and visa processing in one place.",
    cta: "See process",
    image: "/services/visa.jpg",
  },
  {
    key: "arrival",
    title: "Pre‑departure & Arrival",
    subtitle: "Checklists and briefings to help you feel ready from day one.",
    cta: "What’s included",
    image: "/services/arrival.jpg",
  },
];

export default function ServicesSectionCombined() {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#EBE8FF]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Centered header */}
        <div className="mb-14 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#110053] leading-[1.1] tracking-tight mb-4">
            End‑to‑end support
            <span className="block mt-1 text-[0.9em] font-semibold text-[#7a68d7]">
              for your study abroad journey
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#4a4560]">
            A focused set of services that guide you from first counseling call
            to landing in your new country.
          </p>
        </div>

        {/* Layout: left journey panel + right tiles */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Journey panel (same as before) */}
          <aside className="lg:w-1/3 bg-white/90 rounded-2xl border border-[#e5e0ff] p-6 shadow-sm backdrop-blur-sm h-max lg:sticky lg:top-24">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9ca3af] mb-3">
              Your journey
            </p>
            <h3 className="text-lg sm:text-xl font-semibold text-[#110053] mb-3">
              Plan, apply and arrive with confidence
            </h3>
            <p className="text-sm text-[#4a4560] mb-5">
              Understand how each service fits into your roadmap so you always
              know what comes next.
            </p>

            <ol className="space-y-3 text-sm text-[#4b5563]">
              <li className="flex gap-3 items-start">
                <span className="mt-0.5 h-5 w-5 rounded-full border border-[#8b7ae8] flex items-center justify-center text-[11px] text-[#8b7ae8]">
                  1
                </span>
                <div>
                  <p className="font-semibold text-[#110053] mb-0.5">
                    Plan your path
                  </p>
                  <p className="text-xs text-[#6b7280]">
                    Career counseling, course guidance and university
                    shortlisting.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-0.5 h-5 w-5 rounded-full border border-[#8b7ae8] flex items-center justify-center text-[11px] text-[#8b7ae8]">
                  2
                </span>
                <div>
                  <p className="font-semibold text-[#110053] mb-0.5">
                    Apply with support
                  </p>
                  <p className="text-xs text-[#6b7280]">
                    Documentation, test preparation, scholarships and visas.
                  </p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-0.5 h-5 w-5 rounded-full border border-[#8b7ae8] flex items-center justify-center text-[11px] text-[#8b7ae8]">
                  3
                </span>
                <div>
                  <p className="font-semibold text-[#110053] mb-0.5">
                    Arrive ready
                  </p>
                  <p className="text-xs text-[#6b7280]">
                    Pre‑departure briefings and checklists for your first weeks.
                  </p>
                </div>
              </li>
            </ol>

            <button className="mt-6 w-full rounded-xl bg-gradient-to-r  bg-[#110053]  text-white text-sm font-semibold py-2.5  hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              Talk to a counselor
            </button>
          </aside>

          {/* 2×2 tiles: image + text side by side */}
          <div className="lg:w-2/3 grid gap-6 md:grid-cols-2">
            {tileServices.map((item, index) => (
              <article
                key={item.key}
                className="overflow-hidden rounded-2xl bg-white shadow-sm border border-[#eee9ff] flex flex-col"
              >
                {/* Image on top for mobile, alternating on desktop for some interest */}
                <div
                  className={`relative h-40 sm:h-44 md:h-48 ${
                    index % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>

                {/* Text block */}
                <div
                  className={`flex-1 px-6 py-5 flex flex-col justify-center ${
                    index % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <h3 className="text-lg sm:text-xl font-semibold text-[#110053] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4a4560] mb-4">
                    {item.subtitle}
                  </p>
                  <button className="inline-flex w-max items-center justify-center rounded-full border border-[#d4d4dd] bg-white px-5 py-2 text-xs sm:text-sm font-medium text-[#110053] hover:border-[#a89fff] hover:bg-[#f9f7ff] transition-colors">
                    {item.cta}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
