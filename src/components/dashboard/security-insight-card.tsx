"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Lightbulb } from "lucide-react";
import {
  getInsightByIndex,
  getTimedInsightIndex,
  getTotalInsights,
} from "@/content/security-insights";

export function SecurityInsightCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const rotateIntervalMs = 30_000;
  const totalInsights = getTotalInsights();

  // Initialize and rotate on interval
  useEffect(() => {
    setCurrentIndex(getTimedInsightIndex(rotateIntervalMs));
    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalInsights);
    }, rotateIntervalMs);

    return () => clearInterval(intervalId);
  }, [totalInsights]);

  const insight = getInsightByIndex(currentIndex);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalInsights);
  };

  return (
    <div className="px-4 py-3 rounded-lg bg-white/5 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-muted-foreground flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-teal-400" />
          Did you know?
        </span>
        <button
          onClick={handleNext}
          className="text-xs text-teal-400 hover:text-teal-300 inline-flex items-center gap-1"
        >
          <span>View next insight</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <p className="text-sm text-foreground">
        <strong className="text-teal-400">{insight.term}</strong> —{" "}
        {insight.tip}
      </p>
    </div>
  );
}
