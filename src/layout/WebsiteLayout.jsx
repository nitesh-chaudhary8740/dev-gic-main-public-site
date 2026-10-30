import  { useState } from "react";
import Footer from "../components/commonpages/Footer";
import Header from "../components/commonpages/Header";
import { Outlet } from "react-router-dom";
import AccessibilityPanel from "../components/commonpages/components/AccessibilityPanel";

const WebsiteLayout = () => {
  const [accessOpen, setAccessOpen] = useState(false);
  return (
    <div className="min-h-screen  flex flex-col bg-gray-50 relative">
      <Header onAccessClick={() => setAccessOpen(true)} />

      {/* MAIN CONTENT */}
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 w-full min-w-0 outline-none"
      >
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="w-full mt-auto shrink-0">
        <Footer />
      </footer>

      {/* ACCESSIBILITY PANEL */}
      {accessOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-55"
            onClick={() => setAccessOpen(false)}
          />
          <div className="fixed right-0 top-0 h-screen bg-white shadow-2xl z-60 border-l border-gray-200 w-full sm:w-90">
            <AccessibilityPanel onClose={() => setAccessOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
};

export default WebsiteLayout;