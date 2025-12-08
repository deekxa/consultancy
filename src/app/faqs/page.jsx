'use client';

import { useState } from 'react';

export default function FAQSection() {
  const faqs = [
    {
      question: "How can we help you find the perfect education path?",
      answer:
        "We offer personalized advice to help you choose the right universities, courses, and countries that match your dreams and goals. Whether you're aiming for higher studies or exploring new career opportunities, we're here to guide you every step of the way gently and thoughtfully.",
    },
    {
      question: "What services do we provide?",
      answer:
        "From university applications, visa guidance, and scholarship assistance to career counseling and interview preparation — our team lovingly supports your journey from start to finish. Our services are tailored with care to suit your unique story.",
    },
    {
      question: "How do we make the process easy and stress-free?",
      answer:
        "Every step should feel like a gentle, slow dance. Our experienced counselors listen closely to your needs, answer all your questions patiently, and help you navigate complex procedures smoothly. With us, you'll never feel rushed — just confident and supported.",
    },
    {
      question: "Which countries and programs do we support?",
      answer:
        "We offer a cozy map of options across the world: UK, USA, Australia, Canada, New Zealand, Germany, and many more. Our expert team matches your interests with the best programs, so you always find your best fit.",
    },
    {
      question: "Do you help with scholarships and funding?",
      answer:
        "Absolutely! We gently guide you on how to find scholarships, grants, and funding options to make your dreams affordable. Let’s make your journey not just hopeful, but also within reach.",
    },
    {
      question: "What makes your consultancy special?",
      answer:
        "Our team is passionate, friendly, and always on your side. We listen, understand, and patiently turn your aspirations into reality — with a smile!",
    },
    {
      question: "How do I start?",
      answer:
        "Just reach out on email, WhatsApp, or fill out our contact form. We'll get in touch for a warm, friendly chat to discuss your goals. No pressure, no rush!",
    },
    {
      question: "Is there an application fee?",
      answer:
        "We do not charge any initial consulting fee for your basic counseling and profile assessment. Some applications might have university-specific fees, which we’ll explain.",
    },
    {
      question: "Can you help after I reach my study destination?",
      answer:
        "Yes! We offer pre-departure briefings and on-arrival support for students, so you’re never alone during your adjustment period.",
    },
    {
      question: "Will you help with accommodation and airport pickup?",
      answer:
        "Definitely! Ask our team and we’ll guide you in finding trustworthy student accommodation and, in many destinations, arrange airport pickup.",
    },
  ];

  const [openIndexes, setOpenIndexes] = useState(new Set());
  const [searchValue, setSearchValue] = useState("");

  const filteredIndexes = faqs
    .map((faq, idx) =>
      faq.question.toLowerCase().includes(searchValue.trim().toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchValue.trim().toLowerCase())
        ? idx
        : null
    )
    .filter(idx => idx !== null);

  const toggleFaq = (index) => {
    setOpenIndexes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#ebe8ff] py-16 px-6 mt-10 lg:mt-20">
      {/* Centered heading at the top */}
      <h2 className="text-4xl md:text-5xl font-bold text-[#110053]  font-sans text-center mb-24">
        Frequently Asked Questions
      </h2>

      {/* Layout: FAQs and cute right panel */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* LEFT: FAQ List (unchanged) */}
        <div className="w-full lg:w-3/5 flex flex-col justify-center">
          <div className="mb-10">
            <div className="flex items-center rounded-full bg-white px-4 py-3 border border-gray-300 shadow-sm focus-within:ring-2 focus-within:ring-[#4f46e5] transition-colors duration-300">
              <input
                type="text"
                placeholder="Search question here"
                className="bg-transparent flex-1 py-2 px-3 placeholder-[#a5b4fc] text-[#4b5563] focus:outline-none font-sans"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                aria-label="Search FAQ questions"
              />
              <svg
                className="w-6 h-6 text-[#a5b4fc] ml-3"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
          <div className="space-y-3 font-sans">
            {filteredIndexes.length === 0 && (
              <div className="text-[#9ca3af] text-center py-10">
                No FAQs found.
              </div>
            )}
            {filteredIndexes.map(index => {
              const faq = faqs[index];
              const isOpen = openIndexes.has(index);
              return (
                <div key={index} className="border-b border-gray-300">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="w-full flex items-center justify-between py-5 px-3 text-lg font-semibold text-[#110053] text-left transition-colors duration-300 hover:text-[#4f46e5] focus:outline-none"
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.question}</span>
                    <span className="ml-3">
                      {isOpen ? (
                        <svg
                          className="w-6 h-6 text-[#4f46e5] transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg
                          className="w-6 h-6 text-[#110053] transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${index}`}
                    className={`overflow-hidden transition-all duration-[1200ms] ease-in-out text-base text-[#4b5563] px-3 ${
                      isOpen ? 'max-h-96 opacity-100 pb-6 pt-2' : 'max-h-0 opacity-0 pb-0 pt-0'
                    }`}
                  >
                    <p className="pr-8">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: Cute stacked FAQ bubbles, dark theme */}
        <div
          className="w-full lg:w-2/5 flex items-center justify-center relative rounded-xl shadow-xl overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #181C3A 0%, #110053 70%, #4f46e5 100%)',
            minHeight: '440px',
          }}
        >
          {/* Decorative faint background icons */}
          <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none" style={{zIndex:1}} viewBox="0 0 420 440">
            <g opacity="0.08">
              <circle cx="60" cy="60" r="28" fill="#FFF" />
              <rect x="340" y="270" width="40" height="20" rx="8" fill="#fff"/>
              <path d="M380 60 Q400 95 370 110" stroke="#fff" strokeWidth="8" fill="none"/>
            </g>
            <g opacity="0.12">
              <text x="23" y="400" fontWeight="bold" fontFamily="sans-serif" fontSize="110" fill="#fff">?</text>
            </g>
          </svg>

          {/* Stack of large dark chat bubbles for FAQ */}
          <div className="flex flex-col gap-3 z-10 relative items-center">
            {/* F */}
            <div className="relative px-10 py-6 rounded-2xl bg-[#232762] shadow-md flex items-center mb-[-16px]" style={{minWidth:98}}>
              <span className="text-[44px] sm:text-5xl md:text-6xl font-extrabold text-white font-sans tracking-wider drop-shadow">F</span>
              <div className="absolute right-[-20px] top-6 w-5 h-5 bg-[#232762] rounded-tr-lg transform rotate-45 shadow" />
            </div>
            {/* A */}
            <div className="relative px-10 py-6 rounded-2xl bg-[#322897] shadow-md flex items-center mb-[-16px]" style={{minWidth:98}}>
              <span className="text-[44px] sm:text-5xl md:text-6xl font-extrabold text-white font-sans tracking-wider drop-shadow">A</span>
              <div className="absolute left-[-20px] bottom-6 w-5 h-5 bg-[#322897] rounded-bl-lg transform rotate-45 shadow" />
            </div>
            {/* Q */}
            <div className="relative px-10 py-6 rounded-2xl bg-[#4f46e5] shadow-md flex items-center" style={{minWidth:98}}>
              <span className="text-[44px] sm:text-5xl md:text-6xl font-extrabold text-white font-sans tracking-wider drop-shadow">Q</span>
              <div className="absolute right-[-20px] bottom-6 w-5 h-5 bg-[#4f46e5] rounded-br-lg transform rotate-45 shadow" />
            </div>
          </div>

         

        </div>
      </div>
    </section>
  );
}
