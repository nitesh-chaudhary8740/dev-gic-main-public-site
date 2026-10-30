import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-50 px-6">
      
      {/* Background Decorative Elements - Modern Touch */}
      <div className="absolute top-[-10%] left-[-10%] h-64 w-64 rounded-full bg-blue-100 blur-3xl opacity-60" />
      <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-indigo-100 blur-3xl opacity-60" />

      {/* Main Content Card */}
      <div className="z-10 flex flex-col items-center">
        
        {/* Animated Icon */}
        <div className="mb-6 rounded-3xl bg-white p-4 shadow-xl ring-1 ring-slate-200/50">
          <AlertCircle size={48} className="text-indigo-600 animate-pulse" />
        </div>

        {/* 404 Text with Gradient */}
        <h1 className="bg-gradient-to-b from-slate-900 to-slate-500 bg-clip-text text-8xl font-black tracking-tighter text-transparent sm:text-9xl md:text-[12rem] leading-none">
          404
        </h1>

        {/* Message Section */}
        <div className="mt-4 flex flex-col items-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 sm:text-3xl md:text-4xl">
            Lost in Space?
          </h2>
          <p className="max-w-md text-center text-base font-medium text-slate-500 sm:text-lg">
            Oops! The page you're looking for has vanished into thin air. Let's get you back on track.
          </p>
        </div>

        {/* Modern Button Group */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-indigo-600 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-95"
          >
            <Home size={18} className="transition-transform group-hover:-translate-y-0.5" />
            Return Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300 active:scale-95"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Footer Branding (Optional) */}
      <div className="absolute bottom-8 text-sm font-medium text-slate-400">
        &copy; {new Date().getFullYear()} YourBrand Inc.
      </div>
    </div>
  );
};

export default NotFound;