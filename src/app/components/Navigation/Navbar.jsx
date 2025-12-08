"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isDestOpen, setIsDestOpen] = useState(false);
  const [isTestOpen, setIsTestOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const destRef = useRef(null);
  const testRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (destRef.current && !destRef.current.contains(event.target)) {
        setIsDestOpen(false);
      }
      if (testRef.current && !testRef.current.contains(event.target)) {
        setIsTestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const destinationsMenu = [
    { name: "Australia", href: "/destinations/australia" },
    { name: "Canada", href: "/destinations/canada" },
    { name: "UK", href: "/destinations/uk" },
    { name: "USA", href: "/destinations/usa" },
    { name: "Japan", href: "/destinations/japan" },
    { name: "Korea", href: "/destinations/korea" },
    { name: "New Zealand", href: "/destinations/new-zealand" },
    { name: "Europe", href: "/destinations/europe" },
  ];

  const testsMenu = [
    { name: "IELTS", href: "/test-prep/ielts" },
    { name: "PTE", href: "/test-prep/pte" },
    { name: "TOEFL", href: "/test-prep/toefl" },
    { name: "GRE", href: "/test-prep/gre" },
    { name: "SAT", href: "/test-prep/sat" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 px-6 py-2">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl border border-purple-100/20 shadow-lg">
        <div className="px-6 lg:px-8 flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-[#110053]">Education</span>
              <span className="text-[#a89fff] ml-2">Tree</span>
              <span className="text-[#6F6597] ml-1.5 font-light">Global</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Study Destinations */}
            <div className="relative group" ref={destRef}>
              <button
                onClick={() => {
                  setIsDestOpen(!isDestOpen);
                  setIsTestOpen(false);
                }}
                className="relative text-[#110053] hover:text-[#a89fff] font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-1.5 focus:outline-none py-2"
                aria-haspopup="true"
                aria-expanded={isDestOpen}
                type="button"
              >
                Study Destinations
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isDestOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a89fff] to-[#6F6597] transition-all duration-300 group-hover:w-full"></span>
              </button>
              {isDestOpen && (
                <ul className="absolute left-0 top-full mt-8 w-56 rounded-xl bg-white border border-[#e6def8] shadow-2xl overflow-hidden animate-fadeInDown">
                  {destinationsMenu.map((item, index) => (
                    <li
                      key={item.name}
                      style={{ animationDelay: `${index * 30}ms` }}
                      className="animate-slideIn"
                    >
                      <Link
                        href={item.href}
                        className="group/item flex items-center px-5 py-3 text-sm text-[#110053] hover:bg-gradient-to-r hover:from-[#f0edff] hover:to-[#faf9ff] hover:text-[#4f46e5] transition-all duration-200 relative overflow-hidden"
                        onClick={() => setIsDestOpen(false)}
                      >
                        <span className="relative z-10">{item.name}</span>
                        <svg
                          className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Test Preparation dropdown */}
            <div className="relative group" ref={testRef}>
              <button
                onClick={() => {
                  setIsTestOpen(!isTestOpen);
                  setIsDestOpen(false);
                }}
                className="relative text-[#110053] hover:text-[#a89fff] font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-1.5 focus:outline-none py-2"
                aria-haspopup="true"
                aria-expanded={isTestOpen}
                type="button"
              >
                Test Preparation
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isTestOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a89fff] to-[#6F6597] transition-all duration-300 group-hover:w-full"></span>
              </button>
              {isTestOpen && (
                <ul className="absolute left-0 top-full mt-8 w-56 rounded-xl bg-white border border-[#e6def8] shadow-2xl overflow-hidden animate-fadeInDown">
                  {testsMenu.map((item, index) => (
                    <li
                      key={item.name}
                      style={{ animationDelay: `${index * 30}ms` }}
                      className="animate-slideIn"
                    >
                      <Link
                        href={item.href}
                        className="group/item flex items-center px-5 py-3 text-sm text-[#110053] hover:bg-gradient-to-r hover:from-[#f0edff] hover:to-[#faf9ff] hover:text-[#4f46e5] transition-all duration-200 relative overflow-hidden"
                        onClick={() => setIsTestOpen(false)}
                      >
                        <span className="relative z-10">{item.name}</span>
                        <svg
                          className="w-4 h-4 ml-auto opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Services */}
            <Link
              href="/services"
              className="relative text-[#110053] hover:text-[#a89fff] font-medium text-sm tracking-wide transition-all duration-300 py-2 group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a89fff] to-[#6F6597] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              className="relative text-[#110053] hover:text-[#a89fff] font-medium text-sm tracking-wide transition-all duration-300 py-2 group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a89fff] to-[#6F6597] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* FAQs */}
            <Link
              href="/faqs"
              className="relative text-[#110053] hover:text-[#a89fff] font-medium text-sm tracking-wide transition-all duration-300 py-2 group"
            >
              FAQs
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#a89fff] to-[#6F6597] transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Free Counselling CTA */}
            <Link
              href="/contact"
              className="relative px-6 py-2.5 text-white font-semibold text-sm tracking-wide rounded-lg overflow-hidden group/cta transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-purple-500/40"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#201837] via-[#12055a] to-[#0b0344] bg-[length:200%_100%] bg-left transition-all duration-500 group-hover/cta:bg-right"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#a89fff]/20 via-transparent to-[#a89fff]/20 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10">Free Counselling</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#110053] hover:text-[#a89fff] hover:bg-purple-50 focus:outline-none transition-all duration-300"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-purple-100/30 animate-fadeInDown">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {/* Study Destinations mobile */}
              <button
                onClick={() => setIsDestOpen(!isDestOpen)}
                className="flex w-full justify-between items-center px-4 py-3 rounded-lg text-[#110053] hover:text-[#a89fff] hover:bg-[#EBE8FF] font-medium text-sm transition-all duration-300"
                aria-haspopup="true"
                aria-expanded={isDestOpen}
                type="button"
              >
                Study Destinations
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isDestOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDestOpen &&
                destinationsMenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block pl-10 pr-4 py-3 rounded-lg text-[#110053] hover:text-[#a89fff] hover:bg-[#EBE8FF] font-medium text-sm transition-colors duration-300"
                    onClick={() => {
                      setIsOpen(false);
                      setIsDestOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}

              {/* Test Preparation mobile */}
              <button
                onClick={() => setIsTestOpen(!isTestOpen)}
                className="mt-1 flex w-full justify-between items-center px-4 py-3 rounded-lg text-[#110053] hover:text-[#a89fff] hover:bg-[#EBE8FF] font-medium text-sm transition-all duration-300"
                aria-haspopup="true"
                aria-expanded={isTestOpen}
                type="button"
              >
                Test Preparation
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isTestOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isTestOpen &&
                testsMenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block pl-10 pr-4 py-3 rounded-lg text-[#110053] hover:text-[#a89fff] hover:bg-[#EBE8FF] font-medium text-sm transition-colors duration-300"
                    onClick={() => {
                      setIsOpen(false);
                      setIsTestOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}

              {/* Other links */}
              <Link
                href="/services"
                className="block px-4 py-3 rounded-lg text-[#110053] hover:text-[#a89fff] hover:bg-[#EBE8FF] font-medium text-sm transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 rounded-lg text-[#110053] hover:text-[#a89fff] hover:bg-[#EBE8FF] font-medium text-sm transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/faqs"
                className="block px-4 py-3 rounded-lg text-[#110053] hover:text-[#a89fff] hover:bg-[#EBE8FF] font-medium text-sm transition-colors duration-300"
                onClick={() => setIsOpen(false)}
              >
                FAQs
              </Link>

              {/* Free Counselling CTA Mobile */}
              <Link
                href="/consultation"
                className="relative block mx-2 mt-3 overflow-hidden rounded-lg group/cta"
                onClick={() => setIsOpen(false)}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#201837] via-[#12055a] to-[#0b0344] bg-[length:200%_100%] bg-left transition-all duration-500 group-hover/cta:bg-right"></span>
                <span className="relative z-10 block px-6 py-3.5 text-center text-white font-bold text-sm">
                  Free Counselling
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.3s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.2s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </nav>
  );
}
