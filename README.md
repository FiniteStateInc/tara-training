# TARA Training Platform

A gamified learning platform for product security professionals to master the TARA (Threat Analysis & Risk Assessment) platform through hands-on practice.

## Overview

TARA Training guides new product security professionals through the complete TARA workflow, from initial project setup through report generation. Users complete "quests" (learning modules) with step-by-step tasks while interacting with the embedded TARA platform.

## Features

### Learning Experience

- **13 Progressive Modules** covering the complete TARA workflow:
  1. Initial Onboarding
  2. Project Setup
  3. Document Management
  4. Architecture Modeling
  5. Asset Identification
  6. Threat Generation
  7. Attack Path Analysis
  8. Risk Assessment
  9. Mitigation Planning
  10. Requirements Generation
  11. SBOM & Vulnerabilities
  12. Compliance & Verification
  13. Report Generation

- **70/30 Split-Pane Interface**: TARA iframe on the left (70%), educational content on the right (30%)
- **Step-by-Step Instructions**: Clear, approachable explanations for each task
- **"Why It Matters" Context**: Business context for every security concept
- **Tips & Best Practices**: Expert guidance throughout

### Gamification

- **Security Shield**: Visual progress indicator that builds as you complete modules
- **XP System**: Earn experience points for completing tasks
- **Streak Tracking**: Stay motivated with daily learning streaks
- **Badges**: Unlock achievements for milestones

### Knowledge Assessment

- **Pre-Assessment**: Benchmark your knowledge before starting
- **Post-Assessment**: Measure improvement after completing the curriculum
- **Category Breakdown**: See progress across STRIDE, Risk, SBOM, and Compliance topics
- **Before/After Comparison**: Visualize your growth

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **State**: React Query + nuqs for URL state
- **Theme**: Dark mode with glassmorphism

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- A Supabase account (free tier works)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd tara-training
```

2. Install dependencies:

```bash
npm install
```

3. Create a Supabase project at [supabase.com](https://supabase.com)

4. Copy the environment template and add your Supabase credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_TARA_URL=https://finite-state-tara-ai.vercel.app
```

5. Set up the database by running the SQL in `supabase/schema.sql` in your Supabase SQL Editor

6. Start the development server:

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
tara-training/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (dashboard)/          # Protected dashboard routes
│   │   │   ├── dashboard/        # Main dashboard
│   │   │   ├── quests/          # Quest board and modules
│   │   │   ├── assessment/      # Knowledge assessments
│   │   │   ├── progress/        # Progress overview
│   │   │   └── settings/        # User settings
│   │   └── api/                 # API routes
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   ├── dashboard/           # Dashboard components
│   │   ├── quest-board/         # Quest board components
│   │   ├── lesson/              # Lesson view components
│   │   ├── email-entry/         # Email identification
│   │   └── gamification/        # XP, badges, shield
│   ├── content/
│   │   ├── modules/             # Curriculum content
│   │   └── assessment/          # Assessment questions
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Utilities and clients
│   └── types/                   # TypeScript types
├── supabase/
│   └── schema.sql               # Database schema
└── public/
    └── images/                  # Static assets
```

## Database Schema

The platform uses a simple email-based identification system (no authentication required):

- **users**: Email-keyed user records
- **modules**: Curriculum module definitions
- **tasks**: Individual task content
- **user_progress**: Module completion tracking
- **task_completions**: Task completion records
- **assessment_results**: Pre/post assessment scores
- **user_gamification**: XP, streaks, badges, shield segments
- **badges**: Badge catalog

## Design System

The platform follows TARA's dark color palette:

- **Background**: Deep slate (#0f172a, #1e293b)
- **Primary**: TARA green (#10b981)
- **Accent**: TARA orange (#f97316)
- **Glass Effects**: `backdrop-blur` with subtle borders

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npx tsc --noEmit
```

## Deployment

The app can be deployed to Vercel with zero configuration:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details.
