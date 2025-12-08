"use client";

import { useState, useRef } from "react";

export default function FAQSectionNZ() {
  const faqs = [
    {
      question: "Why should I study in New Zealand?",
      answer:
        "New Zealand offers globally recognized degrees, a safe learning environment, research-focused universities, and an excellent quality of life for international students."
    },
    {
      question: "What exams do I need?",
      answer:
        "Most programs require English proficiency such as IELTS, TOEFL, or PTE Academic. Some specialized courses may require additional academic tests."
    },
    {
      question: "Can I get scholarships?",
      answer:
        "Yes. New Zealand offers government scholarships, university-specific scholarships, and merit-based awards for international students."
    },
    {
      question: "Is IELTS required for all courses?",
      answer:
        "Most universities require IELTS, TOEFL, or PTE scores. English language proof is also needed for visa applications unless exempted by prior study."
    },
    {
      question: "Can I get a Post-Study Work Visa?",
      answer:
        "Yes. New Zealand allows post-study work visas for eligible qualifications. Duration depends on your level of study and the region where you studied."
    }
  ];

  const [openIndexes, setOpenIndexes] = useState(new Set());
  const [openingIndexes, setOpeningIndexes] = useState(new Set());

  const toggleFaq = (index) => {
    setOpenIndexes((prev) => {
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
    setOpeningIndexes((prev) => {
      const newOpening = new Set(prev);
      newOpening.delete(index);
      return newOpening;
    });
  };

  return (
    <section
      className="w-full py-14 px-3 md:px-12"
      style={{
        background: "linear-gradient(135deg, #faf9ff, #f0edff 60%, #ebe8ff 100%)",
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
              <div
                key={index}
                className="border-b border-[#e6def8] bg-white bg-opacity-70 rounded-xl shadow-sm"
              >
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
                    transition: `all ${
                      isOpen && isOpening ? "1.6s" : "400ms"
                    } cubic-bezier(0.4, 0, 0.2, 1)`,
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
