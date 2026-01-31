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
  const [progress, setProgress] = useState(0);

  const rotateIntervalMs = 15_000;
  const totalInsights = getTotalInsights();

  // Initialize index on mount and set up auto-rotation
  useEffect(() => {
    setCurrentIndex(getTimedInsightIndex(rotateIntervalMs));

    const rotateId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalInsights);
    }, rotateIntervalMs);

    return () => clearInterval(rotateId);
  }, [totalInsights]);

  // Progress tracking - resets when currentIndex changes
  useEffect(() => {
    setProgress(0);
    const cycleStartTime = Date.now();

    const progressId = setInterval(() => {
      const elapsed = Date.now() - cycleStartTime;
      const newProgress = Math.min(100, (elapsed / rotateIntervalMs) * 100);
      setProgress(newProgress);
    }, 100);

    return () => clearInterval(progressId);
  }, [currentIndex]);

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
          className="text-xs text-teal-400 hover:text-teal-300 inline-flex items-center gap-1.5"
        >
          {/* Countdown doughnut */}
          <svg className="h-3.5 w-3.5 -rotate-90" viewBox="0 0 16 16">
            <circle
              cx="8"
              cy="8"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              opacity="0.2"
            />
            <circle
              cx="8"
              cy="8"
              r="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={`${(progress / 100) * 37.7} 37.7`}
              strokeLinecap="round"
              className="transition-all duration-100"
            />
          </svg>
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
