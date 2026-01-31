"use client";

import { Card, CardContent } from "@/components/ui/card";

interface BadgeEarnedProps {
  badge: {
    id: string;
    name: string;
    description: string;
  };
  onClose?: () => void;
}

export function BadgeEarned({ badge, onClose }: BadgeEarnedProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="glass-card max-w-sm mx-4 text-center animate-in zoom-in-95">
        <CardContent className="p-8">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-xl font-bold text-foreground mb-2">Badge Earned!</h2>
          <p className="text-primary font-semibold text-lg mb-2">{badge.name}</p>
          <p className="text-sm text-muted-foreground mb-6">{badge.description}</p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Awesome!
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
