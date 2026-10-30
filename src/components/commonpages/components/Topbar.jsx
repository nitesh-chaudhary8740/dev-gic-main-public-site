import React from "react";
import { Search, FileText, User } from "lucide-react";

const Topbar = () => {
  return (
    <div className="bg-white font-sans">
      {/* Top Utility Strip */}
      <div className="bg-gray-100 border-b border-gray-200 py-1.5 px-4 flex flex-wrap justify-end items-center gap-3 text-xs text-gray-700">
        <button className="border border-blue-800 text-blue-800 px-3 py-1 rounded hover:bg-blue-50 transition">
          Skip To Main Content
        </button>

        <div className="flex items-center gap-1">
          <button className="border border-gray-400 rounded w-6 h-6 flex items-center justify-center hover:bg-gray-200 bg-white">
            A+
          </button>
          <button className="border border-gray-400 rounded w-6 h-6 flex items-center justify-center hover:bg-gray-200 bg-white">
            A
          </button>
          <button className="border border-gray-400 rounded w-6 h-6 flex items-center justify-center hover:bg-gray-200 bg-white">
            A-
          </button>
        </div>

        <select className="border border-gray-400 rounded px-2 py-1 bg-white outline-none text-xs">
          <option>Select Language</option>
          <option>English</option>
          <option>Hindi</option>
        </select>

        <div className="flex border border-gray-400 rounded overflow-hidden bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1 outline-none w-40 text-xs"
          />
          <button className="bg-blue-800 text-white px-2 py-1 flex items-center justify-center">
            <Search size={14} />
          </button>
        </div>
      </div>

      {/* Main Header: Logo + Title + Icons */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left: Logo and Title */}
        <div className="flex items-center gap-4">
          <img
            className="h-16 w-16 object-contain"
            src="/Images/mdlNavlogo.png"
            alt="MDL Logo"
          />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight">
              Mazagon Dock Shipbuilders Ltd.
            </h1>
            <p className="text-sm text-gray-600">Shipbuilders to the Nation</p>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-5 text-blue-900 border-l-0 md:border-l border-gray-300 md:pl-6">
          <button className="hover:text-blue-600 transition">
            <FileText size={22} />
          </button>
          <button className="font-bold text-lg hover:text-blue-600 flex items-start transition">
            अ <span className="text-[10px] ml-0.5 mt-0.5">A</span>
          </button>
          <button className="hover:text-blue-600 transition">
            <User size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;