"use client";
import Image from "next/image";
import Link from "next/link";

export default function ContactCtaSection() {
  return (
    <section className="relative w-full bg-gradient-to-br from-[#faf5ff] via-[#ebe9ff] to-[#dee9ff] border-t border-b border-purple-100/60 overflow-visible">
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-0 md:px-8"
        style={{ minHeight: "400px" }}
      >
        {/* LEFT IMAGE */}
        <div className="flex-1 flex items-end justify-start md:pl-0 md:ml-[-80px]">
          <div className="relative w-full h-full min-h-[400px] flex items-end justify-start">
            <div
              className="absolute left-[-80px] bottom-0"
              style={{
                top: "-32px",
                zIndex: 10,
                width: "540px",
                maxWidth: "100vw",
                minWidth: "250px",
                pointerEvents: "none",
              }}
            >
              <Image
                src="/contact/hands.png"
                alt="Student holding tablet"
                width={540}
                height={400}
                className="w-full h-auto drop-shadow-xl"
                priority
              />
            </div>
            <div style={{ minHeight: 260 }} />
          </div>
        </div>

        {/* RIGHT: CTA */}
       <div className="flex-1 flex flex-col justify-center items-center px-6 md:pl-16 py-8 md:py-0">
  <h2 className="font-extrabold text-3xl md:text-4xl mb-2 text-[#032867]">
    Talk to a counselor
  </h2>
  <p className="text-sm md:text-base text-[#4b4c75] mb-6 text-center">
    Share your plans in a short call and get clear next steps.
  </p>
  <Link
    href="/contact"
    className="text-sm font-semibold px-9 py-3 rounded-lg bg-gradient-to-r bg-[#110053] 
 text-white shadow-lg border border-transparent  hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
    style={{ letterSpacing: "0.14em", minWidth: 190 }}
  >
    CONTACT US
  </Link>
</div>

      </div>
    </section>
  );
}
