// User types
export interface User {
  email: string;
  display_name?: string;
  current_module_id?: string;
  current_task_id?: string;
  last_active_at?: string;
  created_at: string;
  updated_at: string;
}

// Module types
export interface Module {
  id: string;
  title: string;
  description: string;
  order_index: number;
  task_count: number;
  shield_segment: string;
  prerequisites: string[];
}

// Task types
export interface Task {
  id: string;
  module_id: string;
  title: string;
  instructions: string;
  why_it_matters?: string;
  tips: string[];
  tara_deep_link?: string;
  order_index: number;
  verification_type: "api_check" | "state_check" | "manual";
  verification_config?: Record<string, unknown>;
}

// Progress types
export interface UserProgress {
  id: string;
  user_email: string;
  module_id: string;
  status: "not_started" | "in_progress" | "completed";
  started_at?: string;
  completed_at?: string;
  time_spent_seconds: number;
}

export interface TaskCompletion {
  id: string;
  user_email: string;
  task_id: string;
  completed_at: string;
  verification_method: string;
}

// Assessment types
export interface AssessmentResult {
  id: string;
  user_email: string;
  assessment_type: "pre" | "post" | "skipped";
  score: number;
  total_questions: number;
  answers: Record<string, string>;
  time_taken_seconds: number;
  created_at: string;
}

// Gamification types
export interface UserGamification {
  user_email: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  shield_segments_unlocked: string[];
  badges_earned: string[];
  created_at: string;
  updated_at: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon_url?: string;
  criteria: {
    type: string;
    value: number;
  };
}

// Module status for UI
export type ModuleStatus = "locked" | "available" | "in_progress" | "completed";

// Assessment question types
export interface AssessmentQuestion {
  id: string;
  question: string;
  topic: string;
  options: { id: string; text: string }[];
  correct_answer: string;
  category: "stride" | "risk" | "sbom" | "compliance";
  explanation?: string;
}
