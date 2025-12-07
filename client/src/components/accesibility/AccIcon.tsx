"use client";

import { AccesibilityContext } from "@/contexts/AccesibilityContext";
import { PersonStanding } from "lucide-react";
import { useContext, useState } from "react";

export function AccIcon() {
  const [open, setOpen] = useState(false);
  const acc = useContext(AccesibilityContext);

  return (
    <div onClick={() => setOpen((o) => !o)}>
      <button className="realtive bg-blue-500 rounded-xl">
        <PersonStanding color="white" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white shadow-md rounded-md p-4 w-48 z-50">
          <div className="flex justify-between mb-2">
            <span>Czcionka</span>
            <div className="flex gap-1">
              <button onClick={() => acc.setFontSize((f) => f - 10)}>-</button>
              <button onClick={() => acc.setFontSize((f) => f + 10)}>+</button>
            </div>
          </div>

          <div className="flex justify-between mb-2">
            <span>Odstęp</span>
            <div className="flex gap-1">
              <button onClick={() => acc.setLetterSpacing((l) => l - 1)}>
                -
              </button>
              <button onClick={() => acc.setLetterSpacing((l) => l + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <span>Kontrast</span>
            <button onClick={() => acc.setHighContrast((x) => !x)}>
              {acc.highContrast ? "Wyłącz" : "Włącz"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
