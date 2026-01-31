"use client";

import { useState, useEffect } from "react";
import {
  getInsightByIndex,
  getHourlyInsightIndex,
  getTotalInsights,
} from "@/content/security-insights";

export function SecurityInsightCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialize with hourly index on mount
  useEffect(() => {
    setCurrentIndex(getHourlyInsightIndex());
  }, []);

  const insight = getInsightByIndex(currentIndex);
  const totalInsights = getTotalInsights();

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalInsights);
  };

  return (
    <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground flex items-center gap-2">
          <span>💡</span> Did you know?
        </span>
        <button
          onClick={handleNext}
          className="text-xs text-teal-400 hover:text-teal-300"
        >
          Next →
        </button>
      </div>
      <p className="text-sm text-foreground">
        <strong className="text-teal-400">{insight.term}</strong> — {insight.tip}
      </p>
    </div>
  );
}
