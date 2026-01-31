"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getAssessmentQuestions, calculateAssessmentResults } from "@/content/assessment/questions";
import { useUser } from "@/components/email-entry/user-context";

export default function PreAssessmentPage() {
  const router = useRouter();
  const { email } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [startTime] = useState(Date.now());

  // Get questions once and memoize
  const questions = useMemo(() => getAssessmentQuestions(12), []);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleAnswer = (optionId: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: optionId });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Save results to database when completed
  useEffect(() => {
    async function saveResults() {
      if (showResults && email && !hasSaved) {
        const results = calculateAssessmentResults(questions, answers);
        const timeTaken = Math.round((Date.now() - startTime) / 1000);
        
        try {
          await fetch("/api/assessment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              type: "pre",
              score: results.score,
              totalQuestions: results.total,
              answers,
              timeTakenSeconds: timeTaken,
            }),
          });
          setHasSaved(true);
        } catch (error) {
          console.error("Failed to save assessment:", error);
        }
      }
    }
    saveResults();
  }, [showResults, email, hasSaved, questions, answers, startTime]);

  if (showResults) {
    const results = calculateAssessmentResults(questions, answers);

    // Find weak areas (categories where they got less than 50% correct)
    const weakAreas: string[] = [];
    const categoryNames: Record<string, string> = {
      stride: "STRIDE Threat Modeling",
      risk: "Risk Assessment",
      sbom: "SBOM & Vulnerability Management",
      compliance: "Compliance & Regulations",
    };

    Object.entries(results.categoryScores).forEach(([category, scores]) => {
      if (scores.total > 0 && scores.correct / scores.total < 0.5) {
        weakAreas.push(category);
      }
    });

    return (
      <div className="max-w-xl mx-auto space-y-6">
        <Card className="glass-card text-center p-8">
          <div className="text-6xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Assessment Complete!</h2>
          <p className="text-muted-foreground mb-6">
            Your pre-assessment score has been recorded. This will be used to measure your progress after completing the training.
          </p>
          
          <div className="text-5xl font-bold text-teal-400 mb-2">
            {results.score}/{results.total}
          </div>
          <p className="text-muted-foreground mb-6">{results.percentage}% correct</p>

          {/* Category breakdown - just scores, no answers */}
          <div className="grid grid-cols-2 gap-3 mb-6 text-left">
            <div className={`p-3 rounded-lg ${results.categoryScores.stride.correct / results.categoryScores.stride.total < 0.5 ? "bg-orange-500/10 border border-orange-500/30" : "bg-muted/30"}`}>
              <p className="text-xs text-muted-foreground">STRIDE</p>
              <p className="font-semibold text-foreground">
                {results.categoryScores.stride.correct}/{results.categoryScores.stride.total}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${results.categoryScores.risk.correct / results.categoryScores.risk.total < 0.5 ? "bg-orange-500/10 border border-orange-500/30" : "bg-muted/30"}`}>
              <p className="text-xs text-muted-foreground">Risk Assessment</p>
              <p className="font-semibold text-foreground">
                {results.categoryScores.risk.correct}/{results.categoryScores.risk.total}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${results.categoryScores.sbom.correct / results.categoryScores.sbom.total < 0.5 ? "bg-orange-500/10 border border-orange-500/30" : "bg-muted/30"}`}>
              <p className="text-xs text-muted-foreground">SBOM/CVE</p>
              <p className="font-semibold text-foreground">
                {results.categoryScores.sbom.correct}/{results.categoryScores.sbom.total}
              </p>
            </div>
            <div className={`p-3 rounded-lg ${results.categoryScores.compliance.correct / results.categoryScores.compliance.total < 0.5 ? "bg-orange-500/10 border border-orange-500/30" : "bg-muted/30"}`}>
              <p className="text-xs text-muted-foreground">Compliance</p>
              <p className="font-semibold text-foreground">
                {results.categoryScores.compliance.correct}/{results.categoryScores.compliance.total}
              </p>
            </div>
          </div>

          {/* Areas for improvement */}
          {weakAreas.length > 0 && (
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30 mb-6 text-left">
              <p className="text-sm font-semibold text-orange-400 mb-2">📚 Areas to Focus On</p>
              <p className="text-sm text-muted-foreground mb-2">
                Based on your results, pay extra attention to these topics during your training:
              </p>
              <ul className="text-sm text-foreground space-y-1">
                {weakAreas.map((area) => (
                  <li key={area} className="flex items-center gap-2">
                    <span className="text-orange-400">•</span>
                    {categoryNames[area]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-6">
            After completing the training modules, you&apos;ll take a post-assessment to see how much you&apos;ve learned. The correct answers will be revealed then!
          </p>

          <div className="space-y-3">
            <Button 
              onClick={() => router.push("/modules")}
              className="w-full bg-teal-500 hover:bg-teal-600 text-black font-semibold"
            >
              Start Learning
            </Button>
            <Button 
              variant="outline"
              onClick={() => router.push("/dashboard")}
              className="w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-foreground">Pre-Training Assessment</h1>
        <p className="text-sm text-muted-foreground">Let&apos;s see what you already know!</p>
      </div>

      {/* Progress */}
      <div>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question card */}
      <Card className="glass-card">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`w-full p-4 rounded-lg text-left transition-all ${
                  answers[currentQuestion.id] === option.id
                    ? "bg-teal-500/20 border-2 border-teal-500 text-foreground"
                    : "bg-muted/30 border-2 border-transparent hover:border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                <span className="font-medium">{option.id.toUpperCase()}.</span> {option.text}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion.id]}
          className="bg-teal-500 hover:bg-teal-600 text-black font-semibold"
        >
          {currentIndex === questions.length - 1 ? "Finish" : "Next"}
        </Button>
      </div>
    </div>
  );
}
