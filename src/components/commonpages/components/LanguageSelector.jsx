import  { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
// ✅ Correct Named Import based on your file
import { useWebsiteContent } from "../../../context/useWebsiteContent"; 

const LanguageSelector = () => {
  // ✅ Using your custom hook
  const { languages, selectedLanguage, changeLanguage } = useWebsiteContent();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageSelect = (lang) => {
    if (selectedLanguage?.publicId !== lang.publicId) {
      changeLanguage(lang);
    }
    setIsOpen(false);
  };

  return (
  <div className="relative inline-block text-left z-100" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-40 sm:w-48 px-3 sm:px-4 py-2 bg-white border-2 border-blue-500 rounded-xl shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-all duration-200"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="text-sm sm:text-base font-semibold text-slate-700 truncate pr-2">
          {selectedLanguage ? selectedLanguage.name : "Select Language"}
        </span>
        <ChevronDown
          size={18}
          className={`text-blue-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
             <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-xl shadow-2xl border border-gray-100 z-9999 overflow-hidden origin-top-right transition-all duration-200">
          <ul
            className="py-1 max-h-80 overflow-auto custom-scrollbar"
            role="listbox"
          >
            {languages.map((lang) => {
              const isSelected = selectedLanguage?.publicId === lang.publicId;
              
              // Check if it's a specific language to style it (Optional)
              // Agar aapko exact screenshot jaisa UPPERCASE chahiye to .toUpperCase() laga sakte hain
              const displayName = lang.name;

              return (
                <li key={lang.publicId || lang.code} role="option" aria-selected={isSelected}>
                  <button
                    onClick={() => handleLanguageSelect(lang)}
                    className={`w-full text-left px-4 py-3 flex items-center justify-between transition-colors ${
                      isSelected
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : "text-slate-600 font-medium hover:bg-gray-50 hover:text-slate-900"
                    }`}
                  >
                    {/* Language Name */}
                    <span className="text-[15px] tracking-wide">
                      {displayName}
                    </span>
                    
                    {/* Selected Check Icon */}
                    {isSelected && (
                      <Check size={16} className="text-blue-600" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;