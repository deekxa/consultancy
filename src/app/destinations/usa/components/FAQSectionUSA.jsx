"use client";

import { useState } from "react";

export default function FAQSectionUSA() {
  const faqs = [
    {
      question: "Why should I study in the USA?",
      answer:
        "The USA has world‑renowned universities, cutting-edge research, and globally recognized degrees. Programs offer flexibility, diverse student life, and networking opportunities, with many STEM and specialized fields available."
    },
    {
      question: "Can I work while studying in the USA?",
      answer:
        "Yes — international students on F‑1 visas can work on-campus up to 20 hours per week during classes, and full-time during breaks. Curricular Practical Training (CPT) may allow off-campus internships related to your program."
    },
    {
      question: "What about after graduation — can I stay and work?",
      answer:
        "F‑1 students can apply for Optional Practical Training (OPT) to work in the USA for up to 12 months (24 months for eligible STEM fields). After OPT, you may seek employer sponsorship for H‑1B visas to continue working."
    },
    {
      question: "Do I need to show proof of funds before applying?",
      answer:
        "Yes — US universities require proof of sufficient funds to cover tuition and living expenses. Typically, for one year, tuition ranges from $20,000–$70,000 depending on the university, plus living costs around $12,000–$20,000/year."
    },
    {
      question: "How much does it cost to study and live in the USA?",
      answer:
        "Costs vary widely by university and program. Tuition: $20,000–$70,000/year. Living expenses (housing, food, transport, insurance): $12,000–$20,000/year. Cities like New York or San Francisco are more expensive."
    },
    {
      question: "Are scholarships or financial aid available for international students?",
      answer:
        "Yes — many US universities offer merit-based scholarships, need-based aid, or assistantships. External scholarships from foundations or government programs are also available, depending on eligibility."
    },
    {
      question: "Is the USA safe and welcoming for international students?",
      answer:
        "Generally yes — universities have international student support, counseling, and cultural programs. Safety varies by city, so research your campus location and follow local guidelines."
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
          Frequently Asked Questions – Study in the USA
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
