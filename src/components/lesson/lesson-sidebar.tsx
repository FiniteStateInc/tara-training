"use client";

import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkles } from "lucide-react";

interface LessonSidebarProps {
  title: string;
  taskNumber: number;
  totalTasks: number;
  instructions: string;
  whyItMatters: string;
  tips: string[];
  isCompleted: boolean;
  isSaving?: boolean;
  onMarkComplete: () => void;
}

export function LessonSidebar({
  title,
  taskNumber,
  totalTasks,
  instructions,
  whyItMatters,
  tips,
  isCompleted,
  isSaving = false,
  onMarkComplete,
}: LessonSidebarProps) {
  return (
    <div className="h-full flex flex-col">
      {/* Task title - fixed above scroll area */}
      <div className="pb-3 mb-3 border-b border-border/30">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
            Task
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {taskNumber}/{totalTasks}
          </span>
        </div>
        <h2 className="text-lg font-bold text-foreground mt-0.5">{title}</h2>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {/* Instructions - no card wrapper, cleaner look */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Instructions
          </h3>
          <div
            className="text-sm text-foreground/90 leading-relaxed instruction-content"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(instructions) }}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-border/30" />

        {/* Why it matters */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" />
            Why This Matters
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {whyItMatters}
          </p>
        </div>

        {/* Tips */}
        {tips.length > 0 && (
          <>
            <div className="border-t border-border/30" />
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Tips
              </h3>
              <ul className="space-y-1.5">
                {tips.map((tip, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2 leading-relaxed"
                  >
                    <span className="text-cyan-400 mt-1">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>

      {/* Fixed bottom action area */}
      <div className="pt-4 border-t border-border/50 mt-4">
        <Button
          onClick={onMarkComplete}
          disabled={isCompleted || isSaving}
          className={`w-full ${
            isCompleted
              ? "bg-teal-500/20 text-teal-400 border border-teal-500/30"
              : "bg-teal-500 hover:bg-teal-600 text-black font-semibold glow-teal"
          }`}
        >
          {isSaving
            ? "Saving..."
            : isCompleted
              ? "✓ Task Completed"
              : "Mark Complete"}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-2">
          {isCompleted
            ? "Moving to next task..."
            : "Complete the task in the TARA app, then click above"}
        </p>
      </div>
    </div>
  );
}

// Enhanced markdown parser for step-by-step instructions
function parseMarkdown(text: string): string {
  const lines = text.split("\n");
  const result: string[] = [];
  let inList = false;
  let listType: "ol" | "ul" | null = null;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Bold text
    line = line.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-foreground font-medium">$1</strong>',
    );

    // Inline code
    line = line.replace(
      /`(.*?)`/g,
      '<code class="text-teal-400 bg-teal-500/10 px-1 rounded text-xs">$1</code>',
    );

    // Check for numbered list item (1. 2. 3. etc)
    const numberedMatch = line.match(/^(\d+)\.\s+(.*)$/);
    // Check for bullet list item (• - *)
    const bulletMatch = line.match(/^[\s]*[•\-\*]\s+(.*)$/);

    if (numberedMatch) {
      if (!inList || listType !== "ol") {
        if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
        result.push('<ol class="space-y-2 my-3">');
        inList = true;
        listType = "ol";
      }
      result.push(
        `<li class="flex gap-2"><span class="text-teal-400 font-semibold flex-shrink-0">${numberedMatch[1]}.</span><span>${numberedMatch[2]}</span></li>`,
      );
    } else if (bulletMatch) {
      if (!inList || listType !== "ul") {
        if (inList) result.push(listType === "ul" ? "</ul>" : "</ol>");
        result.push('<ul class="space-y-1.5 my-2 ml-4">');
        inList = true;
        listType = "ul";
      }
      result.push(
        `<li class="flex gap-2"><span class="text-muted-foreground">•</span><span>${bulletMatch[1]}</span></li>`,
      );
    } else {
      // Close any open list
      if (inList) {
        result.push(listType === "ul" ? "</ul>" : "</ol>");
        inList = false;
        listType = null;
      }

      // Empty line = paragraph break
      if (line.trim() === "") {
        result.push('<div class="h-2"></div>');
      } else if (line.startsWith("Note:") || line.startsWith("Note -")) {
        result.push(
          `<p class="text-xs text-muted-foreground bg-muted/30 rounded px-2 py-1.5 my-2 border-l-2 border-teal-500/50">${line}</p>`,
        );
      } else {
        result.push(`<p class="my-1">${line}</p>`);
      }
    }
  }

  // Close any remaining open list
  if (inList) {
    result.push(listType === "ul" ? "</ul>" : "</ol>");
  }

  return result.join("");
}
