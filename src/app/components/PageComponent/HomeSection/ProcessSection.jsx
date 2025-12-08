'use client';

import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    title: 'Counseling',
    description: 'We understand your goals, background, and preferred destinations.',
    align: 'left',
    icon: '💬',
  },
  {
    title: 'Course Selection',
    description: 'Shortlist universities and programs that fit your profile.',
    align: 'right',
    icon: '🎓',
  },
  {
    title: 'Documentation',
    description: 'Prepare and review all academic and financial documents.',
    align: 'left',
    icon: '📄',
  },
  {
    title: 'Visa Lodgement',
    description: 'Submit your visa file with complete guidance from our team.',
    align: 'right',
    icon: '🛂',
  },
  {
    title: 'Departure',
    description: 'Pre-departure briefing so you land confident and prepared.',
    align: 'left',
    icon: '✈️',
  },
];

export default function ProcessScrollFlow() {
  return (
    <section className="w-full bg-[#faf9ff] py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#110053] text-center mb-12">
          Our{' '}
          <span className="bg-gradient-to-r from-[#8b7ae8] via-[#7a68d7] to-[#6957c6] bg-clip-text text-transparent animate-gradient">
            Process
          </span>
        </h2>
        <div className="space-y-16">
          {steps.map((step, idx) => (
            <ScrollStep
              key={step.title}
              index={idx}
              title={step.title}
              description={step.description}
              align={step.align}
              icon={step.icon}
            />
          ))}
        </div>
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
        @keyframes step-fade-up {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .step-animate-in {
          animation: step-fade-up 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

function ScrollStep({ index, title, description, align, icon }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0); // 0 → 1

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;

      const start = vh * 0.8;
      const end = vh * 0.2;
      const center = rect.top + rect.height / 2;

      let p = (start - center) / (start - end);
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      setProgress(p);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const isLeft = align === 'left';

  // These control the connector overlap—tweak as needed for your design
  const PATH_LENGTH = 110; // shorter so endpoint is closer to circle
  const dashOffset = PATH_LENGTH * (1 - progress);
  const cardVisible = progress > 0.15;

  // Negative margin so the card/circle overlap the timeline
  const CARD_OFFSET = 28; // px - tune depending on visual, try 28~36

  return (
    <div
      ref={ref}
      className="relative min-h-[220px] md:min-h-[260px] flex items-center"
    >
      {/* Center vertical guide line */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#e4e0ff]" />

      {/* Thin chic connector for this step (desktop) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {isLeft ? (
            <>
              {/* subtle background line – hairline */}
              <path
                d="M50 0 V50 H41"
                fill="none"
                stroke="#e6e2ff"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
              {/* glow layer – thin + soft */}
              <path
                d="M50 0 V50 H41"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeOpacity={0.22 + progress * 0.18}
                filter="url(#flowGlow)"
                style={{
                  strokeDasharray: PATH_LENGTH,
                  strokeDashoffset: dashOffset,
                  transition: 'stroke-dashoffset 0.35s linear',
                }}
              />
              {/* main line – slim */}
              <path
                d="M50 0 V50 H41"
                fill="none"
                stroke="url(#grad)"
                strokeWidth={0.9 + progress * 0.3}
                strokeLinecap="round"
                style={{
                  strokeDasharray: PATH_LENGTH,
                  strokeDashoffset: dashOffset,
                  transition: 'stroke-dashoffset 0.35s linear, stroke-width 0.35s ease',
                }}
              />
            </>
          ) : (
            <>
              {/* subtle background line – hairline */}
              <path
                d="M50 0 V50 H59"
                fill="none"
                stroke="#e6e2ff"
                strokeWidth="0.6"
                strokeLinecap="round"
              />
              {/* glow layer – thin + soft */}
              <path
                d="M50 0 V50 H59"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeOpacity={0.22 + progress * 0.18}
                filter="url(#flowGlow)"
                style={{
                  strokeDasharray: PATH_LENGTH,
                  strokeDashoffset: dashOffset,
                  transition: 'stroke-dashoffset 0.35s linear',
                }}
              />
              {/* main line – slim */}
              <path
                d="M50 0 V50 H59"
                fill="none"
                stroke="url(#grad)"
                strokeWidth={0.9 + progress * 0.3}
                strokeLinecap="round"
                style={{
                  strokeDasharray: PATH_LENGTH,
                  strokeDashoffset: dashOffset,
                  transition: 'stroke-dashoffset 0.35s linear, stroke-width 0.35s ease',
                }}
              />
            </>
          )}

          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c5bcff" />
              <stop offset="50%" stopColor="#8b7ae8" />
              <stop offset="100%" stopColor="#5c4ac9" />
            </linearGradient>

            {/* soft glow */}
            <filter id="flowGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.8" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.78
                        0 0 0 0 0.73
                        0 0 0 0 1
                        0 0 0 0.55 0"
              />
            </filter>
          </defs>
        </svg>
      </div>

      {/* CARD: hierarchy + hover micro‑interaction */}
      <div
        className={`
          group
          relative max-w-xs md:max-w-sm w-full
          ${
            isLeft
              ? `md:ml-[-${CARD_OFFSET}px] md:mr-auto md:text-left text-center`
              : `md:mr-[-${CARD_OFFSET}px] md:ml-auto md:text-right text-center`
          }
          ${cardVisible ? 'step-animate-in' : 'opacity-0 translate-y-6'}
        `}
        style={{
          animationDelay: cardVisible ? `${0.25 + index * 0.08}s` : '0s',
        }}
      >
        <div
          className={`
            bg-white/95 backdrop-blur-sm
            rounded-3xl border border-[#ebe6ff]
            shadow-[0_14px_35px_rgba(17,0,83,0.06)]
            px-6 py-6
            transition-all duration-300
            group-hover:shadow-[0_20px_45px_rgba(17,0,83,0.12)]
            group-hover:-translate-y-1.5
            group-hover:border-[#d2c7ff]
          `}
        >
          {/* Icon circle */}
          <div className="
            w-12 h-12 mx-auto mb-3
            rounded-full bg-[#f3f0ff]
            flex items-center justify-center
            shadow-[0_6px_16px_rgba(104,87,198,0.25)]
            transition-transform duration-300
            group-hover:scale-105
          ">
            <span className="text-xl">{icon}</span>
          </div>

          {/* Step label */}
          <p className="
            text-[11px] font-semibold tracking-[0.12em]
            text-[#7a68d7] uppercase mb-1
          ">
            STEP {index + 1}
          </p>

          {/* Title */}
          <p className="
            text-base font-semibold text-[#110053] mb-1.5
          ">
            {title}
          </p>

          {/* Description */}
          <p className="
            text-sm leading-relaxed text-[#5a5470]
          ">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
