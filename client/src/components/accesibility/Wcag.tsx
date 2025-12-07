"use client";

import { PersonStanding } from "lucide-react";
import { AccesibilityContext } from "@/contexts/AccesibilityContext";
import { useContext, useState } from "react";

export function Wcag() {
  const { fontSize, letterSpacing, highContrast, setFontSize, setLetterSpacing, setHighContrast } = useContext(AccesibilityContext);
  const [isOpen, setIsOpen] = useState(false);

  const fontSizes = [80, 100, 120];
  const letterSpacings = [0, 2, 4];

  const cycleFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    const nextIndex = (currentIndex + 1) % fontSizes.length;
    setFontSize(fontSizes[nextIndex]);
  };

  const cycleLetterSpacing = () => {
    const currentIndex = letterSpacings.indexOf(letterSpacing);
    const nextIndex = (currentIndex + 1) % letterSpacings.length;
    setLetterSpacing(letterSpacings[nextIndex]);
  };

  return (
    <div className="relative">
      <button 
        className="bg-blue-500 rounded-xl p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PersonStanding color="white" />
      </button>
      {isOpen && (
        <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-50">
          <div className="space-y-2">
            <div>
              <button onClick={cycleFontSize} className="px-2 py-1 rounded bg-gray-200">Aa</button>
            </div>

            <div>
              <button onClick={cycleLetterSpacing} className="px-2 py-1 rounded bg-gray-200">F-f</button>
            </div>

            <div>
              <button onClick={() => setHighContrast(!highContrast)} className={`px-2 py-1 rounded ${highContrast ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>HC
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
