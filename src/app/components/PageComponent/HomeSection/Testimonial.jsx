// components/ReviewsSection.jsx
'use client';

import FallbackImage from '../../ui/FallbackImage';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { useState, useCallback, useEffect } from 'react';

/* 1) Video + social-style testimonials */

const videoReviews = [
  {
    type: 'video',
    photo: '/students/student1.jpg',
    quote:
      'EducationTreeGlobal helped me get into University of Toronto. Amazing support!',
    name: 'Suman',
    handle: '@suman_edu',
    platform: 'YouTube',
    videoUrl:
      'https://www.youtube.com/embed/vZE0j_WCRvI?si=I-n8QhCDAC-amWN1',
    likes: '1.2k',
    comments: '87',
    timeAgo: '2 weeks ago',
  },
  {
    type: 'video',
    photo: '/students/student2.jpg',
    quote:
      'The expert guidance made my visa process smooth and stress-free.',
    name: 'Anjali',
    handle: '@anjali.studies',
    platform: 'YouTube',
    videoUrl:
      'https://www.youtube.com/embed/4avS00vBDI8?si=92cf8G2vCsPT3qxQ',
    likes: '980',
    comments: '54',
    timeAgo: '1 month ago',
  },
  {
    type: 'video',
    photo: '/students/student3.jpg',
    quote:
      'Highly recommend for IELTS preparation and university admissions.',
    name: 'Ramesh',
    handle: '@ramesh_ielts',
    platform: 'YouTube',
    videoUrl:
      'https://www.youtube.com/embed/a_Eq1P1UO4I?si=vGUBDWWWUCJrsiO_',
    likes: '720',
    comments: '33',
    timeAgo: '3 months ago',
  },
  {
    type: 'video',
    photo: '/students/student4.jpg',
    quote:
      'From shortlisting universities to final visa approval, they were with me at every step.',
    name: 'Priya',
    handle: '@priya.abroad',
    platform: 'YouTube',
    videoUrl:
      'https://www.youtube.com/embed/CgCVZdcKcqY?si=27V1QekH4sNdLGpt',
    likes: '1.8k',
    comments: '102',
    timeAgo: '5 months ago',
  },
  {
    type: 'text',
    photo: '/students/student5.jpg',
    quote:
      'Great counselling and realistic options. Visa came faster than I expected.',
    name: 'Neha',
    handle: '@neha_reviews',
    platform: 'Google Review',
    likes: '410',
    comments: '21',
    timeAgo: '1 week ago',
  },
];

function VideoTestimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: 'center',
      draggable: false,
      containScroll: 'trimSnaps',
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: true,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi || !emblaApi.canScrollPrev()) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi || !emblaApi.canScrollNext()) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(168,159,255,0.18),_transparent_60%)]" />

      {/* Heading aligned with DestinationsSection */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3 text-[#110053]">
          Student <span className="text-[#5e4bb8]">testimonials</span>
        </h2>
        <p className="text-base sm:text-lg max-w-2xl mx-auto text-[#4b5563]">
          Clips and reviews from students who trusted EducationTreeGlobal with their study abroad journey.
        </p>
      </div>

      <div className="relative">
        {/* left arrow */}
        <button
          type="button"
          onClick={scrollPrev}
          disabled={!canPrev}
          className={`
            hidden sm:flex
            absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-10
            h-9 w-9 rounded-full border border-[#e4e1ff]
            shadow-md items-center justify-center
            transition-all duration-200
            ${
              canPrev
                ? 'bg-white/90 hover:bg-[#f4f2ff] hover:text-[#7a68d7]'
                : 'bg-white/60 text-[#d1d5db] cursor-not-allowed'
            }
          `}
          aria-label="Previous testimonial"
        >
          ‹
        </button>

        {/* right arrow */}
        <button
          type="button"
          onClick={scrollNext}
          disabled={!canNext}
          className={`
            hidden sm:flex
            absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-10
            h-9 w-9 rounded-full border border-[#e4e1ff]
            shadow-md items-center justify-center
            transition-all duration-200
            ${
              canNext
                ? 'bg-white/90 hover:bg-[#f4f2ff] hover:text-[#7a68d7]'
                : 'bg-white/60 text-[#d1d5db] cursor-not-allowed'
            }
          `}
          aria-label="Next testimonial"
        >
          ›
        </button>

        {/* Embla viewport */}
        <div
          className="embla overflow-hidden"
          ref={emblaRef}
          tabIndex={0}
          role="region"
          aria-label="Testimonials carousel"
        >
          <div className="embla__container flex gap-6">
            {videoReviews.map((review, index) => {
              const isActive = index === selectedIndex;

              return (
                <div
                  key={index}
                  className={`
                    embla__slide
                    flex-[0_0_100%]
                    sm:flex-[0_0_70%]
                    md:flex-[0_0_55%]
                    lg:flex-[0_0_45%]
                    min-w-0
                    transition-all duration-500
                    ${
                      isActive
                        ? 'scale-[1.02] translate-y-0'
                        : 'scale-[0.97] translate-y-1 opacity-90'
                    }
                  `}
                  aria-label={`Testimonial from ${review.name}`}
                  role="group"
                >
                  <article className="h-full bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl border border-[#e4e1ff] transition-all duration-300 flex flex-col">
                    {/* header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 relative rounded-full overflow-hidden border-2 border-[#a89fff]/40 shadow-md">
                          <FallbackImage
                            src={review.photo}
                            alt={`Photo of ${review.name}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#110053]">
                            {review.name}
                          </p>
                          <p className="text-[11px] text-[#6b7280]">
                            {review.handle}
                          </p>
                        </div>
                      </div>

                      <p className="text-[10px] text-[#9ca3af]">
                        {review.timeAgo}
                      </p>
                    </div>

                    {/* body */}
                    <div className="flex-1 flex flex-col gap-3">
                      {review.type === 'video' ? (
                        <div className="relative w-full rounded-xl overflow-hidden bg-black/5 border border-[#e5e7eb] shadow-inner aspect-video">
                          <iframe
                            src={review.videoUrl}
                            title={`${review.name} testimonial video`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                          />
                          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent" />
                        </div>
                      ) : (
                        <blockquote className="text-sm italic text-[#4a4560] leading-relaxed">
                          “{review.quote}”
                        </blockquote>
                      )}

                      {review.type === 'video' && (
                        <p className="text-xs text-[#4b5563] leading-relaxed">
                          “{review.quote}”
                        </p>
                      )}
                    </div>

                    {/* footer */}
                    <div className="mt-4 flex items-center justify-between text-[11px] text-[#6b7280]">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 hover:text-[#7a68d7] transition-colors"
                        >
                          <span className="inline-block h-3 w-3 rounded-full bg-[#ef4444]" />
                          <span>{review.likes}</span>
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 hover:text-[#7a68d7] transition-colors"
                        >
                          <span className="inline-block h-3 w-3 rounded-full bg-[#6366f1]" />
                          <span>{review.comments} comments</span>
                        </button>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#f3f4ff] text-[#7a68d7]">
                        {review.platform}
                      </span>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2) Google review cards – same gradient band */

function GoogleReviews() {
  return (
    <div className="w-full bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#EBE8FF] pb-20 mt-12">
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-4"
        aria-label="Google reviews"
      >
        {/* header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#8b7ae8]">
              Google Business Review
            </p>
            <div className="mt-2 flex items-center gap-3">
              <span className="text-3xl font-semibold text-[#110053]">
                4.9
              </span>
              <div className="flex items-center gap-0.5 text-[#fbbf24] text-lg">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <span className="text-xs text-[#6b7280]">
                Based on recent student reviews
              </span>
            </div>
          </div>

          <a
            href="https://www.google.com/search?sca_esv=f49db6828bbb6a84&sxsrf=AHTn8zpo2ZIAJFZ71HYVjNt8LVZc5JABWQ:1739167146535&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzbAJRWF7QUzBvdjbl-LRAsNwz-2UG32r8KNJZySWmYxWWKXPZExuLJrymUszKEZMcEJRW3msaLubvA0_eOaSzZ-hfq-y0YNjqnkwbD8ChMNmp3RaSw%3D%3D&q=Nice+Education+Consultancy+Reviews&sa=X&ved=2ahUKEwjIjeW_triLAxUKwjgGHSvqFGgQ0bkNegQIJxAE&biw=1536&bih=695&dpr=1.25&sei=0JWpZ5P2Jcfi4-EP9sP-sAI"
            target="_blank"
            rel="noreferrer"
            className="
              inline-flex items-center gap-2
              px-4 py-2 rounded-full
              text-xs sm:text-sm font-medium
              bg-white text-[#4f46e5]
              border border-[#e4e1ff]
              shadow-sm
              hover:bg-[#f4f2ff] hover:text-[#4338ca]
              transition-colors
            "
          >
            <span>See all our reviews</span>
            <svg
              className="w-3.5 h-3.5"
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
          </a>
        </div>

        {/* 5 Google-style review cards */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Abishek */}
          <article className="bg-white rounded-2xl border border-[#e4e1ff] shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="/images/abishek.jpg"
                  alt="Abishek Bhandari"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#110053]">
                    Abishek Bhandari
                  </p>
                  <p className="text-[11px] text-[#6b7280]">5 reviews • 3 months ago</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#fbbf24]">
                <span>5.0</span>
                <span>★</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
              I had been researching options for studying abroad. Australia, the UK, and the USA were on my list, but the process felt overwhelming.
              A friend recommended EducationTreeGlobal and from my first visit I felt like I was in good hands. The counsellors were patient and straightforward, and helped me compare education systems, costs and visa options without rushing me.
            </p>
          </article>

          {/* Pankaj */}
          <article className="bg-white rounded-2xl border border-[#e4e1ff] shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="/images/pankaj.jpg"
                  alt="Pankaj Dhungel"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#110053]">
                    Pankaj Dhungel
                  </p>
                  <p className="text-[11px] text-[#6b7280]">5 reviews • 2 months ago</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#fbbf24]">
                <span>5.0</span>
                <span>★</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
              I am very grateful to EducationTreeGlobal for their outstanding support throughout my visa process. From the beginning they guided me step by step with clear, professional advice, which made the journey smooth and stress‑free. A special thanks to Mr. Damodar Sir for detailed answers, motivation in tough moments, and personal care that helped my visa succeed.
            </p>
          </article>

          {/* Puskar */}
          <article className="bg-white rounded-2xl border border-[#e4e1ff] shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="/images/puskar.jpg"
                  alt="Puskar Sharma Paudel"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#110053]">
                    Puskar Sharma Paudel
                  </p>
                  <p className="text-[11px] text-[#6b7280]">5 reviews • 3 months ago</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#fbbf24]">
                <span>5.0</span>
                <span>★</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
              EducationTreeGlobal has been one of the best consultancies for a foreign study pathway in Nepal. My process was handled smoothly and I feel lucky to have worked with them. I&apos;m thankful to all the members, especially Damodar Sharma Sir, for his guidance. If you want to fulfil your foreign study dreams, visit this consultancy — you won&apos;t regret it.
            </p>
          </article>

          {/* Priya */}
          <article className="bg-white rounded-2xl border border-[#e4e1ff] shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="/images/priya.jpg"
                  alt="Priya Pandey"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#110053]">
                    Priya Pandey
                  </p>
                  <p className="text-[11px] text-[#6b7280]">5 reviews • 4 months ago</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#fbbf24]">
                <span>5.0</span>
                <span>★</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
              I had a wonderful experience with EducationTreeGlobal. From the very beginning the team provided clear guidance and full support throughout my UK student visa process. Everything was handled professionally, making the journey smooth and stress‑free. Special thanks to CEO Mr. Damodar Sharma for his personal involvement, encouragement, and expert advice.
            </p>
          </article>

          {/* Sujan */}
          <article className="bg-white rounded-2xl border border-[#e4e1ff] shadow-sm p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <img
                  src="/images/sujan.jpg"
                  alt="Sujan Tamang"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-[#110053]">
                    Sujan Tamang
                  </p>
                  <p className="text-[11px] text-[#6b7280]">5 reviews • 3 weeks ago</p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#fbbf24]">
                <span>5.0</span>
                <span>★</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed">
              Journey at EducationTreeGlobal has been amazing. From day one all the staff were very supportive, especially Bhimsen Baral Sir and Avinav Sir who motivated and helped me in every aspect. Thank you EducationTreeGlobal and family.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}


/* 3) Combined export – drop this into your page */

export default function ReviewsSection() {
  return (
    <section className="w-full bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#EBE8FF]">
      <VideoTestimonials />
      <GoogleReviews />
    </section>
  );
}
