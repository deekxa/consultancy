"use client";  

import React, { useState, useMemo } from 'react';
import Slider from 'react-slick';
import FallbackImage from '../../ui/FallbackImage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function TrustSection() {
  const trustedCompanies = useMemo(
    () => [
      { name: 'Microsoft', logo: '/client1.jpg' },
      { name: 'Amazon', logo: '/client2.png' },
      { name: 'Google', logo: '/client3.png' },
      { name: 'IBM', logo: '/client4.png' },
      { name: 'Salesforce', logo: '/client5.png' },
      { name: 'Oracle', logo: '/client6.png' },
    ],
    []
  );

  const [currentSlide, setCurrentSlide] = useState(0);

  const slidesToShow = 5;
  const centerOffset = Math.floor(slidesToShow / 2);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow,
    slidesToScroll: 1,
    swipe: false, 
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const centerActiveIndex = (currentSlide + centerOffset) % trustedCompanies.length;

  return (
    <section
      className="relative  py-20 bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#EBE8FF]"
      aria-label="Trusted partners"
      style={{ paddingLeft: 0, paddingRight: 0, overflowX: 'hidden' }}
    >
      
      <div className="text-center mb-12 px-8 sm:px-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#110053] leading-[1.2] tracking-tight">
          Our{' '}
          <span className="bg-gradient-to-r from-[#8b7ae8] via-[#7a68d7] to-[#6957c6] bg-clip-text text-transparent animate-gradient">
            Global Partners
          </span>
        </h2>
      </div>

  
      <div className="w-full px-0">
        <Slider {...settings}>
          {trustedCompanies.map((company, index) => (
            <div
              key={index}
              role="group"
              aria-label={`${index + 1} of ${trustedCompanies.length}: ${company.name}`}
              className="p-2"
            >
              <div
                className="relative p-5 border bg-white shadow-sm flex items-center justify-center transition-transform duration-300 hover:shadow-md"
                style={{
                  transform: centerActiveIndex === index ? 'scale(1.03)' : 'scale(1)',
                  borderColor: centerActiveIndex === index ? 'rgba(217,204,255,0.6)' : 'transparent',
                  boxShadow: centerActiveIndex === index
                    ? '0 6px 12px rgba(139,122,232,0.25)'
                    : '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
                }}
              >
                <div className="relative h-20 w-full flex items-center justify-center bg-white p-2 rounded-none">
                  <FallbackImage
                    src={company.logo}
                    alt={`${company.name} logo`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                    quality={90}
                    className={`object-contain transition-opacity duration-300 ${
                      centerActiveIndex === index
                        ? 'grayscale-0 opacity-100 scale-[1.02]'
                        : 'grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100'
                    }`}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

    
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        :global(.slick-dots) {
          bottom: -30px;
        }
        :global(.slick-dots li) {
          margin: 0 4px;
        }
        :global(.slick-dots li button) {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: #8b7ae8;
          opacity: 0.4;
          transition: opacity 0.3s ease, background-color 0.3s ease;
        }
        :global(.slick-dots li.slick-active button) {
          opacity: 1;
          background-color: #6957c6;
        }
        :global(.slick-dots li button:hover) {
          opacity: 0.7;
        }
        :global(.slick-dots li button::before) {
          content: none !important;
        }
      `}</style>
    </section>
  );
}
