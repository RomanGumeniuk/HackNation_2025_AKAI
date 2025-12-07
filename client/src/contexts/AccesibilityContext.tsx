"use client";
import { createContext, useEffect, useState } from "react";

export const AccesibilityContext = createContext({
  fontSize: 100,
  letterSpacing: 0,
  highContrast: false,
  setFontSize: (newVal: number): any => {},
  setLetterSpacing: (newVal: number): any => {},
  setHighContrast: (newVal: boolean): any => {},
});

export function AccesibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontSize, setFontSize] = useState(100);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    document.documentElement.style.letterSpacing = `${letterSpacing}px`;
    document.documentElement.classList.toggle("high-contrast", highContrast);
  }, [fontSize, letterSpacing, highContrast]);

  return (
    <AccesibilityContext.Provider
      value={{
        fontSize,
        letterSpacing,
        highContrast,
        setFontSize,
        setLetterSpacing,
        setHighContrast,
      }}
    >
      {children}
    </AccesibilityContext.Provider>
  );
}
