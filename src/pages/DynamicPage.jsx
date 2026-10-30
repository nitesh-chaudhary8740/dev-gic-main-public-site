
import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import {
  RefreshCw,
  AlertCircle,
  FileQuestion,
  ArrowLeft,
} from "lucide-react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://192.168.1.194:3000";

// --------------------------------------------------
// Helper: API Request
// --------------------------------------------------
async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const text = await response.text();

  // eslint-disable-next-line no-useless-assignment
  let result = null;

  try {
    result = text ? JSON.parse(text) : null;
  } catch {
    result = text;
  }

  if (!response.ok) {
    const message =
      result?.message ||
      result?.error ||
      (typeof result === "string" ? result : null) ||
      `API error: ${response.status}`;

    throw new Error(message);
  }

  return result;
}

// --------------------------------------------------
// Helper: Extract array from API response
// --------------------------------------------------
function getArrayData(result) {
  if (Array.isArray(result)) return result;

  if (Array.isArray(result?.data)) {
    return result.data;
  }

  return [];
}

// --------------------------------------------------
// Dynamic Page
// --------------------------------------------------
export default function DynamicPage() {
  const { slug } = useParams();
  const location = useLocation();

  const currentPath = location.pathname;

  const [page, setPage] = useState(null);

  // loading / error ko ek hi state mein manage karna cleaner hai
  const [status, setStatus] = useState("loading");

  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchPage() {
      try {
        const res = await apiRequest("/api/pages");

        if (cancelled) return;

        const allPages = getArrayData(res);

        const normalizedCurrent = currentPath.startsWith("/")
          ? currentPath
          : `/${currentPath}`;

        const matchedPage = allPages.find((p) => {
          const translationURL = p?.menuTranslation?.menuURL;

          if (!translationURL) {
            return false;
          }

          const normalizedTranslation = translationURL.startsWith("/")
            ? translationURL
            : `/${translationURL}`;

          return normalizedTranslation === normalizedCurrent;
        });

        if (!matchedPage) {
          setPage(null);
          setError("404");
          setStatus("error");
          return;
        }

        if (!matchedPage.isPublished) {
          setPage(null);
          setError("UNPUBLISHED");
          setStatus("error");
          return;
        }

        setPage(matchedPage);
        setError("");
        setStatus("success");
      } catch (err) {
        if (cancelled) return;

        console.error("Page load error:", err);

        setPage(null);
        setError(err.message || "Page load nahi ho paya.");
        setStatus("error");
      }
    }

    // Root URL ko API call ki zarurat nahi
    if (!currentPath || currentPath === "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage(null);
      setError("404");
      setStatus("error");

      return () => {
        cancelled = true;
      };
    }

    fetchPage();

    return () => {
      cancelled = true;
    };
  }, [currentPath, slug]);

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3 text-slate-600">
          <RefreshCw
            size={32}
            className="animate-spin text-blue-600"
          />

          <p className="text-sm font-medium">
            Page load ho raha hai...
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // 404
  // --------------------------------------------------
  if (error === "404") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <FileQuestion
              size={32}
              className="text-amber-600"
            />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Page Not Found
          </h1>

          <p className="text-slate-600 text-sm mb-6">
            Yeh page exist nahi karta ya URL galat hai.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={16} />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Unpublished
  // --------------------------------------------------
  if (error === "UNPUBLISHED") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-slate-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle
              size={32}
              className="text-rose-600"
            />
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Page Unavailable
          </h1>

          <p className="text-slate-600 text-sm mb-6">
            Yeh page abhi publish nahi hua hai. Kripya baad mein
            try karein.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            <ArrowLeft size={16} />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Generic Error
  // --------------------------------------------------
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-rose-200 p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle
              size={32}
              className="text-rose-600"
            />
          </div>

          <h1 className="text-xl font-bold text-slate-900 mb-2">
            Kuch galat ho gaya
          </h1>

          <p className="text-slate-600 text-sm mb-6">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            <RefreshCw size={16} />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Safety check
  // --------------------------------------------------
  if (!page) {
    return null;
  }

  // --------------------------------------------------
  // Render CMS HTML inside iframe
  // --------------------------------------------------
  return (
    <iframe
      title={page?.menuTranslation?.menuTitle || "Page"}
      srcDoc={page.content}
      sandbox="allow-scripts allow-popups allow-forms"
      className="w-screen h-screen border-0 block"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
      }}
    />
  );
}
