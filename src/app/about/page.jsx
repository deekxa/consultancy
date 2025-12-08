"use client";

import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <main className="w-full bg-gradient-to-b from-[#faf9ff] via-[#f4f1ff] to-[#ebe8ff]">

      {/* NEW TOP HERO SECTION */}
     {/* HERO SECTION */}
<section className="relative w-full min-h-[550px] flex items-center justify-center overflow-hidden mb-0">
  {/* Background Image */}
  <img
    src="/heroimage/image3.jpg"
    alt="About Us banner"
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-[#22223b]/60" />

  {/* Center Text */}
  <div className="relative z-10 w-full px-6 lg:px-16 py-20 flex flex-col items-center text-center animate-slideUp">
    <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_4px_24px_rgba(30,20,80,0.96)]">
      About Us
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

      <span className="text-[#a89fff] font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">About Us</span>
    </nav>
  </div>
</section>

      {/* HERO HEADER — Spacious and Minimal */}
      <section className="relative w-full min-h-[600px] flex flex-col md:flex-row items-center bg-[#faf9ff] px-0 lg:px-16 py-16">
        {/* Left (image, more substantial) */}
        <div className="relative w-full md:w-6/12 flex justify-center items-center py-8">
          <div className="absolute left-12 top-12 w-[380px] h-[380px] bg-[#e2e8f8] rounded-2xl shadow-xl -z-10" />
          <Image
            src="/about/image2.jpg"
            alt="About team"
            width={400}
            height={400}
            className="rounded-2xl border-4 border-[#8b7ae8] object-cover shadow-2xl z-10"
          />
        </div>
        {/* Right (clean heading, minimal subtitle) */}
        <div className="w-full md:w-6/12 flex flex-col justify-center px-6 md:px-10 py-8">
          <span className="font-serif text-7xl font-bold text-[#110053] leading-tight mb-6 block">
            Who we are.
          </span>
          <p className="text-[#4a4560] font-semibold text-2xl mb-6">
            Where ambition meets expert guidance.
          </p>
          <p className="text-[#6f6597] font-light text-lg md:max-w-xl mb-10 leading-relaxed">
            Our global advisors combine deep experience and genuine care. From choosing a destination to securing scholarships, your study abroad process becomes simple, clear, and personal.
          </p>
          <div className="flex gap-5">
            <Link
              href="/success-stories"
              className="px-8 py-4 bg-gradient-to-r  bg-[#110053] 
                                   shadow-sm shadow-black/30
                                   hover:shadow-md hover:shadow-black/40
                                   hover:-translate-y-[1px]
                                   transition-all duration-150 text-white rounded-xl font-semibold"
            >
              Success Stories
            </Link>
            <Link
              href="/consultation"
              className="px-8 py-4 border-2 border-[#8b7ae8] text-[#8b7ae8] rounded-xl font-semibold bg-[#faf9ff] hover:bg-[#e8e8ff] hover:text-[#110053] hover:scale-105 transition"
            >
              Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-18 px-6 lg:px-8 bg-white/95">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl font-serif font-bold text-[#110053] mb-7 block">
              Our Story
            </h2>
            <p className="text-lg text-[#4a4560] mb-4 font-light">
              Education Tree Global began with former international students facing real challenges—visas, scholarships, new countries. We know the journey.
            </p>
            <p className="text-lg text-[#6f6597] mb-9 font-light">
              After 15 years and 12,500+ successes, our advisors remain focused on honest, tailored support for ambitious people.
            </p>
            <div className="flex gap-10">
              <div>
                <p className="text-3xl font-bold text-[#8b7ae8]">15+</p>
                <p className="text-xs text-[#6f6597] font-semibold">Years of Impact</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-[#110053]">12,500+</p>
                <p className="text-xs text-[#6f6597] font-semibold">Students Guided</p>
              </div>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <div className="absolute left-8 top-8 w-[320px] h-[320px] bg-[#ebe8ff] rounded-2xl shadow-xl -z-10" />
            <Image
              src="/about/image1.jpg"
              alt="Story Team"
              width={320}
              height={320}
              className="rounded-2xl border-2 border-[#8b7ae8] object-cover shadow-xl relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-14 px-6 lg:px-8 bg-gradient-to-br from-[#faf9ff] via-[#f7f5ff] to-[#ebe8ff]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-center font-bold text-[#110053] mb-9 block">Our Journey</h2>
          <ol className="border-l-2 border-[#8b7ae8] pl-6 space-y-10">
            <li>
              <div className="text-xl text-[#110053] font-bold mb-2">2009</div>
              <div className="text-[#4a4560]">Founded by international graduates. Placed 50 students.</div>
            </li>
            <li>
              <div className="text-xl text-[#110053] font-bold mb-2">2015</div>
              <div className="text-[#4a4560]">Expanded to 3 countries and 100+ university partners.</div>
            </li>
            <li>
              <div className="text-xl text-[#110053] font-bold mb-2">2021</div>
              <div className="text-[#4a4560]">Launched digital counseling for families worldwide.</div>
            </li>
            <li>
              <div className="text-xl text-[#110053] font-bold mb-2">2024</div>
              <div className="text-[#4a4560]">12,500+ journeys abroad. Trusted by families across 25 countries.</div>
            </li>
          </ol>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-serif text-center font-bold text-[#110053] mb-12 block">Meet Our Expert Team</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { name: "Namuna Acharya", role: "CEO", desc: "USA & Australia specialist. 15 years experience.", img: "/about/namuna.png" },
              { name: "Rajesh Patel", role: "COO", desc: "Canada & UK expert. 15 years experience.", img: "/about/image5a.jpeg" },
              { name: "Aisha Kumar", role: "Senior Counselor", desc: "IELTS Master. Helped 2000+ students.", img: "/about/image6a.jpeg" }
            ].map((member, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border-2 border-[#e6def8] overflow-hidden shadow hover:scale-105 transition flex flex-col"
              >
                <div className="relative w-full aspect-[4/3] bg-[#ebe8ff]">
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    className="object-cover rounded-t-2xl"
                  />
                </div>
                <div className="p-4 flex-grow">
                  <div className="font-serif font-bold text-lg text-[#110053] mb-1">{member.name}</div>
                  <div className="text-sm text-[#8b7ae8] font-semibold mb-1">{member.role}</div>
                  <div className="text-xs text-[#4a4560] mb-0.5">{member.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Elegant CTA */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-r from-[#f0f0ff] via-[#e5e5ff] to-[#f0f0ff] relative overflow-hidden">
        <div className="max-w-4xl mx-auto rounded-3xl p-14 shadow-2xl bg-white bg-opacity-90 text-center transition-transform hover:scale-105 hover:shadow-3xl">
          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#110053] mb-4">
            Ready to Start Your Story?
          </h2>
          {/* Subtitle / Description */}
          <p className="text-lg text-[#4a4560] mb-8 max-w-2xl mx-auto leading-relaxed">
            Join 12,500+ students who have found their path. Book your free consultation now and begin a new chapter with confidence.
          </p>
          {/* Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            {/* Book Your Free Call button */}
            <Link
              href="/consultation"
              className="px-8 py-4 bg-gradient-to-r  bg-[#110053] 
                                   shadow-sm shadow-black/30
                                   hover:shadow-md hover:shadow-black/40
                                   hover:-translate-y-[1px]
                                   transition-all duration-150 text-white rounded-xl font-semibold"
            >
              Book Your Free Call
            </Link>
            {/* Contact Us button */}
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-[#8b7ae8] text-[#8b7ae8] rounded-xl font-semibold hover:bg-[#e8e8ff] hover:text-[#110053] hover:scale-105 transition"
            >
              Contact Us
            </Link>
          </div>
          {/* Additional info icons */}
          <div className="mt-6 flex flex-wrap justify-center gap-8 text-[#7a72b8] font-semibold text-sm uppercase tracking-wide">
            <div>ISO Certified</div>
            <div>98% Success Rate</div>
            <div>25+ Countries</div>
          </div>
        </div>
      </section>

    </main>
  );
}
