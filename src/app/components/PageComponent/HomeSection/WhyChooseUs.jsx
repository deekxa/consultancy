"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  FiAward,
  FiClock,
  FiHelpCircle,
  FiHeart,
  FiUsers,
  FiCheckCircle,
  FiBriefcase,
  FiTrendingUp,
  FiThumbsUp,
  FiGlobe,
  FiHeadphones,
  FiTarget,
} from "react-icons/fi";
import FallbackImage from "../../ui/FallbackImage";

const features = [
  {
    icon: FiAward,
    title: "Trusted university network",
    description:
      "Carefully selected public and private institutions across key destinations.",
  },
  {
    icon: FiClock,
    title: "Streamlined timelines",
    description:
      "Fast responses on offers and visas so you can plan with confidence.",
  },
  {
    icon: FiHelpCircle,
    title: "Guidance at every step",
    description:
      "One team handling your profile from shortlisting to pre‑departure.",
  },
  {
    icon: FiHeart,
    title: "Student‑first decisions",
    description:
      "Recommendations based on fit, not on agency quotas or commissions.",
  },
];

const stats = [
  { icon: FiUsers, value: "500+", label: "Students Helped" },
  { icon: FiCheckCircle, value: "98%", label: "Visa Success" },
  { icon: FiBriefcase, value: "15+", label: "Years Experience" },
  { icon: FiAward, value: "50+", label: "Industry Awards" },
  { icon: FiThumbsUp, value: "200+", label: "Happy Clients" },
  { icon: FiGlobe, value: "10+", label: "Countries Served" },
  { icon: FiHeadphones, value: "24/7", label: "Support" },
  { icon: FiTarget, value: "25+", label: "Expert Counselors" },
];

export default function WhyChooseUs() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    draggable: false,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <section
        aria-label="Why Choose Us"
        className="relative py-20 bg-linear-to-br from-[#faf9ff] via-[#f0edff] to-[#EBE8FF]"
      >
        <div className="max-w-6xl mx-auto px-3 lg:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="relative shrink-0 flex items-center justify-center">
              <div
                className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#f6f4ff] flex items-center justify-center px-10"
                style={{
                  boxShadow:
                    "inset 8px 8px 16px rgba(255, 255, 255, 0.7), inset -8px -8px 16px rgba(148, 138, 213, 0.15)",
                }}
              >
                <div className="ml-6 sm:ml-8 max-w-40 sm:max-w-[190px] text-[11px] sm:text-sm leading-relaxed text-[#4b5563]">
                  <p className="mb-2">
                    A calm, structured process built around clarity, timelines,
                    and realistic options.
                  </p>
                  <p>
                    You always know your next step and why each recommendation
                    fits your profile.
                  </p>
                </div>
              </div>

              <div className="absolute left-[-18%] sm:left-[-16%] top-1/2 -translate-y-1/2">
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-linear-to-br from-[#110053] to-[#4f46e5] flex items-center justify-center shadow-[0_10px_20px_rgba(88,80,200,0.55)]">
                  <div className="absolute inset-1 rounded-full border border-white/25 opacity-80" />
                  <div className="absolute inset-x-4 top-3 h-6 rounded-full bg-white/18 blur-[6px]" />
                  <div className="relative text-center text-white px-3">
                    <p className="text-[10px] tracking-[0.22em] uppercase mb-1">
                      WHY
                    </p>
                    <p className="text-base sm:text-lg font-semibold leading-snug">
                      CHOOSE
                      <br />
                      US
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full">
              <div className="relative pl-4 sm:pl-5">
                <div className="hidden md:block absolute left-2.5 top-2 bottom-2">
                  <div className="w-[3px] h-full rounded-full bg-linear-to-b from-[#c7b8ff] via-[#a5b4fc] to-[#e5e7eb]" />
                </div>

                <div className="space-y-7">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    const gradients = [
                      "linear-gradient(135deg, #c7b8ff, #8b7ae8)",
                      "linear-gradient(135deg, #a5b4fc, #7c84f2)",
                      "linear-gradient(135deg, #6ee7b7, #14b8a6)",
                      "linear-gradient(135deg, #e5e7eb, #9ca3af)",
                    ];
                    return (
                      <div
                        key={feature.title}
                        className="group flex items-center gap-3 sm:gap-4 transition-colors duration-200"
                      >
                        <div className="relative shrink-0">
                          <div
                            className="flex items-center justify-center w-10 h-10 rounded-full shadow-[0_8px_22px_rgba(88,80,200,0.2)] transition-transform duration-200 group-hover:-translate-y-0.5"
                            style={{ backgroundImage: gradients[index] }}
                          >
                            <Icon className="text-white" size={18} />
                          </div>
                        </div>
                        <div className="flex-1 flex items-center gap-3">
                          <div className="hidden sm:block flex-1 border-t border-[#e2e0ff]" />
                          <div className="flex-2 leading-snug">
                            <h3 className="text-sm sm:text-base font-semibold text-[#110053] mb-0.5 transition-colors duration-200 group-hover:text-[#4f46e5]">
                              {feature.title}
                            </h3>
                            <p className="text-[12px] sm:text-sm text-[#4b5563] transition-colors duration-200 group-hover:text-[#374151]">
                              {feature.description}
                            </p>
                            <span className="mt-1 inline-block h-px w-8 bg-transparent group-hover:bg-[#d1d5db] transition-colors duration-200" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Statistics"
        className="bg-white py-12"
        style={{ paddingLeft: 0, paddingRight: 0 }}
      >
        <div style={{ padding: 0, margin: 0, maxWidth: "100%" }}>
          <Slider {...settings}>
            {stats.map(({ icon, value, label }, idx) => {
              const Icon = icon;
              return (
                <div
                  key={idx}
                  style={{
                    width: "110px",
                    minWidth: "80px",
                    margin: "0 2px",
                    height: "120px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    background: "white",
                    borderRadius: "12px",
                    border: "1px solid #e6e6f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      marginBottom: "12px",
                      color: "#110053",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={44} strokeWidth={1.5} />
                  </div>
                  <p
                    style={{
                      fontWeight: 700,
                      color: "#110053",
                      fontSize: "1.1rem",
                      margin: 0,
                      textAlign: "center",
                    }}
                  >
                    {value}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#6b7280",
                      margin: 0,
                      marginTop: "4px",
                      textAlign: "center",
                    }}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </Slider>
        </div>
      </section>
    </>
  );
}
