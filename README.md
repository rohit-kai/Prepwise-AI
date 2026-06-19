# PrepWise AI – Smart Study Planner

An AI-powered full-stack study planner built with Next.js, Supabase, and Groq API. Students enter a subject, topics, and exam date to get a personalized study schedule.

## Tech Stack

- **Frontend:** Next.js (App Router) + Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **AI:** Groq API (Llama 3.3 70B)
- **Deployment:** Vercel

## Features

- Generate AI-powered study plans with day-wise schedules
- Save plans to a Supabase database
- View and manage saved plans
- Clean, responsive UI

## Project Structure

```
prepwise-lite/
├── app/
│   ├── page.tsx              # Home page (study form)
│   ├── layout.tsx            # Root layout with navbar
│   ├── plans/
│   │   └── page.tsx          # Saved plans page
│   └── api/
│       ├── generate/
│       │   └── route.ts      # AI plan generation endpoint
│       └── plans/
│           └── route.ts      # CRUD operations for plans
├── components/
│   ├── StudyForm.tsx         # Main study form component
│   ├── PlanCard.tsx          # Plan display card
│   └── Navbar.tsx            # Navigation bar
├── lib/
│   ├── supabase.ts           # Supabase client
│   └── grok.ts               # Groq AI client
└── supabase-schema.sql       # Database schema
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account (free tier)
- A Groq API key (free)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/prepwise-ai.git
   cd prepwise-ai/prepwise-lite
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file with your credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GROQ_API_KEY=your_groq_api_key
   ```

4. Run the database setup SQL from `supabase-schema.sql` in your Supabase SQL Editor.

5. Start the dev server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy on [Vercel](https://vercel.com):

1. Push this repo to GitHub
2. Import the project into Vercel
3. Set root directory to `prepwise-lite`
4. Add the same environment variables from `.env.local` in Vercel's dashboard
5. Deploy!