"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "./ui/button";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div className="relative">
        {isVisible && (
          <>
            {/* Pulsujące kółka */}
            <div className="absolute inset-0 rounded-full bg-red-600/40 animate-pulse scale-[1.35] transform-gpu"></div>
            <div className="absolute inset-0 rounded-full bg-red-600/20 animate-pulse scale-[1.7] transform-gpu animation-delay-2000"></div>

            <Button
              onClick={scrollToTop}
              size="icon"
              className="bg-red-600 hover:bg-red-700 rounded-full shadow-lg transition-transform duration-300 hover:scale-110 text-white relative z-10"
              aria-label="Przewiń do góry"
            >
              <ChevronUp className="h-5 w-5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
