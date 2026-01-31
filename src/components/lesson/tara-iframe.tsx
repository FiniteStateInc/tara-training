"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Monitor, CheckCircle2 } from "lucide-react";

interface TaraIframeProps {
  path: string;
}

const TARA_BASE_URL =
  process.env.NEXT_PUBLIC_TARA_URL || "https://finite-state-tara-ai.vercel.app";

export function TaraIframe({ path }: TaraIframeProps) {
  const [isLaunched, setIsLaunched] = useState(false);
  const fullUrl = `${TARA_BASE_URL}${path}`;

  const handleLaunch = () => {
    window.open(fullUrl, "_blank", "noopener,noreferrer");
    setIsLaunched(true);
  };

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-background to-background/80 flex flex-col items-center justify-center p-8">
      {/* TARA placeholder visual */}
      <div className="w-full max-w-lg text-center space-y-6">
        {/* Icon */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
          <Monitor className="w-10 h-10 text-teal-400" />
        </div>

        {/* Title and description */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            TARA Platform
          </h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Complete this task in the TARA application. Click the button below
            to open TARA in a new browser tab.
          </p>
        </div>

        {/* Launch button */}
        <Button
          onClick={handleLaunch}
          size="lg"
          className="bg-teal-500 hover:bg-teal-600 text-black font-semibold gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          {isLaunched ? "Open TARA Again" : "Launch TARA"}
        </Button>

        {/* Status indicator */}
        {isLaunched && (
          <div className="flex items-center justify-center gap-2 text-sm text-teal-400 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>TARA opened in new tab</span>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border/50 text-left">
          <h4 className="text-sm font-medium text-foreground mb-2">
            How to use:
          </h4>
          <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal list-inside">
            <li>Click &quot;Launch TARA&quot; to open the app in a new tab</li>
            <li>Arrange your windows side-by-side for the best experience</li>
            <li>Complete the task following the instructions on the right</li>
            <li>Return here and click &quot;Mark Complete&quot; when done</li>
          </ol>
        </div>

        {/* Deep link info */}
        <p className="text-xs text-muted-foreground/60">
          Opens:{" "}
          <code className="bg-muted/50 px-1.5 py-0.5 rounded text-[10px]">
            {path}
          </code>
        </p>
      </div>
    </div>
  );
}
