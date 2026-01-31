# TARA Training Platform

A gamified learning platform for product security professionals to master the TARA (Threat Analysis & Risk Assessment) platform through hands-on practice.

## Overview

TARA Training guides new product security professionals through the complete TARA workflow, from initial project setup through report generation. Users complete progressive learning modules with step-by-step tasks while working alongside the TARA platform in a side-by-side experience.

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

- **80/20 Split-Pane Interface**: TARA launcher on the left (80%), educational content sidebar on the right (20%)
- **Step-by-Step Instructions**: Numbered, detailed instructions for each task with specific UI guidance
- **"Why It Matters" Context**: Business context for every security concept
- **Tips & Best Practices**: Expert guidance throughout
- **Module Completion Flow**: Auto-navigation to next task with "Continue to next module" prompts

### Gamification

- **Security Shield**: Visual hexagonal progress indicator that builds as you complete modules (13 segments total)
- **Streak Tracking**: Stay motivated with daily learning streaks displayed on the dashboard

### Knowledge Assessment

- **Pre-Assessment**: Benchmark your knowledge before starting
- **Post-Assessment**: Measure improvement after completing the curriculum
- **Category Breakdown**: See progress across STRIDE, Risk, SBOM, and Compliance topics
- **Before/After Comparison**: Visualize your growth

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **State**: React Query + nuqs for URL state
- **Icons**: Lucide React
- **Theme**: Dark mode with glassmorphism effects

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

---

## User Guide

### Getting Started as a User

1. **Sign In**: Enter your email address on the welcome screen. No password required - your email is used to track your progress across sessions.

2. **Dashboard**: After signing in, you'll see your personal dashboard with:
   - Learning progress overview
   - Current streak
   - Quick access to continue where you left off

### Navigating the Platform

#### Dashboard (`/dashboard`)

Your home base showing:

- Overall progress percentage
- Modules completed vs. total
- Tasks completed
- Current learning streak

#### Modules (`/modules`)

The main learning hub:

- **Overall Progress**: Visual ring showing completion percentage
- **Recent Activity**: Your last completed tasks with timestamps
- **Module Cards**: All 13 modules with status indicators:
  - 🔒 **Locked**: Complete prerequisite modules first
  - **Available**: Ready to start
  - **In Progress**: Currently working on
  - ✓ **Completed**: All tasks done

#### Taking a Module

1. Click on an available or in-progress module
2. View the module overview with all tasks listed
3. Click "Start" on the first incomplete task

#### Completing Tasks

Each task has an 80/20 split layout:

**Left Side (80%)** - TARA Launcher:

- Click "Launch TARA" to open the TARA platform in a new browser tab
- Arrange your windows side-by-side for the best experience
- Complete the task in TARA following the instructions

**Right Side (20%)** - Instructions Sidebar:

- **Task**: Current task name with progress (e.g., "1/4")
- **Instructions**: Step-by-step numbered guide
- **Why This Matters**: Context for the task
- **Tips**: Pro tips and best practices
- **Mark Complete**: Click when you've finished the task

#### Workflow Tips

- After completing a task, the app auto-navigates to the next task after 1.5 seconds
- When you finish all tasks in a module, a "Continue to next module" banner appears
- Your progress is saved automatically - you can close the browser and resume later
- Use the "← Back to [Module Name]" link to return to the module overview

### Assessments (`/assessment`)

#### Pre-Assessment

- Take before starting the curriculum to benchmark your knowledge
- Multiple choice questions covering all TARA topics
- Results are saved for comparison with post-assessment

#### Post-Assessment

- Take after completing all modules
- Same format as pre-assessment
- Compare scores to see your improvement
- Review which areas improved most

### Settings (`/settings`)

- View and update your email
- Log out (clears your local session)

---

## Project Structure

```
tara-training/
├── src/
│   ├── app/                      # Next.js App Router pages
│   │   ├── (dashboard)/          # Protected dashboard routes
│   │   │   ├── dashboard/        # Main dashboard
│   │   │   ├── modules/          # Module list and task pages
│   │   │   ├── assessment/       # Pre/post assessments
│   │   │   └── settings/         # User settings
│   │   └── api/                  # API routes
│   │       └── progress/         # Progress tracking API
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── dashboard/            # Dashboard components (nav, welcome)
│   │   ├── quest-board/          # Module cards, security shield
│   │   ├── lesson/               # Lesson layout, sidebar, TARA launcher
│   │   ├── email-entry/          # Email form, user context
│   │   └── gamification/         # Badges, XP display
│   ├── content/
│   │   ├── modules/              # Curriculum content (modules + tasks)
│   │   └── assessment/           # Assessment questions
│   ├── hooks/                    # Custom React hooks (useProgress)
│   ├── lib/                      # Utilities and clients
│   │   ├── supabase/             # Supabase client
│   │   ├── progress.ts           # Progress API helpers
│   │   └── utils.ts              # Utility functions
│   └── types/                    # TypeScript types
├── supabase/
│   └── schema.sql                # Database schema + seed data
└── public/
    └── *.png                     # Logo and favicon assets
```

## Database Schema

The platform uses a simple email-based identification system (no authentication required):

| Table                | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `users`              | Email-keyed user records with last active timestamp          |
| `user_progress`      | Module status tracking (not_started, in_progress, completed) |
| `task_completions`   | Individual task completion records                           |
| `assessment_results` | Pre/post assessment scores and answers                       |
| `user_gamification`  | Streak tracking and last activity date                       |

Note: Module and task content is managed in `src/content/modules/index.ts` as TypeScript data, not in the database.

## Design System

The platform follows a dark color palette with teal accents:

- **Background**: Dark slate with subtle gradients
- **Primary**: Teal (#14b8a6) for interactive elements
- **Accent**: Cyan for secondary highlights
- **Glass Effects**: `backdrop-blur` with subtle borders (`.glass-card` class)
- **Text**: High contrast with muted-foreground for secondary text

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

# Format code
npx prettier --write .
```

## Deployment

The app can be deployed to Vercel with zero configuration:

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_TARA_URL`
4. Deploy

## Known Limitations

- **TARA opens in new tab**: Due to security headers on the TARA platform, it cannot be embedded in an iframe. Users launch TARA in a separate browser tab and work side-by-side.
- **Manual task verification**: Tasks require manual "Mark Complete" clicks. Automatic verification would require TARA platform integration.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## License

MIT License - see LICENSE file for details.
