"use client";

import { useState, useRef } from "react";

export default function FAQSectionEurope() {
  const faqs = [
    {
      question: "Why should I study in Europe?",
      answer: "Europe offers world-renowned universities, diverse cultures, a variety of English-taught programs, affordable tuition in some countries, and excellent post-study work opportunities."
    },
    {
      question: "What exams do I need?",
      answer: "Most programs require IELTS or TOEFL scores for English-taught programs. Some countries may also have local language requirements."
    },
    {
      question: "Can I get scholarships?",
      answer: "Yes, there are many scholarships offered by governments, universities, and the EU, such as Erasmus+ scholarships for international students."
    },
    {
      question: "Is English proficiency required for all courses?",
      answer: "All English-taught programs require proof of English proficiency. IELTS and TOEFL are widely accepted; some universities may accept Cambridge or PTE Academic."
    },
    {
      question: "Can I work and stay after graduation?",
      answer: "Most European countries offer post-study work permits. Duration and eligibility depend on the country and your program, and some countries allow applying for a residence permit to seek employment."
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
          Frequently Asked Questions
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
