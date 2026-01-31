"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/email-entry/user-context";

interface AssessmentResult {
  id: string;
  score: number;
  total_questions: number;
  answers: Record<string, string>;
  created_at: string;
}

export default function AssessmentPage() {
  const { email } = useUser();
  const [preAssessment, setPreAssessment] = useState<AssessmentResult | null>(null);
  const [postAssessment, setPostAssessment] = useState<AssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAssessments() {
      if (!email) return;
      
      try {
        const response = await fetch(`/api/assessment?email=${encodeURIComponent(email)}`);
        if (response.ok) {
          const data = await response.json();
          setPreAssessment(data.pre);
          setPostAssessment(data.post);
        }
      } catch (error) {
        console.error("Failed to fetch assessments:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAssessments();
  }, [email]);

  const hasPreAssessment = !!preAssessment;
  const hasPostAssessment = !!postAssessment;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading assessments...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground">Knowledge Assessment</h1>
        <p className="text-muted-foreground mt-2">
          Measure your product security knowledge before and after the curriculum
        </p>
      </div>

      {/* Explanation card */}
      <Card className="glass-card border-teal-500/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="text-3xl">📊</div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Why Take the Assessment?</h3>
              <p className="text-sm text-muted-foreground">
                Before diving into the learning modules, we recommend taking a quick 5-minute assessment. 
                This helps understand your current knowledge level and creates a baseline to measure your progress. 
                After completing the curriculum, you&apos;ll retake this same assessment to see how much you&apos;ve learned!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment cards */}
      <div className="grid gap-4">
        {/* Pre-assessment */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Pre-Assessment</span>
              {hasPreAssessment && (
                <span className="text-sm font-normal text-green-400">✓ Completed</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasPreAssessment ? (
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-teal-400">
                    {preAssessment.score}/{preAssessment.total_questions}
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      {Math.round((preAssessment.score / preAssessment.total_questions) * 100)}% correct
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Completed {new Date(preAssessment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Complete the curriculum and take the post-assessment to see your improvement!
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Take this assessment before starting the curriculum to establish your baseline knowledge.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">~2 minutes • 12 questions</span>
                  <div className="flex gap-2">
                    <Link href="/modules">
                      <Button variant="ghost" size="sm">
                        Skip for now
                      </Button>
                    </Link>
                    <Link href="/assessment/pre">
                      <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-black font-semibold">
                        Start Assessment
                      </Button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Post-assessment */}
        <Card className={`glass-card ${!hasPreAssessment ? "opacity-50" : ""}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Post-Assessment</span>
              {hasPostAssessment && (
                <span className="text-sm font-normal text-green-400">✓ Completed</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasPostAssessment ? (
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl font-bold text-teal-400">
                    {postAssessment.score}/{postAssessment.total_questions}
                  </div>
                  <div>
                    <p className="text-sm text-foreground">
                      {Math.round((postAssessment.score / postAssessment.total_questions) * 100)}% correct
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Completed {new Date(postAssessment.created_at).toLocaleDateString()}
                    </p>
                    {preAssessment && (
                      <p className="text-xs text-green-400 mt-1">
                        +{Math.round((postAssessment.score / postAssessment.total_questions) * 100) - Math.round((preAssessment.score / preAssessment.total_questions) * 100)}% improvement
                      </p>
                    )}
                  </div>
                </div>
                <Link href="/assessment/post/review">
                  <Button variant="outline" size="sm">
                    Review Answers
                  </Button>
                </Link>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Take this after completing the curriculum to measure your improvement.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">~2 minutes • 12 questions</span>
                  <Link href="/assessment/post">
                    <Button 
                      size="sm" 
                      disabled={!hasPreAssessment}
                      className="bg-teal-500 hover:bg-teal-600 text-black font-semibold"
                    >
                      Start Assessment
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Skip note */}
      <p className="text-xs text-muted-foreground text-center">
        You can skip the pre-assessment and take it later from Settings.
      </p>
    </div>
  );
}
