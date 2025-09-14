"use client";

import React from "react";
import type { SectionType } from "../types";
import { NAVIGATION_ITEMS } from "../constants";

interface HeaderProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onSectionChange,
}) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div>
            <h1 className="text-2xl font-bold leading-tight text-gray-800">
              Dashboard Chính sách Petdays
            </h1>
            <p className="hidden sm:block mt-1 text-sm text-gray-500">
              Mô phỏng chiết khấu và lợi nhuận cho đối tác phân phối.
            </p>
          </div>
        </div>
        <nav className="flex space-x-4 border-b border-gray-200">
          {NAVIGATION_ITEMS.map((nav) => (
            <button
              key={nav.id}
              type="button"
              onClick={() => onSectionChange(nav.id)}
              className={`nav-button py-3 px-1 text-sm font-medium transition-all duration-300 border-b-2 ${
                activeSection === nav.id
                  ? "border-green-700 text-green-700 font-semibold"
                  : "border-transparent text-gray-500 hover:text-green-700 hover:border-gray-200"
              }`}
            >
              {nav.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};
