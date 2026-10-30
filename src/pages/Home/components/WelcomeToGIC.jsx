import React from "react";
import {
  ArrowUpRight,
  Database,
  ShieldCheck,
  Activity,
} from "lucide-react";

const WelcomeToGIC = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 ">

      {/* Subtle Background Decoration using your primary pale token */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-primary-pale/40 blur-3xl" />

      <div className="relative z-10 mx-auto ">

        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">

          {/* LEFT SIDE - Image Collage */}
          <div className="relative flex h-[370px] w-full items-center justify-center sm:h-[480px] lg:w-1/2">

            {/* Background Shape using your primary sky token */}
            <div className="absolute left-[12%] top-[10%] h-[75%] w-[75%] rounded-[40px] bg-primary-sky/30" />

            {/* Top Left Image */}
            <div className="absolute left-[5%] top-0 z-10 h-32 w-36 overflow-hidden rounded_custom border-[5px] border-white shadow-xl sm:left-[8%] sm:h-44 sm:w-48">
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop"
                alt="Enterprise server infrastructure"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Main Image */}
            <div className="absolute left-[15%] top-[15%] z-20 h-[245px] w-[65%] overflow-hidden rounded_custom border-[6px] border-white shadow-2xl sm:left-[18%] sm:h-[330px]">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=900&auto=format&fit=crop"
                alt="Technology and database management"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Gradient Overlay using your primary dark token */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 to-transparent" />
            </div>

            {/* Bottom Right Image */}
            <div className="absolute bottom-0 right-[2%] z-30 h-36 w-40 overflow-hidden rounded_custom border-[5px] border-white shadow-xl sm:right-[5%] sm:h-48 sm:w-52">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                alt="Database analytics and monitoring"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>

            {/* Floating Badge using your app_card utility */}
            <div className="app_card rounded_custom absolute bottom-[8%] left-[1%] z-40 flex items-center gap-3 bg-white px-4 py-3 shadow-xl sm:left-[4%]">
              <div className="flex h-10 w-10 items-center justify-center rounded_custom bg-primary-pale/30 text-primary-dark">
                <Database size={22} />
              </div>

              <div>
                <p className="text-sm font-bold text-primary-dark">
                  GIC Re
                </p>
                <p className="text-xs text-neutral-grey-03">
                  General Insurance
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - Content */}
          <div className="flex w-full flex-col justify-center lg:w-1/2">

            {/* Heading using your h2 font size token */}
            <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-primary-dark sm:text-4xl lg:text-[42px]">
              Welcome to  GIC Re

            </h2>

            {/* Description using your neutral grey token */}
            <div className="space-y-4 text-[15px] leading-7 text-neutral-grey-03 sm:text-base sm:leading-8">

              <p>
                The entire general insurance business in India was nationalised by General Insurance Business (Nationalisation) Act, 1972 (GIBA).
              </p>

              <p>
                The Government of India (GOI), through Nationalisation took over the shares of 55 Indian insurance companies and the undertakings of 52 insurers carrying on general insurance business.
              </p>

              <p>
                General Insurance Corporation of India (GIC) was formed in pursuance of Section 9(1) of GIBA.
              </p>

              <p>
                It was incorporated on 22 November 1972 under the Companies Act, 1956 as a private company limited by shares.
              </p>

              <p>
                GIC was formed for the purpose of superintending, controlling and carrying on the business of general insurance.
              </p>

              <p>
                As soon as GIC was formed, GOI transferred all the shares it held of the general insurance companies to GIC.
              </p>

            </div>

            {/* Features */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded_custom bg-primary-pale/30 text-primary-dark">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-sm font-semibold text-neutral-earthy">
                  Secure Infrastructure
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded_custom bg-primary-pale/30 text-primary-dark">
                  <Activity size={20} />
                </div>
                <span className="text-sm font-semibold text-neutral-earthy">
                  High Performance
                </span>
              </div>

            </div>

            {/* Read More Button using your primary blue token */}
            <div className="mt-9">
              <a
                href="/about"
                className="group inline-flex items-center justify-center gap-3 rounded_custom bg-primary-blue px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary-blue/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg"
              >
                Read more
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeToGIC;