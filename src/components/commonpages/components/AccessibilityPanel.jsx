import React, { useState, useContext, useEffect } from "react";
import {
  Contrast,
  X,
  RotateCcw,
  Moon,
  Sun,
  Plus,
  Minus,
  Languages,
  AlignJustify,
} from "lucide-react";
import { IoAccessibilityOutline } from "react-icons/io5";

import { LanguageContext } from "../../../context/LanguageContext";
import { text } from "../../../languages/AccessibilityPanel";
import { Tooltip } from "antd";

const AccessibilityPanel = ({ onClose }) => {
  const { lang ,changeLang } = useContext(LanguageContext);
  const t = text[lang];

  const [scale, setScale] = useState(() => {
    return Number(localStorage.getItem("acc_scale")) || 1;
  });
  const [spacing, setSpacing] = useState(() => {
    return localStorage.getItem("acc_spacing") === "true";
  });
  const [contrast, setContrast] = useState(() => {
    return localStorage.getItem("acc_contrast") || "normal";
  });

  const root = document.body;

  useEffect(() => {
    // CSS variable set karo for text scaling
    document.documentElement.style.setProperty("--access-font-scale", scale);
    localStorage.setItem("acc_scale", scale);

    // Text Spacing
    if (spacing) {
      root.classList.add("text-spacing");
    } else {
      root.classList.remove("text-spacing");
    }
    localStorage.setItem("acc_spacing", spacing);

    // Contrast modes
    root.classList.remove("high-contrast", "low-contrast");
    if (contrast !== "normal") {
      root.classList.add(contrast);
    }
    localStorage.setItem("acc_contrast", contrast);
  }, [scale, spacing, contrast]);

  const toggleHighContrast = () => {
    setContrast((prev) =>
      prev === "high-contrast" ? "normal" : "high-contrast",
    );
  };

  const toggleLowContrast = () => {
    setContrast((prev) =>
      prev === "low-contrast" ? "normal" : "low-contrast",
    );
  };

  const increaseText = () => {
    // Sirf 3 baar increase ho sakta hai: 1.0 → 1.1 → 1.2 → 1.3 (max)
    setScale((prev) => Math.min(prev + 0.1, 1.3));
  };

  const decreaseText = () => {
    // Minimum 0.7 tak ja sakta hai
    setScale((prev) => Math.max(prev - 0.1, 0.7));
  };

  const toggleSpacing = () => {
    setSpacing((prev) => !prev);
  };

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "hi" : "en";
    changeLang(nextLang);
    document.documentElement.lang = nextLang;
  };

  const resetAll = () => {
    setScale(1);
    setSpacing(false);
    setContrast("normal");
    changeLang("en");
    document.documentElement.lang = "en";
    localStorage.removeItem("acc_scale");
    localStorage.removeItem("acc_spacing");
    localStorage.removeItem("acc_contrast");
  };

  const controls = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 -960 960 960"
          fill="currentColor" /* Hardcoded color hata kar currentColor lagaya */
          className="w-6 h-6 shrink-0"
        >
          <path d="M480-288.46 531.54-340H620v-88.46L671.54-480 620-531.54V-620h-88.46L480-671.54 428.46-620H340v88.46L288.46-480 340-428.46V-340h88.46L480-288.46Zm0-81.54v-220q45.77 0 77.88 32.12Q590-525.77 590-480q0 45.77-32.12 77.88Q525.77-370 480-370ZM172.31-180Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h615.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Zm0-60h615.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM160-240v-480 480Z"></path>
        </svg>
      ),
      label: t.highContrast,
      action: toggleHighContrast,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 -960 960 960"
          fill="currentColor" /* Hardcoded color hata kar currentColor lagaya */
          className="w-6 h-6 shrink-0"
        >
          <path d="M480-288.46 531.54-340H620v-88.46L671.54-480 620-531.54V-620h-88.46L480-671.54 428.46-620H340v88.46L288.46-480 340-428.46V-340h88.46L480-288.46Zm0-81.54v-220q45.77 0 77.88 32.12Q590-525.77 590-480q0 45.77-32.12 77.88Q525.77-370 480-370ZM172.31-180Q142-180 121-201q-21-21-21-51.31v-455.38Q100-738 121-759q21-21 51.31-21h615.38Q818-780 839-759q21 21 21 51.31v455.38Q860-222 839-201q-21 21-51.31 21H172.31Zm0-60h615.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H172.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85ZM160-240v-480 480Z"></path>
        </svg>
      ),
      label: t.lowContrast,
      action: toggleLowContrast,
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 shrink-0"
        >
          <path
            d="M7.49716 25.6365L5.63303 30.5528C5.50381 30.8898 5.29493 31.1596 5.00641 31.3623C4.71788 31.565 4.39524 31.6663 4.03849 31.6663C3.40955 31.6663 2.92114 31.4076 2.57328 30.8902C2.22542 30.3728 2.16885 29.8238 2.40357 29.2433L10.2112 9.50601C10.3612 9.14831 10.5899 8.8634 10.8973 8.65126C11.2047 8.43909 11.5378 8.33301 11.8964 8.33301H13.3878C13.7659 8.33301 14.1055 8.43963 14.4065 8.65288C14.7075 8.86616 14.933 9.15385 15.0829 9.51597L22.8214 29.2618C23.0561 29.8445 22.9949 30.3909 22.6377 30.9011C22.2804 31.4113 21.7939 31.6663 21.1781 31.6663C20.7934 31.6663 20.446 31.5599 20.1359 31.3471C19.8259 31.1343 19.6039 30.8446 19.47 30.4779L17.6774 25.6365H7.49716ZM8.59982 22.6108H16.5748L12.6785 12.07H12.5156L8.59982 22.6108ZM30.2439 21.5114H26.4778C26.0495 21.5114 25.6904 21.3662 25.4007 21.0758C25.1109 20.7854 24.9661 20.4255 24.9661 19.9962C24.9661 19.5669 25.1109 19.2082 25.4007 18.92C25.6904 18.632 26.0495 18.4879 26.4778 18.4879H30.2439V14.7219C30.2439 14.2905 30.3907 13.9306 30.6844 13.6424C30.9781 13.3542 31.3401 13.2101 31.7704 13.2101C32.2008 13.2101 32.5595 13.3542 32.8467 13.6424C33.1338 13.9306 33.2774 14.2905 33.2774 14.7219V18.4879H37.0434C37.4717 18.4879 37.8307 18.6331 38.1205 18.9235C38.4103 19.214 38.5552 19.5738 38.5552 20.0031C38.5552 20.4325 38.4103 20.7912 38.1205 21.0793C37.8307 21.3674 37.4717 21.5114 37.0434 21.5114H33.2774V25.2775C33.2774 25.7089 33.1328 26.0687 32.8437 26.3569C32.5545 26.6451 32.1935 26.7892 31.7607 26.7892C31.3304 26.7892 30.97 26.6428 30.6795 26.35C30.3891 26.0573 30.2439 25.6965 30.2439 25.2675V21.5114Z"
            fill="currentColor" /* Plus icon aur text dono dynamic ho jayenge */
          ></path>
        </svg>
      ),
      label: t.textSizeplus,
      action: increaseText,
    },
    {
      icon: (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 shrink-0"
        >
          <path
            d="M26.8224 21.5114C26.3919 21.5114 26.0324 21.3672 25.7437 21.0788C25.455 20.7904 25.3107 20.4311 25.3107 20.0011C25.3107 19.571 25.455 19.2113 25.7437 18.9219C26.0324 18.6326 26.3919 18.4879 26.8224 18.4879H37.0438C37.4742 18.4879 37.8338 18.6321 38.1225 18.9206C38.4112 19.209 38.5555 19.5682 38.5555 19.9983C38.5555 20.4283 38.4112 20.7881 38.1225 21.0774C37.8338 21.3668 37.4742 21.5114 37.0438 21.5114H26.8224ZM7.49754 25.6365L5.63342 30.5528C5.5042 30.8898 5.29611 31.1596 5.00917 31.3623C4.72222 31.565 4.39881 31.6663 4.03892 31.6663C3.40661 31.6663 2.91736 31.4076 2.57117 30.8902C2.225 30.3728 2.16927 29.8238 2.40396 29.2433L10.2116 9.50601C10.3616 9.14831 10.588 8.8634 10.891 8.65126C11.1939 8.43909 11.5292 8.33301 11.8968 8.33301H13.3882C13.758 8.33301 14.0955 8.43963 14.4007 8.65288C14.7058 8.86616 14.933 9.15385 15.0833 9.51597L22.8218 29.2618C23.0565 29.8445 22.9957 30.3909 22.6393 30.9011C22.2829 31.4113 21.7966 31.6663 21.1803 31.6663C20.7943 31.6663 20.4473 31.5612 20.1392 31.3508C19.8311 31.1405 19.6081 30.8495 19.4704 30.4779L17.6778 25.6365H7.49754ZM8.60021 22.6108H16.5752L12.6836 12.07H12.516L8.60021 22.6108Z"
            fill="currentColor" /* Minus icon ke liye bhi currentColor */
          ></path>
        </svg>
      ),
      label: t.textSizeminus,
      action: decreaseText,
    },
    {
      icon: <AlignJustify size={20} />,
      label: t.textSpacing,
      action: toggleSpacing,
    },
    {
      icon: (
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img"
          className="w-6 h-6 shrink-0"
        >
          <path
            d="M14.125 3.735V12H12.91V3.735H11.815V2.67H15.685V3.735H14.125ZM8.47 2.52C9.25 2.52 9.845 2.715 10.255 3.105C10.675 3.495 10.885 3.985 10.885 4.575C10.885 5.005 10.77 5.395 10.54 5.745C10.32 6.085 9.99 6.355 9.55 6.555C9.11 6.755 8.56 6.865 7.9 6.885L7.825 5.835C8.505 5.815 8.985 5.695 9.265 5.475C9.555 5.255 9.7 4.96 9.7 4.59C9.7 4.23 9.58 3.97 9.34 3.81C9.11 3.65 8.84 3.57 8.53 3.57C8.16 3.57 7.825 3.62 7.525 3.72C7.225 3.82 6.905 3.955 6.565 4.125L6.19 3.09C6.45 2.95 6.77 2.82 7.15 2.7C7.54 2.58 7.98 2.52 8.47 2.52ZM11.05 8.73C11.05 9.19 10.945 9.575 10.735 9.885C10.525 10.195 10.24 10.425 9.88 10.575C9.53 10.725 9.13 10.8 8.68 10.8C8.11 10.8 7.58 10.66 7.09 10.38C6.61 10.1 6.15 9.655 5.71 9.045C5.28 8.435 4.855 7.64 4.435 6.66L5.5 6.27C5.79 6.98 6.09 7.595 6.4 8.115C6.72 8.625 7.06 9.02 7.42 9.3C7.78 9.57 8.165 9.705 8.575 9.705C8.955 9.705 9.265 9.62 9.505 9.45C9.745 9.27 9.865 8.985 9.865 8.595C9.865 8.115 9.7 7.7 9.37 7.35C9.04 7 8.64 6.68 8.17 6.39L9.055 6.345L9.7 6.21C9.84 6.33 9.995 6.475 10.165 6.645C10.335 6.815 10.47 6.985 10.57 7.155L10.645 7.44C10.775 7.63 10.875 7.83 10.945 8.04C11.015 8.25 11.05 8.48 11.05 8.73ZM11.29 6.75C11.77 6.75 12.185 6.715 12.535 6.645C12.885 6.565 13.295 6.44 13.765 6.27V7.35C13.335 7.54 12.945 7.665 12.595 7.725C12.255 7.785 11.88 7.815 11.47 7.815C11.32 7.815 11.145 7.805 10.945 7.785C10.745 7.755 10.555 7.725 10.375 7.695C10.205 7.655 10.08 7.62 10 7.59L9.295 6.75L9.385 6.525C9.675 6.595 9.98 6.65 10.3 6.69C10.62 6.73 10.95 6.75 11.29 6.75Z"
            fill="currentColor" /* Mazagon Dock blue se hata kar currentColor kiya */
          ></path>
          <path
            d="M19.63 22L18.426 18.906H14.464L13.274 22H12L15.906 11.962H17.04L20.932 22H19.63ZM18.048 17.786L16.928 14.762C16.9 14.6873 16.8533 14.552 16.788 14.356C16.7227 14.16 16.6573 13.9593 16.592 13.754C16.536 13.5393 16.4893 13.376 16.452 13.264C16.3773 13.5533 16.298 13.838 16.214 14.118C16.1393 14.3887 16.074 14.6033 16.018 14.762L14.884 17.786H18.048Z"
            fill="currentColor"
          ></path>
        </svg>
      ),
      label: lang === "en" ? "HINDI (अ)" : "ENGLISH (A)",
      action: toggleLanguage,
    },
  ];

  return (
    <div className=" w-full   h-full bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-100/50">
      {/* Modern gradient header */}
      <div className="absolute top-0 left-0 right-0 h-32  pointer-events-none rounded-t-2xl" />

      <div className="relative flex flex-col h-full p-5 sm:p-6">
        {/* Header section */}
        <div className="flex items-center justify-between mb-7 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className=" flex items-center justify-center shadow-lg shadow-indigo-200/50">
              <IoAccessibilityOutline size={22} />
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent tracking-tight">
              {t.title}
            </h2>
          </div>
          <Tooltip title="Close">
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-gray-50/80 backdrop-blur-sm hover:bg-gray-100/90 text-gray-500 hover:text-gray-700 transition-all duration-200 active:scale-95 border border-gray-100/50 shadow-sm"
            >
              <X size={18} />
            </button>
          </Tooltip>
        </div>

        {/* Scrollable controls grid */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <div className="grid md:grid-cols-2 lg:grid-cols-2  gap-3 sm:gap-4">
            {controls.map((item, index) => (
              <button
                key={index}
                onClick={item.action}
                disabled={item.disabled}
                className={`
                  group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-xl
                  transition-all duration-300 active:scale-[0.97] 
                  ${
                    item.active
                      ? "  shadow-lg shadow-blue-200/90 "
                      : item.disabled
                        ? "bg-gray-50 border border-gray-100 text-gray-300 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-600 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/50 hover:text--600"
                  }
                `}
              >
                <span
                  className={`
                  mb-3 transition-all duration-300 
                  ${item.active ? "scale-110 drop-shadow-sm " : "group-hover:scale-105"}
                `}
                >
                  {item.icon}
                </span>
                <span
                  className={`
                  text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-center leading-tight
                  ${item.active ? "" : item.disabled ? "text-gray-300" : ""}
                `}
                >
                  {item.label}
                </span>

                {/* Active indicator dot */}
                {item.active && (
                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-white/80 shadow-sm" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Modern reset button */}
        <div className="mt-6 pt-5 shrink-0 border-t border-gray-100/80">
          <button
            onClick={resetAll}
            className="group w-full py-3.5  btn_base btn_primary hover:from-rose-500 hover:to-orange-500 text-rose-600 hover:text-white font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide shadow-sm hover:shadow-lg active:scale-[0.98] border border-rose-100/50 hover:border-transparent"
          >
            <RotateCcw
              size={16}
              className="transition-transform duration-500"
            />
            {t.resetToDefault}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityPanel;