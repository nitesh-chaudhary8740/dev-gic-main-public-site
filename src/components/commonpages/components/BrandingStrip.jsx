import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowDownToLine } from "lucide-react";
import { IoAccessibilityOutline } from "react-icons/io5";
import LanguageSelector from "./LanguageSelector";

const BrandingStrip = ({ onAccessClick }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchInputRef = useRef(null);
  const headerRef = useRef(null); // Header ki height nikalne ke liye

  // Scroll hide/show logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Auto focus search input
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // ✅ FIXED: Skip to Main Content - Sirf header ki height jitna scroll karega
  const handleSkipToMain = () => {
    if (headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight;
      window.scrollTo({
        top: headerHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* SKIP TO MAIN CONTENT LINK - Keyboard Focus par visible */}
      <a
        href="#main-content"
        className="absolute left-4 top-4 z-[9999] -translate-y-20 bg-primary-dark text-white px-5 py-3 rounded_custom shadow-lg border-2 border-[#ffc107] font-semibold text-sm transition-transform duration-200 focus:translate-y-0 focus:outline-none"
      >
        Skip to Main Content
      </a>

      <header
        ref={headerRef} // Ref lagaya
        className={`w-full bg-white border-b border-gray-100 shadow-sm transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } sticky top-0 z-50`}
      >
        <div className="px-3 sm:px-5 lg:px-6 py-2">
          <div className="flex items-center justify-between gap-3">
            
            {/* 1. GIC Logo (Chhota) */}
            <div className="flex items-center shrink-0">
              <img
                src="/logo/gic-logo1.png"
                alt="GIC Re Logo"
                className="h-20 sm:h-20 w-auto object-contain"
              />
            </div>

            {/* Divider */}
            <div className="hidden md:block h-8 w-[1px] bg-gray-200" />

            {/* 2. Global Ranking Badge */}
            <div className="hidden md:flex items-center gap-2  px-2 py-1 rounded-md ">
              <img
                src="/logo/10th-rank.png"
                alt="Ranked Badge"
                className="h-9 w-auto object-contain shrink-0"
              />
              <div className="text-[10px] text-slate-700 leading-tight max-w-[180px]">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-blue-950 text-xs">Ranked 9th</span>
                  <span className="inline-block bg-blue-100 text-blue-800 text-[9px] font-semibold px-1 py-0.5 rounded">
                    Global
                  </span>
                </div>
                <p className="font-medium text-slate-800 text-[10px]">Largest Global Reinsurer Group</p>
                <p className="text-[9px] text-slate-500">Non-IFRS 17 (AM Best)</p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block h-8 w-[1px] bg-gray-200" />

            {/* 3. AM Best Rating */}
            <div className="hidden md:flex items-center gap-2  px-2 py-1 rounded-md ">
              <img
                src="/logo/security-rating.png"
                alt="AM Best Rating"
                className="h-9 w-auto object-contain shrink-0"
              />
              <div className="text-[10px] text-slate-700 leading-tight max-w-[170px]">
                <span className="font-bold text-emerald-800 text-xs">A- (Excellent)</span>
                <p className="font-medium text-slate-800 text-[10px]">Stable Outlook</p>
                <p className="text-[9px] text-slate-500">Financial Strength Rating</p>
              </div>
            </div>

            {/* Brochure QR + National Emblem */}
            <div className="flex items-center gap-2  px-2 py-1 rounded-md ">
              <img
                src="/logo/GICqr.png"
                alt="Brochure QR Code"
                className="h-20 w-20 object-contain rounded"
              />
              <div className="text-left leading-tight">
                <span className="block text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                  Brochure
                </span>
                <span className="block text-[9px] text-slate-500 font-medium">
                  Scan to View
                </span>
              </div>
              <img
                src="/logo/National-Emblem.png"
                alt="Government Emblem"
                className="h-20 w-auto object-contain ml-2 border-l border-gray-200 pl-2"
              />
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* 4. Right Side: Icons */}
            <div className="flex items-center gap-2 shrink-0">
              <LanguageSelector/>
              <div className="h-8 w-[1px] bg-gray-200" />

              <div className="flex items-center gap-1">
                {/* SEARCH ICON */}
                {!isSearchOpen ? (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="p-2 text-slate-700 hover:bg-gray-100 rounded-full transition-all"
                    aria-label="Open search"
                  >
                    <Search size={30} />
                  </button>
                ) : (
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white shadow-sm">
                      <input
                        ref={searchInputRef}
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="search"
                        className="w-[150px] px-3 py-1.5 text-xs outline-none text-gray-700"
                      />
                      <button
                        type="submit"
                        className="p-1.5 text-gray-600 hover:text-primary-blue transition-colors"
                        aria-label="Submit search"
                      >
                        <Search size={30} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsSearchOpen(false)}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors border-l border-gray-200"
                        aria-label="Close search"
                      >
                        <X size={30} />
                      </button>
                    </div>
                  </form>
                )}

                <div className="h-6 w-[1px] bg-gray-200" />

                {/* ACCESSIBILITY ICON */}
                <button
                  onClick={onAccessClick}
                  className="p-2 text-slate-700 hover:bg-gray-100 rounded-full transition-all"
                  aria-label="Accessibility Settings"
                >
                  <IoAccessibilityOutline size={30} />
                </button>

                <div className="h-6 w-[1px] bg-gray-200" />

                {/* SKIP TO MAIN CONTENT ICON */}
                <button
                  onClick={handleSkipToMain}
                  className="p-2 text-slate-700 hover:bg-gray-100 rounded-full transition-all"
                  aria-label="Skip to Main Content"
                  title="Skip to Main Content"
                >
                  <ArrowDownToLine size={30} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default BrandingStrip;