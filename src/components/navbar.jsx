"use client";

import {
  Star,
  CircleHelp,
  Settings,
  RotateCcw,
  Bell,
  Search,
  Menu,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full p-2 pl-64 sm:p-4 gap-2 sm:gap-4 border-b border-gray-400">
      <div className="flex justify-center items-center w-1/3 pl-2 sm:pl-6 py-2 sm:py-4">
        <Star className="h-5 w-5" />
        <p className="pl-2 sm:pl-6 opacity-50">Customers</p>
      </div>

      <Button
        variant="ghost"
        className="sm:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      <div
        className={`
          flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-10 py-2 sm:py-4 w-full sm:w-auto
          ${showMobileMenu ? "flex" : "hidden sm:flex"}
        `}
      >
        <div className="flex flex-col items-start sm:items-end">
          <div className="text-lg sm:text-xl">Sept 24</div>
          <div className="text-xs">2024</div>
        </div>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full sm:w-auto pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-4 sm:gap-10">
          <CircleHelp className="h-5 w-5" />
          <Settings className="h-5 w-5" />
          <RotateCcw className="h-5 w-5" />
          <Bell className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
