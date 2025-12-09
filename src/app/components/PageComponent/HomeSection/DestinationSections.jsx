"use client";

import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const destinations = [
  {
    name: "Australia",
    flag: "/flags/australia.png",
    description: "Top universities and vibrant culture.",
    slug: "australia",
    coordinates: [-25.274398, 133.775136],
    stats: {
      universities: "43 Top Universities",
      avgCost: "$20,000 - $45,000/year",
      visaSuccess: "95%",
      workRights: "20 hrs/week during term",
    },
    highlights: [
      "Work while studying",
      "Post-study work visa",
      "High quality of life",
    ],
    popularPrograms: ["Engineering", "Business", "Healthcare"],
    intakeSeasons: "Feb, Jul",
    languageReq: "IELTS 6.5+",
    prOpportunity: "Yes",
  },
  {
    name: "Canada",
    flag: "/flags/canada.png",
    description: "Friendly cities with excellent study options.",
    slug: "canada",
    coordinates: [56.130366, -106.346771],
    stats: {
      universities: "96 Top Universities",
      avgCost: "$15,000 - $35,000/year",
      workRights: "20 hrs/week during term",
    },
    highlights: [
      "Affordable education",
      "PR opportunities",
      "Safe & welcoming",
    ],
    popularPrograms: ["IT & Computing", "Business", "Engineering"],
    intakeSeasons: "Jan, Sep",
    languageReq: "IELTS 6.5+",
    prOpportunity: "Yes",
  },
  {
    name: "UK",
    flag: "/flags/uk.png",
    description: "Historic campuses and global career prospects.",
    slug: "uk",
    coordinates: [55.378051, -3.435973],
    stats: {
      universities: "90+ Top Universities",
      avgCost: "$15,000 - $40,000/year",
      visaSuccess: "88%",
      workRights: "20 hrs/week during term",
    },
    highlights: [
      "Shorter degree programs",
      "Rich academic heritage",
      "Global recognition",
    ],
    popularPrograms: ["Finance", "Law", "Medicine"],
    intakeSeasons: "Sep, Jan",
    languageReq: "IELTS 6.0+",
    prOpportunity: "Limited",
  },
  {
    name: "USA",
    flag: "/flags/usa.png",
    description: "Diverse programs with cutting-edge research.",
    slug: "usa",
    coordinates: [37.09024, -95.712891],
    stats: {
      universities: "150+ Top Universities",
      avgCost: "$25,000 - $55,000/year",
      visaSuccess: "85%",
      workRights: "On-campus only",
    },
    highlights: [
      "World-class research",
      "Scholarship opportunities",
      "Diverse campus life",
    ],
    popularPrograms: ["Computer Science", "MBA", "Engineering"],
    intakeSeasons: "Fall, Spring",
    languageReq: "IELTS 6.5+ / TOEFL 80+",
    prOpportunity: "Limited",
  },
  {
    name: "Japan",
    flag: "/flags/japan.png",
    description: "Blend of tradition and innovation for students.",
    slug: "japan",
    coordinates: [36.204824, 138.252924],
    stats: {
      universities: "35+ Top Universities",
      avgCost: "$8,000 - $15,000/year",
      visaSuccess: "90%",
      workRights: "28 hrs/week",
    },
    highlights: ["Affordable tuition", "MEXT scholarships", "Tech innovation"],
    popularPrograms: ["Robotics", "Animation", "Business"],
    intakeSeasons: "Apr, Oct",
    languageReq: "JLPT N2 or English",
    prOpportunity: "Yes",
  },
  {
    name: "Korea",
    flag: "/flags/korea.png",
    description: "Fast-growing education sector with modern facilities.",
    slug: "korea",
    coordinates: [35.907757, 127.766922],
    stats: {
      universities: "30+ Top Universities",
      avgCost: "$7,000 - $18,000/year",
      visaSuccess: "91%",
      workRights: "20 hrs/week",
    },
    highlights: ["K-culture experience", "Tech hub", "Government scholarships"],
    popularPrograms: ["Media Studies", "Engineering", "Business"],
    intakeSeasons: "Mar, Sep",
    languageReq: "TOPIK 3+ or English",
    prOpportunity: "Limited",
  },
  {
    name: "New Zealand",
    flag: "/flags/new-zealand.png",
    description: "Scenic landscapes and quality education.",
    slug: "new-zealand",
    coordinates: [-40.900557, 174.885971],
    stats: {
      universities: "8 Top Universities",
      avgCost: "$18,000 - $35,000/year",
      visaSuccess: "93%",
      workRights: "20 hrs/week during term",
    },
    highlights: [
      "Work-study balance",
      "Beautiful environment",
      "Quality education",
    ],
    popularPrograms: ["Agriculture", "Tourism", "Environmental Science"],
    intakeSeasons: "Feb, Jul",
    languageReq: "IELTS 6.0+",
    prOpportunity: "Yes",
  },
  {
    name: "Europe",
    flag: "/flags/europe.png",
    description: "Includes Germany, Finland, France and more.",
    slug: "europe",
    coordinates: [50.110924, 9.018326],
    stats: {
      universities: "200+ Top Universities",
      avgCost: "$0 - $20,000/year",
      visaSuccess: "87%",
      workRights: "Varies by country",
    },
    highlights: [
      "Low/no tuition in many countries",
      "Schengen travel",
      "Rich culture",
    ],
    popularPrograms: ["Engineering", "Arts", "Research"],
    intakeSeasons: "Sep, Jan",
    languageReq: "Varies by country",
    prOpportunity: "Yes (Germany, etc.)",
  },
];

const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36">
        <path fill="#4f46e5" stroke="#4338ca" stroke-width="2" d="M12 0C7.029 0 3 4.029 3 9c0 7.5 9 18 9 18s9-10.5 9-18c0-4.971-4.029-9-9-9z"/>
        <circle cx="12" cy="9" r="3" fill="white"/>
      </svg>
    `),
  iconSize: [24, 36],
  iconAnchor: [12, 36],
  popupAnchor: [0, -36],
});

export default function DestinationsSection() {
  const [activeView, setActiveView] = useState("grid");
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [counts, setCounts] = useState({
    countries: 0,
    universities: 0,
    visaSuccess: 0,
    students: 0,
  });
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStatsVisible) setIsStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      if (statsRef.current) observer.unobserve(statsRef.current);
    };
  }, [isStatsVisible]);

  useEffect(() => {
    if (!isStatsVisible) return;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targets = {
      countries: 8,
      universities: 500,
      visaSuccess: 95,
      students: 10000,
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const p = currentStep / steps;

      setCounts({
        countries: Math.floor(targets.countries * p),
        universities: Math.floor(targets.universities * p),
        visaSuccess: Math.floor(targets.visaSuccess * p),
        students: Math.floor(targets.students * p),
      });

      if (currentStep >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isStatsVisible]);

  const formatNumber = (num) =>
    num >= 1000 ? (num / 1000).toFixed(0) + "K" : num;

  return (
    <section className="w-full pt-20  bg-gradient-to-br from-[#faf9ff] via-[#f0edff] to-[#EBE8FF]">
    

      <div className="max-w-7xl mx-auto px-6 lg:px-8 ">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3 text-[#110053]">
            Study <span className="text-[#5e4bb8]">destinations</span>
          </h2>
          <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 text-[#4b5563]">
            Compare countries by cost, visa success and work options to find
            your best fit.
          </p>
          <div className="inline-flex relative bg-white rounded-full p-1 shadow-sm border border-[#e5e7eb] overflow-hidden">
            <div
              className={`
                absolute inset-y-1 w-1/2 rounded-full bg-[#111827]
                transition-all duration-500 ease-in-out
                ${activeView === "grid" ? "left-1" : ""}
                ${activeView === "map" ? "left-1/2" : ""}
              `}
            />
            <button
              onClick={() => setActiveView("grid")}
              className={`
                relative z-10 px-5 py-2 rounded-full text-sm font-medium 
                transition-all duration-300 cursor-pointer
                ${
                  activeView === "grid"
                    ? "text-white"
                    : "text-[#4b5563] hover:text-[#111827] hover:scale-105"
                }
              `}
            >
              Browse
            </button>
            <button
              onClick={() => setActiveView("map")}
              className={`
                relative z-10 px-5 py-2 rounded-full text-sm font-medium 
                transition-all duration-300 cursor-pointer
                ${
                  activeView === "map"
                    ? "text-white"
                    : "text-[#4b5563] hover:text-[#111827] hover:scale-105"
                }
              `}
            >
              Map
            </button>
          </div>
        </div>

        {activeView === "map" && (
          <div className="mb-12 animate-fadeIn">
            <div className="relative z-0 w-full h-[500px] md:h-[600px] rounded-2xl shadow-sm overflow-hidden border border-[#e5e7eb] bg-white hover:shadow-lg transition-shadow duration-300">
              <MapContainer
                center={[20, 0]}
                zoom={2}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
                keyboard={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {destinations.map((destination) => (
                  <Marker
                    key={destination.name}
                    position={destination.coordinates}
                    icon={customIcon}
                  >
                    <Tooltip direction="top" offset={[0, -30]} opacity={0.9}>
                      <div style={{ textAlign: "center", fontWeight: 600 }}>
                        {destination.name}
                      </div>
                    </Tooltip>
                    <Popup>
                      <div style={{ padding: "12px", minWidth: "250px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            marginBottom: "12px",
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "24px",
                              position: "relative",
                            }}
                          >
                            <img
                              src={destination.flag}
                              alt={destination.name}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                          <h3
                            style={{
                              margin: 0,
                              color: "#111827",
                              fontSize: "16px",
                              fontWeight: 600,
                            }}
                          >
                            {destination.name}
                          </h3>
                        </div>
                        <div
                          style={{ marginBottom: "12px", fontSize: "13px" }}
                        >
                          <div
                            style={{ color: "#4b5563", marginBottom: "4px" }}
                          >
                            🎓 {destination.stats.universities}
                          </div>
                          <div
                            style={{ color: "#4b5563", marginBottom: "4px" }}
                          >
                            💰 {destination.stats.avgCost}
                          </div>
                          <div style={{ color: "#4b5563" }}>
                            ✅ {destination.stats.visaSuccess} visa success
                          </div>
                        </div>
                        <a
                          href={`/destinations/${destination.slug}`}
                          style={{
                            display: "inline-block",
                            background: "#111827",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "999px",
                            textDecoration: "none",
                            fontWeight: 600,
                            fontSize: "13px",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "#4f46e5";
                            e.target.style.transform = "scale(1.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "#111827";
                            e.target.style.transform = "scale(1)";
                          }}
                        >
                          Explore {destination.name} →
                        </a>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        )}

        {activeView === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 mb-4">
            {destinations.map((destination) => (
              <div
                key={destination.name}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-[#e5e7eb] hover:border-[#4f46e5] transition-all duration-700 cursor-pointer hover:scale-105 hover:-translate-y-2 w-full max-w-[380px] flex flex-col"
              >
                <img
                  src={`/country/${destination.slug}.jpg`}
                  alt={destination.name}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-[#111827] mb-2 group-hover:text-[#4f46e5] transition-colors duration-300">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-[#6b7280] mb-4 line-clamp-3 flex-grow">
                    {destination.description}
                  </p>
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#111827] group-hover:text-[#4f46e5] transition-all duration-300"
                  >
                    Learn more
                    <svg
                      className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-full bg-white border-y border-[#e5e7eb] mt-24 ">
        <div
          ref={statsRef}
          className="mx-auto max-w-none grid grid-cols-2 md:grid-cols-4 gap-4 py-6 sm:py-8"
        >
          <div className="text-center group hover:scale-110 transition-all duration-300 cursor-default">
            <div className="text-3xl md:text-4xl font-semibold text-[#111827] mb-1 tabular-nums group-hover:text-[#4f46e5] transition-colors duration-300">
              {counts.countries}+
            </div>
            <div className="text-xs uppercase tracking-wide text-[#6b7280] group-hover:text-[#4b5563] transition-colors duration-300">
              Countries
            </div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300 cursor-default">
            <div className="text-3xl md:text-4xl font-semibold text-[#111827] mb-1 tabular-nums group-hover:text-[#4f46e5] transition-colors duration-300">
              {counts.universities}+
            </div>
            <div className="text-xs uppercase tracking-wide text-[#6b7280] group-hover:text-[#4b5563] transition-colors duration-300">
              Universities
            </div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300 cursor-default">
            <div className="text-3xl md:text-4xl font-semibold text-[#111827] mb-1 tabular-nums group-hover:text-[#4f46e5] transition-colors duration-300">
              {counts.visaSuccess}%
            </div>
            <div className="text-xs uppercase tracking-wide text-[#6b7280] group-hover:text-[#4b5563] transition-colors duration-300">
              Visa success
            </div>
          </div>
          <div className="text-center group hover:scale-110 transition-all duration-300 cursor-default">
            <div className="text-3xl md:text-4xl font-semibold text-[#111827] mb-1 tabular-nums group-hover:text-[#4f46e5] transition-colors duration-300">
              {formatNumber(counts.students)}+
            </div>
            <div className="text-xs uppercase tracking-wide text-[#6b7280] group-hover:text-[#4b5563] transition-colors duration-300">
              Students placed
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </section>
  );
}
