"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/email-entry/user-context";
import { assessmentQuestions } from "@/content/assessment/questions";

interface AssessmentResult {
  score: number;
  total_questions: number;
  answers: Record<string, string>;
  created_at: string;
}

export default function PostAssessmentReviewPage() {
  const { email } = useUser();
  const [preAssessment, setPreAssessment] = useState<AssessmentResult | null>(null);
  const [postAssessment, setPostAssessment] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessment() {
      if (!email) return;

      try {
        const response = await fetch(
          `/api/assessment?email=${encodeURIComponent(email)}`
        );
        if (response.ok) {
          const data = await response.json();
          setPreAssessment(data.pre);
          setPostAssessment(data.post);
        }
      } catch (error) {
        console.error("Failed to fetch assessment:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAssessment();
  }, [email]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">
          Loading review...
        </div>
      </div>
    );
  }

  if (!postAssessment) {
    return (
      <div className="max-w-xl mx-auto text-center py-12">
        <h2 className="text-xl font-bold text-foreground mb-2">
          No Post-Assessment Found
        </h2>
        <p className="text-muted-foreground mb-4">
          Complete the post-assessment first to review your answers.
        </p>
        <Link href="/assessment">
          <Button>Back to Assessment</Button>
        </Link>
      </div>
    );
  }

  const answers = postAssessment.answers || {};
  const percentage = Math.round(
    (postAssessment.score / postAssessment.total_questions) * 100
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground">Answer Review</h1>
        <p className="text-muted-foreground mt-1">
          Your post-assessment score: {postAssessment.score}/
          {postAssessment.total_questions} ({percentage}%)
        </p>
      </div>

      {/* Answers */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-6">
            Compare your pre and post assessment answers:
          </p>

          <div className="space-y-6">
            {assessmentQuestions.map((q, idx) => {
              const postAnswer = answers[q.id];
              const preAnswer = preAssessment?.answers?.[q.id];
              const postCorrect = postAnswer === q.correct_answer;
              const preCorrect = preAnswer === q.correct_answer;
              const improved = !preCorrect && postCorrect;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-lg border ${
                    improved
                      ? "bg-gradient-to-r from-green-500/20 to-teal-500/20 border-green-500/50"
                      : "bg-muted/20 border-muted/30"
                  }`}
                >
                  {/* Improvement badge */}
                  {improved && (
                    <div className="flex items-center gap-2 mb-3 text-green-400">
                      <span className="text-xl">🎉</span>
                      <span className="text-sm font-semibold">
                        You improved on this one!
                      </span>
                    </div>
                  )}

                  <p className="font-medium text-foreground mb-4">
                    {idx + 1}. {q.question}
                  </p>

                  {/* Options with indicators */}
                  <div className="space-y-2 mb-4">
                    {q.options.map((option) => {
                      const isCorrectAnswer = option.id === q.correct_answer;
                      const wasPreAnswer = option.id === preAnswer;
                      const wasPostAnswer = option.id === postAnswer;

                      return (
                        <div
                          key={option.id}
                          className={`p-3 rounded-lg text-sm flex items-center justify-between ${
                            isCorrectAnswer
                              ? "bg-green-500/20 border border-green-500/40"
                              : wasPreAnswer || wasPostAnswer
                              ? "bg-red-500/10 border border-red-500/30"
                              : "bg-white/5 border border-white/10"
                          }`}
                        >
                          <span
                            className={
                              isCorrectAnswer ? "text-green-400" : "text-foreground"
                            }
                          >
                            <span className="font-medium">
                              {option.id.toUpperCase()}.
                            </span>{" "}
                            {option.text}
                          </span>
                          <div className="flex items-center gap-2">
                            {wasPreAnswer && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                  preCorrect
                                    ? "bg-green-500/30 text-green-400"
                                    : "bg-red-500/30 text-red-400"
                                }`}
                              >
                                Pre {preCorrect ? "✓" : "✗"}
                              </span>
                            )}
                            {wasPostAnswer && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded ${
                                  postCorrect
                                    ? "bg-green-500/30 text-green-400"
                                    : "bg-red-500/30 text-red-400"
                                }`}
                              >
                                Post {postCorrect ? "✓" : "✗"}
                              </span>
                            )}
                            {isCorrectAnswer &&
                              !wasPreAnswer &&
                              !wasPostAnswer && (
                                <span className="text-xs text-green-400">
                                  ✓ Correct
                                </span>
                              )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <p className="text-xs text-muted-foreground">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Back button */}
      <div className="flex justify-center">
        <Link href="/assessment">
          <Button variant="outline">Back to Assessment</Button>
        </Link>
      </div>
    </div>
  );
}
