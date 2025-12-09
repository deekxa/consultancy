"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./HeroSection.module.css";

function MinimalPrevArrow({ onClick }) {
  return (
    <button
      className="hidden md:flex items-center justify-center absolute left-6 bottom-10 z-20 
                 text-white/60 hover:text-white text-xs tracking-[0.18em] uppercase gap-1 
                 transition-colors duration-150"
      onClick={onClick}
      aria-label="Previous slide"
      type="button"
    >
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/25">
        <span className=" block h-[9px] w-[9px] border-l border-t border-white/70 -rotate-45 translate-x-[1px] cursor-pointer" />
      </span>
      <span className="hidden lg:inline">Previous</span>
    </button>
  );
}

function MinimalNextArrow({ onClick }) {
  return (
    <button
      className="hidden md:flex items-center justify-center absolute right-6 bottom-10 z-20 
                 text-white/60 hover:text-white text-xs tracking-[0.18em] uppercase gap-1 
                 transition-colors duration-150"
      onClick={onClick}
      aria-label="Next slide"
      type="button"
    >
      <span className="hidden lg:inline">Next</span>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/25">
        <span className=" cursor-pointer block h-[9px] w-[9px] border-r border-b border-white/70 -rotate-45 -translate-x-[1px]" />
      </span>
    </button>
  );
}

const slides = [
  {
    type: "video",
    media: "/video1.mp4",
    title: "Nepal's leading",
    subtitle: "study abroad consultancy",
    description:
      "Trusted guidance for Australia, Canada, UK, USA and New Zealand with free expert counseling.",
    cta: "Book free consultation",
    link: "/contact",
  },
  {
    type: "image",
    media: "/image2.jpg",
    title: "Turn your dreams",
    subtitle: "into global opportunities",
    description:
      "Join thousands of Nepali students who achieved their study abroad goals with our support.",
    cta: "Start your journey",
    link: "/test-prep/ielts",
  },
  {
    type: "image",
    media: "/image3.jpg",
    title: "IELTS and PTE",
    subtitle: "preparation classes",
    description:
      "Score higher with experienced trainers and flexible class timings in Kathmandu.",
    cta: "Enroll now",
    link: "/contact",
  },
  {
    type: "video",
    media: "/video2.mp4",
    title: "400+ universities",
    subtitle: "worldwide partners",
    description:
      "Access top institutions and scholarships with complete support from application to visa.",
    cta: "Explore universities",
    link: "/canada",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 650,
    fade: true,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    prevArrow: <MinimalPrevArrow />,
    nextArrow: <MinimalNextArrow />,
    beforeChange: (_current, next) => setCurrentSlide(next),
    appendDots: (dots) => (
      <div className="absolute bottom-6 w-full">
        <div className="flex items-center justify-center gap-4">
          <ul className="m-0 flex items-center gap-2.5">{dots}</ul>
        </div>
      </div>
    ),
    customPaging: () => (
      <div className="h-1.5 w-4 rounded-full bg-white/30 transition-all duration-200 
                      group-[.slick-active]:w-6 group-[.slick-active]:bg-white" />
    ),
  };

  return (
    <div className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-black">
      <div className="relative h-full">
        <Slider {...settings}>
          {slides.map((slide, i) => (
            <div key={i}>
              <div className="relative h-[80vh] md:h-screen w-full">
              
                {slide.type === "video" ? (
                  <video
                    src={slide.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <Image
                    src={slide.media}
                    alt={slide.title}
                    fill
                    priority={i === 0}
                    className="object-cover"
                    quality={80}
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

    
                <div
                  key={`slide-content-${currentSlide}-${i}`}
                  className="absolute inset-0 flex items-center px-5 md:px-10 lg:px-24"
                >
                  <div className="max-w-3xl text-left text-white">
                    <p
                      className={`${styles.fadeInSoft} text-[11px] md:text-xs uppercase tracking-[0.24em] text-white/60`}
                      style={{ animationDelay: "0.05s" }}
                    >
                      Study abroad made simple
                    </p>

                    <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.15]">
                      <span
                        className={`${styles.titleSlideIn} block text-white mb-1`}
                        style={{ animationDelay: "0.15s" }}
                      >
                        {slide.title}
                      </span>

                      <span
                        className={`${styles.titleSlideIn} block text-[#dde1ff] mt-1`}
                        style={{ animationDelay: "0.3s" }}
                      >
                        {slide.subtitle}
                      </span>
                    </h1>

                   
                    <p
                      className={`mt-4 max-w-xl text-sm md:text-base leading-relaxed text-white/80 ${styles.fadeInSoft}`}
                      style={{ animationDelay: "0.45s" }}
                    >
                      {slide.description}
                    </p>

                    <div
                      className={`${styles.fadeInSoft} mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4`}
                      style={{ animationDelay: "0.6s" }}
                    >
                    
<Link
  href={slide.link}
  className="inline-flex items-center justify-center rounded-lg
             px-6 md:px-7 py-3 md:py-3.5
             text-sm md:text-[15px] font-semibold
             text-[#110053]
             bg-[#a89fff]
             shadow-[0_0_20px_rgba(17,0,83,0.6),0_4px_14px_rgba(0,0,0,0.4)]
             hover:shadow-[0_0_30px_rgba(17,0,83,0.9),0_6px_20px_rgba(0,0,0,0.5)]
             hover:scale-[1.02]
             active:scale-[0.98]
             transition-all duration-200
             border border-[#a89fff]/40
             hover:border-[#a89fff]/60"
>
  {slide.cta}
</Link>


                   
                     <Link href="/destinations/australia" passHref>
  <button
    type="button"
    className="inline-flex items-center
               text-[12px] md:text-[13px]
               text-white/70 hover:text-white/95
               transition-colors px-4 py-2 cursor-pointer"
  >
    View destinations
    <span className="ml-1.5 block h-[8px] w-[8px] border-r border-b border-white/70 -rotate-45" />
  </button>
</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
