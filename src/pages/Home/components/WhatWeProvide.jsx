import React from "react";
import {
  Building2,
  TrendingUp,
  Globe,
  ArrowUpRight,
} from "lucide-react";

const cardsData = [
  {
    id: 1,
    icon: Building2,
    number: "01",
    title: "Business",
    description:
      "As a sole reinsurer in the domestic reinsurance market, GIC Re provides reinsurance to the direct general insurance companies in the Indian market.",
    link: "#",
  },
  {
    id: 2,
    icon: TrendingUp,
    number: "02",
    title: "Financials",
    description:
      "As GIC Re spreads its wings, it has emerged as an effective reinsurance solution partner for the Afro-Asian Region.",
    link: "#",
  },
  {
    id: 3,
    icon: Globe,
    number: "03",
    title: "Our Global Footprints",
    description:
      "As a truly world-class Reinsurer, GIC Re has its permanent offices in UK, Malaysia, Russia and U.A.E. and is continuously persevering to enter new frontiers.",
    link: "#",
  },
];

const WhatWeProvide = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 ">
      
      {/* Subtle Grid Background using your neutral grey token */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
      
      />

      {/* Background Glow using your primary sky token */}
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-primary-sky/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary-pale/40 blur-3xl" />

      <div className="relative z-10 mx-auto ">
        
        {/* Section Heading */}
        <div className="mb-12 max-w-3xl">
      

          {/* Heading using your h2 font size token */}
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary-dark sm:text-4xl lg:text-[42px]">
            What We Provide
          </h2>

          <p className="max-w-2xl text-base leading-7 text-neutral-grey-03">
            Comprehensive database infrastructure solutions
            designed to ensure security, reliability, and
            high performance for modern enterprises.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {cardsData.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                // Using your .app_card utility and .rounded_custom
                className="app_card rounded_custom group relative flex h-full flex-col overflow-hidden bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-blue hover:shadow-[0_16px_40px_rgba(30,70,130,0.12)] sm:p-8"
              >
                
                {/* Top Accent using your primary gradient */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-dark via-primary-blue to-primary-light opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon and Number */}
                <div className="mb-8 flex items-start justify-between">
                  
                  {/* Icon Box using your primary pale token */}
                  <div className="flex h-14 w-14 items-center justify-center rounded_custom border border-primary-pale bg-primary-pale/30 text-primary-dark transition-all duration-300 group-hover:border-primary-dark group-hover:bg-primary-dark group-hover:text-white">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  {/* Number using your neutral grey token */}
                  <span className="text-3xl font-bold tracking-tight text-neutral-grey-01 transition-colors duration-300 group-hover:text-primary-sky">
                    {card.number}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col">
                  
                  <h3 className="mb-4 text-xl font-bold tracking-tight text-primary-dark transition-colors duration-300 group-hover:text-primary-blue">
                    {card.title}
                  </h3>

                  <p className="mb-8 flex-1 text-[15px] leading-7 text-neutral-grey-03">
                    {card.description}
                  </p>

                  {/* Bottom Divider */}
                  <div className="mb-5 h-px w-full bg-neutral-grey-01/30" />

                  {/* Explore Link using your primary blue token */}
                  <a
                    href={card.link}
                    className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary-blue transition-colors duration-200 hover:text-primary-dark"
                  >
                    Read More
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhatWeProvide;