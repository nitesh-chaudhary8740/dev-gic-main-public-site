
import React, { useEffect, useState } from "react";
import {
  ArrowUp,
  Mail,
  Phone,
  Send,
  FileText,
} from "lucide-react";

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [email, setEmail] = useState("");

  const quickLinks = [
    { name: "Terms & Conditions", href: "#", id: 1 },
    { name: "Privacy Policy", href: "#", id: 2 },
    { name: "Copyright Policy", href: "#", id: 3 },
    { name: "Accessibility Statement", href: "#", id: 4 },
    { name: "Hyperlinking Policy", href: "#", id: 5 },
    { name: "Disclaimer", href: "#", id: 6 },
    { name: "Help", href: "#", id: 7 },
    { name: "Sitemap", href: "#", id: 8 },
    { name: "National Portal Of India", href: "#", id: 9 },
    { name: "Screen Reader Access", href: "#", id: 10 },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Connect newsletter API here
  };

  return (
    <footer className="w-full bg-primary-dark text-white font-sans">

      {/* MAIN FOOTER */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">

          {/* HELP */}
          <div>
            <h2 className="text-xl lg:text-2xl font-light leading-snug text-white/90">
              We are Here To Help
              <br />
              However and whenever
              <br />
              you need it
            </h2>
          </div>

          {/* HEAD OFFICE */}
          <div>
            <h3 className="text-sm font-bold text-[#ffc107] mb-2">
              HEAD OFFICE
            </h3>

            <div className="text-sm text-white/75 leading-6">
              <p className="font-semibold text-white">
                "Suraksha"
              </p>
              <p>170, Jamshedji Tata Road,</p>
              <p>Churchgate, Mumbai - 400 020</p>
              <p>India</p>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-sm font-bold text-[#ffc107] mb-2">
              YOU CAN REACH US AT:
            </h3>

            <div className="space-y-2 text-sm text-white/75">

              <a
                href="tel:+912222867000"
                className="flex items-center gap-2 hover:text-[#ffc107]"
              >
                <Phone size={15} className="text-[#ffc107]" />
                +91 22 2286 7000
              </a>

              <a
                href="mailto:info@gicre.in"
                className="flex items-center gap-2 hover:text-[#ffc107]"
              >
                <Mail size={15} className="text-[#ffc107]" />
                info[at]gicre[dot]in
              </a>

              <div className="pt-1">
                <h3 className="text-sm font-bold text-[#ffc107]">
                  FOLLOW US ON:
                </h3>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* NEWSLETTER */}
      <div className="border-t border-white/15">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">

          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">

            <div className="lg:w-[30%]">
              <h3 className="text-base font-semibold leading-snug">
                Stay Updated! Subscribe for Our
                <br className="hidden lg:block" />
                {" "}Monthly Newsletter
              </h3>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="flex w-full lg:flex-1 bg-white rounded_custom overflow-hidden"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Newsletter email"
                className="flex-1 min-w-0 px-3 py-2.5 text-sm text-gray-800 outline-none"
              />

              <button
                type="submit"
                aria-label="Subscribe"
                className="bg-[#ffc107] text-primary-dark px-4 hover:bg-white transition-colors"
              >
                <Send size={17} />
              </button>
            </form>

            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-[#ffc107] text-primary-dark px-4 py-2.5 rounded_custom text-xs font-bold whitespace-nowrap hover:bg-white transition-colors"
            >
              <FileText size={17} />
              VIEW OUR NEWSLETTER
            </button>

          </div>
        </div>
      </div>

      {/* COMPANY INFO */}
      <div className="border-t border-white/15">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-3">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-xs text-white/75">

            <p>
              CIN: L67200MH1972GOI016133 | IRDA Registration No: 112
            </p>

            <p>Page last updated on: 16/10/2026</p>

            <p>
              Visitors: <span className="text-white font-semibold">33946688</span>
            </p>

          </div>
        </div>
      </div>

      {/* QUICK LINKS + COPYRIGHT */}
      <div className="border-t border-white/15">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-4">

          {/* QUICK LINKS */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs text-white/75">

            {quickLinks.map((link, index) => (
              <React.Fragment key={link.id}>
                <a
                  href={link.href}
                  className="hover:text-[#ffc107] transition-colors"
                >
                  {link.name}
                </a>

                {index !== quickLinks.length - 1 && (
                  <span className="text-white/25">|</span>
                )}
              </React.Fragment>
            ))}

          </div>

          {/* COPYRIGHT */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4 pt-3 border-t border-white/10">

            <div className="text-xs text-white/70 space-y-1">
              <p>
                <span className="font-semibold text-white">
                  Owned by:
                </span>{" "}
                General Insurance Corporation of India (GIC Re)
              </p>

              <p>
                Copyright © 2025 GIC Re. All rights reserved.
              </p>
            </div>

            <a
              href="#"
              className="text-xs text-[#ffc107] hover:text-white underline underline-offset-4"
            >
              Give Your Feedback
            </a>

          </div>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      {showScrollButton && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-5 z-50 p-2.5 rounded-full bg-[#ffc107] text-primary-dark shadow-lg hover:bg-white transition-all"
        >
          <ArrowUp size={19} />
        </button>
      )}

    </footer>
  );
};

export default Footer;
