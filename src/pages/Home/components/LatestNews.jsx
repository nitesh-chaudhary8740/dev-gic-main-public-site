import React, { useState, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react"; // Lucide icons import kiye

const LatestNews = () => {
  const [isPlaying, setIsPlaying] = useState(true);

  // 1. Dummy Data (Aap ise API se replace kar sakte hain)
  const newsData = [
    {
      id: 1,
      text: "Careers/Apprentice: ADVT/MDLATS/01/2023 - For Appointment of Instructor (On Contract) in MDL - Apprentice Training School (ATS)",
      link: "#",
    },
    {
      id: 2,
      text: "GeM Tender - Procurement Of Scanning And Digitisation Services",
      link: "#",
    },
    {
      id: 3,
      text: "Notice regarding Technical Evaluation for the post of Engineer",
      link: "#",
    },
    {
      id: 4,
      text: "Pre-Bid Meeting for Supply of Naval Equipment",
      link: "#",
    },
  ];

  // Duplicate items for seamless infinite scroll
  const items = [...newsData, ...newsData];

  return (
    <section
      aria-label="Latest News Ticker"
      className="w-full px-4 sm:px-6 lg:px-8 bg-gray-100 text-gray-800 border-y border-gray-300 overflow-hidden"
    >
      <div className="flex items-center gap-3 py-2 px-4">
        
        {/* Left: Heading + Sound Icon */}
        <div className="flex items-center gap-2 shrink-0 text-blue-800">
          <span className="font-bold text-[18px] whitespace-nowrap">
            Latest News
          </span>
          {/* Lucide ka Volume2 icon use kiya */}
          <Volume2 size={18} aria-hidden="true" />
        </div>

        {/* Middle: Marquee (Scrolling Text) */}
        <div className="flex-1 overflow-hidden relative">
          <div
            className={`marquee-track ${isPlaying ? "" : "paused"}`}
            aria-live="off"
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-3 whitespace-nowrap"
              >
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] font-medium text-gray-700 hover:underline focus:underline"
                  >
                    {item.text}
                  </a>
                ) : (
                  <span className="text-[14px] font-medium text-gray-700">
                    {item.text}
                  </span>
                )}
                {/* Separator Dot */}
                <span className="mx-6 text-gray-400" aria-hidden="true">
                  •
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Play/Pause Button */}
        <button
          type="button"
          onClick={() => setIsPlaying((p) => !p)}
          aria-label={isPlaying ? "Pause news" : "Play news"}
          className="shrink-0 text-blue-800 p-1 hover:opacity-70"
        >
          {isPlaying ? (
            <Pause size={16} fill="currentColor" />
          ) : (
            <Play size={16} fill="currentColor" />
          )}
        </button>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .marquee-track {
          display: inline-flex;
          width: max-content;
          animation: marquee 40s linear infinite;
        }

        .marquee-track:focus-within {
          animation-play-state: paused;
        }

        .paused {
          animation-play-state: paused;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default LatestNews;