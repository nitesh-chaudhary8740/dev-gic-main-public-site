import React, { useRef, useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Mail,
  Building2,
  HeartPulse,
  Ship,
  Plane,
} from "lucide-react";

const businessData = [
  {
    id: 1,
    title: "Property",
    icon: Building2,
    emails: [
      "Propertyforeignteam@gicre.in",
      "propertyclaimsforeign@gicre.in",
      "domfac@gicre.in",
      "domfiretreatyteam@gicre.in",
      "propertyclaimsdomestic@gicre.in",
    ],
  },
  {
    id: 2,
    title: "Health U/W Claims",
    icon: HeartPulse,
    emails: ["health@gicre.in", "miscclaims@gicre.in"],
  },
  {
    id: 3,
    title: "Marine",
    icon: Ship,
    emails: [
      "marineteam@gicre.in",
      "energyteam@gicre.in",
      "marineenergyclaims@gicre.in",
      "marinecargoclaims@gicre.in",
      "marinehullclaims@gicre.in",
    ],
  },
  {
    id: 4,
    title: "Aviation U/W & Claims",
    icon: Plane,
    emails: ["aviationteam@gicre.in", "avnclaims@gicre.in"],
  },
];

const BusinessLines = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;

    setCanScrollLeft(scrollLeft > 2);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  const scrollCards = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const firstCard = container.firstElementChild;
    if (!firstCard) return;

    const gap = parseFloat(window.getComputedStyle(container).gap) || 0;
    const cardWidth = firstCard.getBoundingClientRect().width + gap;

    container.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollButtons();

    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 ">
      
      {/* Background Decoration using your primary pale token */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary-pale/40 blur-3xl" />

      <div className="relative z-10 mx-auto ">
        
        {/* Section Header */}
        <div className="mb-10">
         

          <h2 className="text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl lg:text-[42px]">
            Business Lines
          </h2>

          <p className="mt-4 max-w-2xl text-[15px] leading-7 text-neutral-grey-03 sm:text-base">
            Connect with our specialized business teams for
            inquiries, underwriting and claims-related assistance.
          </p>
        </div>

        {/* Slider with Side Arrows */}
        <div className="relative">
          
          {/* LEFT ARROW using your app_card utility */}
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous business lines"
            className="app_card rounded_custom absolute -left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white text-primary-blue transition-all duration-300 hover:border-primary-blue hover:bg-primary-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:-left-5"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Cards Container */}
          <div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-2 py-4"
          >
            {businessData.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  // Using your app_card utility and rounded_custom
                  className="app_card rounded_custom group relative flex min-h-[360px] w-[90%] shrink-0 snap-start flex-col overflow-hidden bg-neutral-linen p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-blue hover:bg-white hover:shadow-[0_16px_40px_rgba(30,70,130,0.12)] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-60px)/4)]"
                >
                  
                  {/* Top Hover Accent using your primary gradient */}
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-dark to-primary-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon using your primary pale token */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded_custom border border-primary-pale bg-primary-pale/30 text-primary-dark transition-all duration-300 group-hover:border-primary-dark group-hover:bg-primary-dark group-hover:text-white">
                    <Icon size={23} strokeWidth={1.8} />
                  </div>

                  {/* Title */}
                  <h3 className="mb-6 min-h-[48px] text-lg font-bold leading-6 text-primary-dark transition-colors duration-300 group-hover:text-primary-blue">
                    {item.title}
                  </h3>

                  {/* Email Links */}
                  <div className="flex flex-col gap-2.5">
                    {item.emails.map((email, index) => (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        title={email}
                        // Using your neutral grey and primary pale tokens
                        className="rounded_custom flex items-start gap-2.5 border border-neutral-grey-01 bg-white px-3 py-3 text-neutral-grey-03 transition-all duration-200 hover:border-primary-pale hover:bg-primary-pale/30 hover:text-primary-blue"
                      >
                        <Mail
                          size={15}
                          className="mt-0.5 shrink-0 text-primary-blue"
                        />
                        <span className="min-w-0 break-all text-[12px] font-medium leading-5">
                          {email}
                        </span>
                      </a>
                    ))}
                  </div>

                  {/* Bottom Decoration */}
                  <div className="mt-auto pt-6">
                    <div className="h-px w-full bg-neutral-grey-01/30" />
                    <p className="mt-4 text-xs font-medium text-neutral-grey-02">
                      Business Communication
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

          {/* RIGHT ARROW using your app_card utility */}
          <button
            type="button"
            onClick={() => scrollCards(1)}
            disabled={!canScrollRight}
            aria-label="Next business lines"
            className="app_card rounded_custom absolute -right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white text-primary-blue transition-all duration-300 hover:border-primary-blue hover:bg-primary-blue hover:text-white disabled:cursor-not-allowed disabled:opacity-40 sm:-right-5"
          >
            <ChevronRight size={22} />
          </button>

        </div>
      </div>
    </section>
  );
};

export default BusinessLines;