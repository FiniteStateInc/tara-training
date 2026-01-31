"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  getAssessmentQuestions,
  calculateAssessmentResults,
} from "@/content/assessment/questions";
import { useUser } from "@/components/email-entry/user-context";
import {
  BookOpen,
  Check,
  Lightbulb,
  PartyPopper,
  TrendingUp,
  X,
} from "lucide-react";

// Map categories to relevant modules for follow-up learning
const categoryToModules: Record<string, { name: string; moduleId: string }[]> = {
  stride: [
    { name: "Threat Generation", moduleId: "threat-generation" },
    { name: "Attack Path Analysis", moduleId: "attack-path-analysis" },
  ],
  risk: [
    { name: "Risk Assessment", moduleId: "risk-assessment" },
    { name: "Mitigation Planning", moduleId: "mitigation-planning" },
  ],
  sbom: [
    { name: "SBOM & Vulnerabilities", moduleId: "sbom-vulnerability" },
  ],
  compliance: [
    { name: "Compliance & Verification", moduleId: "compliance-verification" },
    { name: "Report Generation", moduleId: "report-generation" },
  ],
};

interface PreAssessmentResult {
  score: number;
  total_questions: number;
  answers: Record<string, string>;
}

export default function PostAssessmentPage() {
  const router = useRouter();
  const { email } = useUser();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [preAssessment, setPreAssessment] = useState<PreAssessmentResult | null>(null);
  const [startTime] = useState(Date.now());

  // Get questions once and memoize
  const questions = useMemo(() => getAssessmentQuestions(12), []);

  // Fetch pre-assessment for comparison
  useEffect(() => {
    async function fetchPreAssessment() {
      if (!email) return;
      try {
        const response = await fetch(`/api/assessment?email=${encodeURIComponent(email)}`);
        if (response.ok) {
          const data = await response.json();
          if (data.pre) {
            setPreAssessment(data.pre);
          }
        }
      } catch (error) {
        console.error("Failed to fetch pre-assessment:", error);
      }
    }
    fetchPreAssessment();
  }, [email]);

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
              type: "post",
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

  if (showResults) {
    const results = calculateAssessmentResults(questions, answers);
    
    // Use actual pre-assessment score for comparison
    const preScore = preAssessment?.score ?? 0;
    const preTotalQuestions = preAssessment?.total_questions ?? 12;
    const prePercentage = preTotalQuestions > 0 ? Math.round((preScore / preTotalQuestions) * 100) : 0;
    const improvement = results.percentage - prePercentage;

    // Find weak areas (categories where they got less than 50% correct)
    const weakAreas: string[] = [];
    Object.entries(results.categoryScores).forEach(([category, scores]) => {
      if (scores.total > 0 && scores.correct / scores.total < 0.5) {
        weakAreas.push(category);
      }
    });

    // Get recommended modules for follow-up
    const recommendedModules = weakAreas.flatMap(area => categoryToModules[area] || []);

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="glass-card text-center p-8">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Congratulations!</h2>
          <p className="text-muted-foreground mb-6">
            You&apos;ve completed the TARA Training curriculum!
          </p>
          
          {/* Before/After comparison */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-xs text-muted-foreground mb-1">Before</p>
              <p className="text-3xl font-bold text-muted-foreground">{preScore}/{preTotalQuestions}</p>
              <p className="text-sm text-muted-foreground">{prePercentage}%</p>
            </div>
            <div className="p-4 rounded-lg bg-teal-500/10 border border-teal-500/30">
              <p className="text-xs text-teal-400 mb-1">After</p>
              <p className="text-3xl font-bold text-teal-400">{results.score}/{results.total}</p>
              <p className="text-sm text-teal-400">{results.percentage}%</p>
            </div>
          </div>

          {/* Improvement */}
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 mb-6">
            <p className="text-sm text-green-400">
              {improvement > 0 ? `+${improvement}%` : improvement === 0 ? "Same" : `${improvement}%`} improvement
            </p>
            <p className="text-2xl font-bold text-green-400 mt-1 flex items-center gap-2">
              {improvement > 20 ? (
                <PartyPopper className="h-6 w-6" />
              ) : improvement > 0 ? (
                <TrendingUp className="h-6 w-6" />
              ) : null}
              <span>
                {improvement > 20
                  ? "Amazing Progress!"
                  : improvement > 0
                    ? "Good Improvement!"
                    : "Keep Practicing!"}
              </span>
            </p>
          </div>

          {/* Category breakdown */}
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

          {/* Areas for improvement with recommended modules */}
          {weakAreas.length > 0 && (
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30 mb-6 text-left">
              <p className="text-sm font-semibold text-orange-400 mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Recommended Follow-Up
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                You may want to revisit these topics for additional practice:
              </p>
              <div className="space-y-2">
                {recommendedModules.map((mod) => (
                  <Link
                    key={mod.moduleId}
                    href={`/modules/${mod.moduleId}`}
                    className="flex items-center gap-2 p-2 rounded bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-orange-400">→</span>
                    <span className="text-foreground text-sm">{mod.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Button 
              onClick={() => router.push("/modules")}
              className="w-full bg-teal-500 hover:bg-teal-600 text-black font-semibold"
            >
              View Modules
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

        {/* Answer Review Section - ONLY shown after post-assessment */}
        <Card className="glass-card">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">Answer Review</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Compare your pre and post assessment answers:
            </p>
            
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const postAnswer = answers[q.id];
                const preAnswer = preAssessment?.answers?.[q.id];
                const postCorrect = postAnswer === q.correct_answer;
                const preCorrect = preAnswer === q.correct_answer;
                const improved = !preCorrect && postCorrect;
                const correctOption = q.options.find(o => o.id === q.correct_answer);
                
                return (
                  <div 
                    key={q.id} 
                    className={`p-4 rounded-lg border ${
                      improved 
                        ? "bg-gradient-to-r from-green-500/20 to-teal-500/20 border-green-500/50 animate-in fade-in" 
                        : "bg-muted/20 border-muted/30"
                    }`}
                  >
                    {/* Improvement badge */}
                    {improved && (
                      <div className="flex items-center gap-2 mb-3 text-green-400">
                        <PartyPopper className="h-5 w-5" />
                        <span className="text-sm font-semibold">You improved on this one!</span>
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
                            <span className={isCorrectAnswer ? "text-green-400" : "text-foreground"}>
                              <span className="font-medium">{option.id.toUpperCase()}.</span> {option.text}
                            </span>
                            <div className="flex items-center gap-2">
                              {wasPreAnswer && (
                                <span
                                  className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${
                                    preCorrect
                                      ? "bg-green-500/30 text-green-400"
                                      : "bg-red-500/30 text-red-400"
                                  }`}
                                >
                                  Pre{" "}
                                  {preCorrect ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                              {wasPostAnswer && (
                                <span
                                  className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 ${
                                    postCorrect
                                      ? "bg-green-500/30 text-green-400"
                                      : "bg-red-500/30 text-red-400"
                                  }`}
                                >
                                  Post{" "}
                                  {postCorrect ? (
                                    <Check className="h-3 w-3" />
                                  ) : (
                                    <X className="h-3 w-3" />
                                  )}
                                </span>
                              )}
                              {isCorrectAnswer && !wasPreAnswer && !wasPostAnswer && (
                                <span className="text-xs text-green-400 flex items-center gap-1">
                                  <Check className="h-3 w-3" />
                                  Correct
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {q.explanation && (
                      <p className="text-xs text-muted-foreground flex items-start gap-1">
                        <Lightbulb className="h-3.5 w-3.5 text-teal-400 mt-0.5" />
                        <span>{q.explanation}</span>
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold text-foreground">Post-Training Assessment</h1>
        <p className="text-sm text-muted-foreground">Let&apos;s see how much you&apos;ve learned!</p>
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
