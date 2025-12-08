"use client";

import { useState } from "react";

export default function FAQSectionUK() {
  const faqs = [
    {
      question: "Why should I study in the UK?",
      answer:
        "The UK has world‑renowned universities, globally recognised degrees, and many courses with one‑year master’s — saving time and money. It also offers cultural diversity, vibrant student life, and a high standard of education recognized worldwide."
    },
    {
      question: "Can I work while studying in the UK?",
      answer:
        "Yes — if you have a valid student visa (and attend a recognized university), international students can usually work up to 20 hours per week during term time, and full‑time during vacations."
    },
    {
      question: "What about after graduation — can I stay and work?",
      answer:
        "After graduation, many students are eligible to apply for the post‑study work visa (Graduate Route), which allows you to remain in the UK and look for work for a period (subject to immigration rules at that time)."
    },
    {
      question: "Do I need to show proof of funds before applying?",
      answer:
        "Yes — for visa applications you’ll need to show sufficient funds: tuition fees for first year plus living costs. As of 2025 UK rules, living‑cost proofs: ~£1,483/month (if studying in London) or ~£1,136/month (outside London) for up to 9 months."
    },
    {
      question: "How much does it cost to study and live in the UK?",
      answer:
        "It depends on university, program, and city: Undergraduates may pay roughly £11,400 – £38,000/year and post‑graduates around £9,000 – £30,000/year for tuition. Living costs vary: accommodation, food, transport etc., and are significantly higher in cities like London."
    },
    {
      question: "Are scholarships or financial aid available for international students?",
      answer:
        "Yes — many UK universities offer scholarships, bursaries or financial aid for international students; there are also external awards. Eligibility depends on university, course and academic/financial background."
    },
    {
      question: "Is the UK a safe and welcoming place for international students?",
      answer:
        "Generally yes — UK universities host many international students, and many campuses are culturally diverse and internationally oriented."
    }
  ];

  const [openIndexes, setOpenIndexes] = useState(new Set());
  const [openingIndexes, setOpeningIndexes] = useState(new Set());

  const toggleFaq = (index) => {
    setOpenIndexes(prev => {
      const updated = new Set(prev);
      const opening = new Set(openingIndexes);
      if (updated.has(index)) {
        updated.delete(index);
        opening.delete(index);
      } else {
        updated.add(index);
        opening.add(index);
      }
      setOpeningIndexes(opening);
      return updated;
    });
  };

  const handleTransitionEnd = (index) => {
    setOpeningIndexes(prev => {
      const newOpening = new Set(prev);
      newOpening.delete(index);
      return newOpening;
    });
  };

  return (
    <section className="w-full py-14 px-3 md:px-12" style={{ background: 'linear-gradient(135deg, #faf9ff, #f0edff 60%, #ebe8ff 100%)' }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#110053] mb-10 text-center">
          Frequently Asked Questions – Study in the UK
        </h2>
        <div className="space-y-3 font-sans">
          {faqs.map((faq, index) => {
            const isOpen = openIndexes.has(index);
            const isOpening = openingIndexes.has(index);
            return (
              <div key={index} className="border-b border-[#e6def8] bg-white bg-opacity-70 rounded-xl shadow-sm">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between py-5 px-6 text-lg font-semibold text-[#110053] text-left transition-colors hover:text-[#4f46e5] focus:outline-none"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.question}</span>
                  <span className="ml-2">
                    {isOpen ? (
                      <svg
                        className="w-5 h-5 text-[#4f46e5] transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-[#110053] transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? "16rem" : "0",
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? "1.5rem" : 0,
                    paddingTop: isOpen ? "0.25rem" : 0,
                    transition: `all ${isOpen && isOpening ? "1.6s" : "400ms"} cubic-bezier(0.4,0,0.2,1)`
                  }}
                  className="overflow-hidden text-base text-[#4b5563] px-6"
                  onTransitionEnd={() => handleTransitionEnd(index)}
                >
                  <p>{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
