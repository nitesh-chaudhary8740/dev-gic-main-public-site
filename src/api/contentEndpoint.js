import axiosInstance from "./axiosInstance";

// --------------------------------------------------
// PUBLIC CONTENT ENDPOINTS
// --------------------------------------------------

const contentEndpoint = {
  // ---------------- LANGUAGES ----------------

  // Get all published languages
  getLanguages: () =>
    axiosInstance.get("/api/languages/public"),

  // ---------------- MENUS / NAVIGATION ----------------

  // Get public menu hierarchy for a language
  getMenuHierarchy: (encryptedLanguageId) =>
    axiosInstance.get(
      `/api/menus/navmenus/${encodeURIComponent(encryptedLanguageId)}`
    ),

  // ---------------- PAGES ----------------

  // Get page content using encryptedMenuId AND encryptedLanguageId
  getPageContent: (encryptedMenuId, encryptedLanguageId) =>
    axiosInstance.get(
      `/api/pages/content/${encodeURIComponent(encryptedMenuId)}/${encodeURIComponent(encryptedLanguageId)}`
    ),

  // ✅ NAYA: Get page content using URL and encryptedLanguageId
  getPageByUrl: (url, encryptedLanguageId) =>
    axiosInstance.get(
      `/api/pages/content/by-url/${encodeURIComponent(encryptedLanguageId)}`,
      {
        params: { url }, // Axios automatically encode karega URL query param ko
      }
    ),
};

export default contentEndpoint;