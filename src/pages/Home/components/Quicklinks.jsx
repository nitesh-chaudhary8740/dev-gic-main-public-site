import React, { useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ExternalLink,
  Link2,
} from "lucide-react";

const quickLinksData = [
  {
    id: 1,
    title:
      "Responses to pre-bid Queries Procurement of Cyber & Crime Insurance Policy 2026 - 2027",
    link: "#",
  },
  {
    id: 2,
    title:
      "Procurement of AD Server and INFINET Server along with Comprehensive AMC for 5 Years",
    link: "#",
  },
  {
    id: 3,
    title: "Procurement of Compliance Tracking Software / Portal",
    link: "#",
  },
  {
    id: 4,
    title:
      "GIC Re Website Migration, Hosting, Portal Support and 3 Year Annual Technical Support Services",
    link: "#",
  },
  {
    id: 5,
    title: "GeM tender for Procurement of 300 Microsoft 365 Copilot Licenses",
    link: "#",
  },
];

const Quicklinks = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollRef = useRef(null);

  const scrollCards = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector("[data-card]");
    if (!card) return;

    const gap = parseFloat(window.getComputedStyle(container).columnGap) || 0;
    const cardWidth = card.getBoundingClientRect().width + gap;

    container.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelector("[data-card]");
    if (!card) return;

    const gap = parseFloat(window.getComputedStyle(container).columnGap) || 0;
    const cardWidth = card.getBoundingClientRect().width + gap;

    setCurrentIndex(Math.round(container.scrollLeft / cardWidth));
  };

  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 ">
      
      {/* Background Decoration using your primary pale token */}
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-primary-pale/40 blur-3xl" />

      <div className="relative z-10 mx-auto ">
        
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          
          <div>
            {/* Section Label using your primary pale and dark tokens */}
           

            <h2 className="text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl lg:text-[42px]">
              Quick Links
            </h2>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Left Arrow using your app_card utility */}
            <button
              type="button"
              onClick={() => scrollCards(-1)}
              aria-label="Previous quick links"
              className="app_card rounded_custom flex h-11 w-11 items-center justify-center bg-white text-primary-dark transition-all duration-300 hover:border-primary-blue hover:bg-primary-pale/30 hover:text-primary-blue"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Right Arrow using your primary blue token */}
            <button
              type="button"
              onClick={() => scrollCards(1)}
              aria-label="Next quick links"
              className="rounded_custom flex h-11 w-11 items-center justify-center bg-primary-blue text-white shadow-md shadow-primary-blue/20 transition-all duration-300 hover:bg-primary-dark"
            >
              <ChevronRight size={20} />
            </button>

          </div>
        </div>

        {/* Quick Links Cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-5"
        >
          {quickLinksData.map((item, index) => (
            <a
              key={item.id}
              data-card
              href={item.link}
              // Using your app_card utility and rounded_custom
              className="app_card rounded_custom group relative flex min-h-[240px] w-full shrink-0 snap-start flex-col justify-between overflow-hidden bg-neutral-linen p-6 transition-all duration-300 hover:border-primary-blue hover:bg-white hover:shadow-[0_12px_35px_rgba(30,70,130,0.12)] sm:w-[calc((100%-40px)/3)] lg:w-[calc((100%-80px)/5)]"
            >
              
              {/* Top Accent using your primary gradient */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-dark to-primary-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Card Content */}
              <div>
                
                {/* Icon and Number */}
                <div className="mb-6 flex items-center justify-between">
                  
                  {/* Icon Box using your primary pale token */}
                  <div className="flex h-11 w-11 items-center justify-center rounded_custom border border-primary-pale bg-primary-pale/30 text-primary-dark transition-all duration-300 group-hover:border-primary-dark group-hover:bg-primary-dark group-hover:text-white">
                    <ExternalLink size={19} />
                  </div>

                  {/* Number using your neutral grey token */}
                  <span className="text-2xl font-bold text-neutral-grey-01 transition-colors duration-300 group-hover:text-primary-sky">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title using your neutral earthy token */}
                <h3 className="text-[14px] font-semibold leading-[1.7] text-neutral-earthy transition-colors duration-300 group-hover:text-primary-blue">
                  {item.title}
                </h3>
              </div>

              {/* Bottom Link */}
              <div className="mt-6 flex items-center justify-between border-t border-neutral-grey-01/30 pt-4">
                <span className="text-xs font-semibold text-primary-blue">
                  View Details
                </span>
                <ArrowUpRight
                  size={17}
                  className="text-primary-blue transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </div>

            </a>
          ))}
        </div>

        {/* Slider Indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {quickLinksData.map((item, index) => (
            <div
              key={item.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? "w-7 bg-primary-blue"
                  : "w-2 bg-neutral-grey-01"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Quicklinks;