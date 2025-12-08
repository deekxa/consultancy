"use client";

import { useState } from "react";

export default function FAQSectionCanada() {
  const faqs = [
    {
      question: "Why should I study in Canada?",
      answer:
        "Canada offers world‑class education, multicultural campuses, high quality of life, and globally recognized degrees. Many universities rank among top institutions worldwide, delivering academic standards valued globally. :contentReference[oaicite:0]{index=0}"
    },
    {
      question: "Can I work while studying in Canada?",
      answer:
        "Yes — international students at many Canadian institutions are allowed to work up to 20 hours/week during academic sessions, and full‑time during scheduled breaks. :contentReference[oaicite:1]{index=1}"
    },
    {
      question: "What about after graduation — can I stay and work?",
      answer:
        "After graduation, you may be eligible for a  for up to 3 years, allowing you to gain Canadian work experience which can help in applying for permanent residency or other long‑term opportunities. :contentReference[oaicite:3]{index=3}"
    },
    {
      question: "Is English language test required?",
      answer:
        "Yes — most Canadian universities require proof of English proficiency (e.g.  Academic or equivalent) if you are from a non‑English background. Some courses may also accept other tests depending on the institution. :contentReference[oaicite:5]{index=5}"
    },
    {
      question: "Do I need to show proof of funds to study in Canada?",
      answer:
        "Yes — to get a study permit, you normally need to show sufficient funds to cover tuition, living expenses, and travel. Recent guidelines (outside Québec) require proof of a minimum amount to cover one year of living costs (in addition to tuition). :contentReference[oaicite:6]{index=6}"
    },
    {
      question: "Are scholarships or financial aid available for international students?",
      answer:
        "Yes — many Canadian universities and institutions offer scholarships, bursaries, or financial aid (merit‑based or need‑based) for international students. But eligibility varies by institution and course. :contentReference[oaicite:7]{index=7}"
    },
    {
      question: "Is Canada a safe and welcoming country for international students?",
      answer:
        "Yes — Canada is known for being multicultural, inclusive and offers a high standard of living. Its cities are safe and supportive for international students adjusting to new cultures and environments. :contentReference[oaicite:8]{index=8}"
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
    <section
      className="w-full py-14 px-3 md:px-12"
      style={{
        background: 'linear-gradient(135deg, #faf9ff, #f0edff 60%, #ebe8ff 100%)'
      }}
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#110053] mb-10 text-center">
          Frequently Asked Questions – Study in Canada
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
                  aria-controls={`faq-answer-${index}`}
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
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-[#110053] transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
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
