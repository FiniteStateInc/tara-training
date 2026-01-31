"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProgress } from "@/hooks/use-progress";

// Shield segments mapped to modules (13 total)
const shieldSegments = [
  { id: "initial-onboarding", label: "Onboarding", angle: 0 },
  { id: "project-setup", label: "Project Setup", angle: 27.7 },
  { id: "document-management", label: "Documents", angle: 55.4 },
  { id: "architecture-modeling", label: "Architecture", angle: 83.1 },
  { id: "asset-identification", label: "Assets", angle: 110.8 },
  { id: "threat-generation", label: "Threats", angle: 138.5 },
  { id: "attack-path-analysis", label: "Attack Paths", angle: 166.2 },
  { id: "risk-assessment", label: "Risks", angle: 193.9 },
  { id: "mitigation-planning", label: "Mitigations", angle: 221.6 },
  { id: "requirements-generation", label: "Requirements", angle: 249.3 },
  { id: "sbom-vulnerability", label: "SBOM/Vulns", angle: 277 },
  { id: "compliance-verification", label: "Compliance", angle: 304.7 },
  { id: "report-generation", label: "Reports", angle: 332.4 },
];

export function SecurityShield() {
  const { getModuleStatuses } = useProgress();
  const statuses = getModuleStatuses();
  
  // Count completed modules from actual progress
  const unlockedSegments = shieldSegments.filter(
    seg => statuses[seg.id] === "completed"
  ).map(seg => seg.id);
  
  const completedCount = unlockedSegments.length;
  const totalCount = shieldSegments.length;
  const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <span>🛡️</span>
          <span>Security Shield</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Shield visualization - 13 segment hexagon */}
        <div className="relative aspect-square max-w-[280px] mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Background shield shape */}
            <path
              d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z"
              fill="rgba(20, 20, 20, 0.8)"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
            
            {/* 13 segment arcs */}
            {shieldSegments.map((segment, index) => {
              const isUnlocked = unlockedSegments.includes(segment.id);
              const startAngle = (index * 360) / 13 - 90;
              const endAngle = ((index + 1) * 360) / 13 - 90;
              const innerRadius = 20;
              const outerRadius = 38;
              
              const startRadians = (startAngle * Math.PI) / 180;
              const endRadians = (endAngle * Math.PI) / 180;
              
              const x1 = 50 + innerRadius * Math.cos(startRadians);
              const y1 = 50 + innerRadius * Math.sin(startRadians);
              const x2 = 50 + outerRadius * Math.cos(startRadians);
              const y2 = 50 + outerRadius * Math.sin(startRadians);
              const x3 = 50 + outerRadius * Math.cos(endRadians);
              const y3 = 50 + outerRadius * Math.sin(endRadians);
              const x4 = 50 + innerRadius * Math.cos(endRadians);
              const y4 = 50 + innerRadius * Math.sin(endRadians);
              
              return (
                <path
                  key={segment.id}
                  d={`M ${x1} ${y1} L ${x2} ${y2} A ${outerRadius} ${outerRadius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`}
                  fill={isUnlocked ? "#14b8a6" : "rgba(255,255,255,0.05)"}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="0.5"
                  className={isUnlocked ? "" : ""}
                />
              );
            })}

            {/* Center emblem */}
            <circle cx="50" cy="50" r="15" fill="rgba(20, 20, 20, 0.9)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
              {progress}%
            </text>
          </svg>
        </div>

        {/* Progress text */}
        <div className="text-center mb-4">
          <p className="text-2xl font-bold text-teal-400">{completedCount}/{totalCount}</p>
          <p className="text-sm text-muted-foreground">segments unlocked</p>
        </div>

        {/* How to unlock explanation */}
        <div className="text-xs text-muted-foreground text-center p-3 rounded-lg bg-white/5">
          <p>Complete learning modules to unlock shield segments and build your security expertise!</p>
        </div>

      </CardContent>
    </Card>
  );
}
