// components/HomeSection.jsx
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function HomeSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMouseMove = (e) => {
      if (!prefersReducedMotion) {
        setMousePosition({
          x: (e.clientX / window.innerWidth - 0.5) * 20,
          y: (e.clientY / window.innerHeight - 0.5) * 20,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  return (
    <section 
      className="relative min-h-[calc(100vh-80px)] bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#EBE8FF] overflow-hidden py-16 lg:py-20"
      aria-label="Hero section"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {!prefersReducedMotion && (
          <>
            <div 
              className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-[#a89fff]/30 to-[#8b7ae8]/20 rounded-full blur-3xl animate-pulse"
              style={{
                transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                transition: 'transform 0.5s ease-out',
              }}
            />
            <div 
              className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-gradient-to-tl from-[#a89fff]/20 to-purple-200/30 rounded-full blur-3xl animate-pulse"
              style={{
                transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
                transition: 'transform 0.5s ease-out',
              }}
            />
          </>
        )}
        
        {/* Floating Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,159,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(168,159,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">

          {/* Left Content - responsive slight right shift */}
          <div className="flex flex-col justify-between space-y-6 pr-0 md:pr-2 lg:pr-8 md:ml-2 lg:ml-6">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#110053] leading-[1.15] tracking-tight">
                Your Dream of
                <span className="block mt-2 bg-gradient-to-r from-[#8b7ae8] via-[#7a68d7] to-[#6957c6] bg-clip-text text-transparent animate-gradient">
                  Studying Abroad
                </span>
                Starts Here
              </h1>
              
              <p className="text-base lg:text-lg text-[#4a4560] leading-relaxed">
                Nepal's leading education consultancy with 15 years of expertise. We've helped 500+ students secure admissions to top universities in Australia, Canada, UK, USA & New Zealand with personalized guidance and visa support.
              </p>
              
              {/* CTA Buttons without shadows */}
              <div className="flex flex-wrap gap-4 pt-2">
            <Link
  href="/consultation"
  className="group relative inline-flex items-center justify-center rounded-lg px-7 py-3.5 text-sm font-semibold text-white bg-[#110053] shadow-sm shadow-black/30 
             hover:shadow-md hover:shadow-black/40 
             hover:-translate-y-[1px] active:translate-y-0
             overflow-hidden transition-all duration-150 will-change-transform"
  aria-label="Book Free Counseling"
>
  <span className="relative z-10 flex items-center gap-2">
    Book Free Counseling
    <svg
      className="w-4 h-4 transition-transform group-hover:translate-x-1"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 7l5 5m0 0l-5 5m5-5H6"
      />
    </svg>
  </span>

  {/* Gradient overlay */}
  <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#110053] to-[#2c007f] opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg z-0" />
</Link>



                
                <Link 
                  href="/success-stories" 
                  className="group inline-flex items-center justify-center bg-white text-[#110053] px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide border-2 border-[#f1eaff] hover:border-[#e6def8] transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#a89fff]/30 focus:ring-offset-2"
                  aria-label="View student success stories"
                >
                  <span className="flex items-center gap-2">
                    Student Success Stories
                    <svg className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right Image Section - slightly left & wider */}
          <div className="relative flex items-center justify-end lg:justify-end">
            <div className="absolute inset-0 flex items-center justify-end lg:justify-end" aria-hidden="true">
              <div className="w-[320px] h-[320px] bg-gradient-to-br from-[#a89fff]/10 to-[#8b7ae8]/5 rounded-full blur-3xl animate-pulse" />
            </div>

            <div className="relative w-full max-w-[430px] group lg:translate-x-[-60px]">
              {!prefersReducedMotion && (
                <div className="absolute -inset-4 bg-gradient-to-r from-[#a89fff] via-[#8b7ae8] to-[#7a68d7] rounded-3xl opacity-30 group-hover:opacity-50 blur-xl transition-all duration-500 animate-gradient" aria-hidden="true" />
              )}
              
              <div className="relative h-[380px] lg:h-[450px] rounded-3xl overflow-hidden border-4 border-white/50 transition-all duration-500">
                <img 
                  src="/herosection/image1.jpg" 
                  alt="Happy international students celebrating university admission success" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#110053]/20 via-transparent to-[#a89fff]/20 group-hover:opacity-0 transition-opacity duration-500" aria-hidden="true" />
              </div>

              {/* Floating badges without shadows */}
              <div 
                className="absolute -top-3 -right-3 bg-white rounded-xl p-3 border border-[#e6def8] hover:-translate-y-1 transition-all duration-300"
                role="complementary"
                aria-label="Expert counseling team"
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#a89fff] to-[#8b7ae8] rounded-lg flex items-center justify-center" aria-hidden="true">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-[#110053] text-xs">Expert Counselors</p>
                    <p className="text-[10px] text-[#4a4560]">Certified & Trained</p>
                  </div>
                </div>
              </div>

              <div 
                className="absolute -bottom-3 -left-3 bg-white rounded-xl p-3 border border-[#e6def8] hover:-translate-y-1 transition-all duration-300"
                role="complementary"
                aria-label="Visa success rate"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#8b7ae8] to-[#7a68d7] rounded-lg flex items-center justify-center">
                    <span className="text-base font-bold text-white">98%</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#110053] text-sm">Visa Success</p>
                    <p className="text-xs text-[#4a4560]">Rate Guaranteed</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" fillOpacity="0.1"/>
        </svg>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}
