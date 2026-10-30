import { useCallback, useEffect, useMemo, useState } from "react";
import WebsiteContentContext from "./WebsiteContentContext";
import contentEndpoint from "../api/contentEndpoint";

// Helper to read from session
const getSession = (key) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    if(!e)return;
    return null;
  }
};

export const WebsiteContentProvider = ({ children }) => {
  // --------------------------------------------------
  // RENDER TRIGGER (Sirf UI update karne ke liye)
  // --------------------------------------------------
  const [, setTick] = useState(0);
  const triggerRender = () => setTick((t) => t + 1);

  // --------------------------------------------------
  // LANGUAGES (Only List in State)
  // --------------------------------------------------
  const [languages, setLanguages] = useState([]);
  const [navbarHierarchy, setNavbarHierarchy] = useState([]);
  const [isNavigationLoading, setIsNavigationLoading] = useState(true);
  const [navigationError, setNavigationError] = useState(null);

  // --------------------------------------------------
  // SESSION GETTERS & SETTERS (Direct read/write)
  // --------------------------------------------------
  
  const selectedLanguage = getSession("gic_selected_language");
  const encryptedLanguageId = selectedLanguage 
    ? (selectedLanguage.publicId || selectedLanguage.encryptedId) 
    : null;
  const currentPage = getSession("gic_current_page");

  const setSelectedLanguageSession = (lang) => {
    if (lang) {
      sessionStorage.setItem("gic_selected_language", JSON.stringify(lang));
    } else {
      sessionStorage.removeItem("gic_selected_language");
    }
    triggerRender(); // UI update karne ke liye
  };

  const setCurrentPageSession = (page) => {
    if (page) {
      sessionStorage.setItem("gic_current_page", JSON.stringify(page));
    } else {
      sessionStorage.removeItem("gic_current_page");
    }
    triggerRender(); // UI update karne ke liye
  };

  // --------------------------------------------------
  // LOAD LANGUAGES
  // --------------------------------------------------

  const loadLanguages = useCallback(async () => {
    try {
      const response = await contentEndpoint.getLanguages();
      const data = response.data?.data ?? response.data;
      const languageList = Array.isArray(data) ? data : [];
      setLanguages(languageList);
      return languageList;
    } catch (error) {
      console.error("Failed to load languages:", error);
      throw error;
    }
  }, []);

  // --------------------------------------------------
  // LOAD NAVIGATION
  // --------------------------------------------------

  const loadNavigation = useCallback(async (languageId) => {
    if (!languageId) {
      setNavbarHierarchy([]);
      return;
    }

    try {
      setIsNavigationLoading(true);
      setNavigationError(null);

      const response = await contentEndpoint.getMenuHierarchy(languageId);
      const data = response.data?.data ?? response.data;
      const menuList = Array.isArray(data) ? data : [];

      setNavbarHierarchy(menuList);
      return menuList;
    } catch (error) {
      console.error("Failed to load navigation:", error);
      setNavbarHierarchy([]);
      setNavigationError(
        error.response?.data?.message || "Unable to load navigation."
      );
      throw error;
    } finally {
      setIsNavigationLoading(false);
    }
  }, []);

  // --------------------------------------------------
  // INITIAL WEBSITE LOAD
  // --------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    const initializeWebsite = async () => {
      try {
        setIsNavigationLoading(true);
        setNavigationError(null);

        // 1. GET LANGUAGES
        const languageList = await loadLanguages();
        if (cancelled) return;

        if (!languageList.length) {
          setNavigationError("No published language is available.");
          setIsNavigationLoading(false);
          return;
        }

        // 2. SELECT LANGUAGE (Session check)
        let defaultLanguage = selectedLanguage;
        
        if (!defaultLanguage) {
          // Session khali hai, toh English ya first pick karein
          defaultLanguage =
            languageList.find((language) => language.code?.toLowerCase() === "en") ||
            languageList[0];
        } else {
          // Verify saved language
          const exists = languageList.find(
            (l) => l.publicId === defaultLanguage.publicId
          );
          if (!exists) {
            defaultLanguage =
              languageList.find((language) => language.code?.toLowerCase() === "en") ||
              languageList[0];
          }
        }

        const languageId = defaultLanguage.publicId || defaultLanguage.encryptedId;

        if (!languageId) {
          throw new Error("Encrypted language ID is missing from language API.");
        }

        // Save to session (triggers render)
        setSelectedLanguageSession(defaultLanguage);

        // 3. GET NAVIGATION
        await loadNavigation(languageId);
        if (cancelled) return;

      } catch (error) {
        if (cancelled) return;
        console.error("Website initialization failed:", error);
        setNavbarHierarchy([]);
        setNavigationError(
          error.response?.data?.message || error.message || "Unable to initialize website."
        );
      } finally {
        if (!cancelled) {
          setIsNavigationLoading(false);
        }
      }
    };

    initializeWebsite();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadLanguages, loadNavigation]); 

  // --------------------------------------------------
  // LANGUAGE CHANGE
  // --------------------------------------------------

  const changeLanguage = useCallback(
    async (language) => {
      if (!language) return;

      const languageId = language.publicId || language.encryptedId;

      if (!languageId) {
        console.error("Encrypted language ID is missing.");
        return;
      }

      try {
        setIsNavigationLoading(true);
        setNavigationError(null);

        // Save to session
        setSelectedLanguageSession(language);

        await loadNavigation(languageId);

        // Language change hone par current page reset
        setCurrentPageSession(null); 
      } catch (error) {
        console.error("Language change failed:", error);
        setNavigationError(
          error.response?.data?.message || "Unable to change language."
        );
      } finally {
        setIsNavigationLoading(false);
      }
    },
    [loadNavigation]
  );

  // --------------------------------------------------
  // RESET CURRENT PAGE
  // --------------------------------------------------

  const resetCurrentPage = useCallback(() => {
    setCurrentPageSession(null);
  }, []);

  // --------------------------------------------------
  // CONTEXT VALUE
  // --------------------------------------------------

  const value = useMemo(
    () => ({
      // Languages
      languages, 
      setLanguages,

      // Direct Session Data
      selectedLanguage, 
      setSelectedLanguage: setSelectedLanguageSession,

      encryptedLanguageId,
      
      // Navigation
      navbarHierarchy, 
      setNavbarHierarchy,
      isNavigationLoading, 
      setIsNavigationLoading,
      navigationError, 
      setNavigationError,
      loadNavigation,

      // Current Page
      currentPage, 
      setCurrentPage: setCurrentPageSession,
      resetCurrentPage,
      
      changeLanguage,
    }),
    [
      languages, 
      selectedLanguage, 
      encryptedLanguageId, 
      changeLanguage,
      navbarHierarchy, 
      isNavigationLoading, 
      navigationError, 
      loadNavigation,
      currentPage, 
      resetCurrentPage,
    ]
  );

  // --------------------------------------------------
  // WAIT UNTIL INITIAL DATA IS LOADED
  // --------------------------------------------------

  if (isNavigationLoading && !selectedLanguage) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-700" />
          <p className="text-sm text-gray-600">Loading website...</p>
        </div>
      </div>
    );
  }

  return (
    <WebsiteContentContext.Provider value={value}>
      {children}
    </WebsiteContentContext.Provider>
  );
};