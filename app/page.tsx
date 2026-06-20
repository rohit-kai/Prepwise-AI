'use client'

import { useState } from 'react'
import StudyForm from '@/components/StudyForm'
import PlanCard from '@/components/PlanCard'

interface Plan {
  subject: string
  topics: string[]
  examDate: string
  schedule: Array<{ day: number; topic: string; duration: string }>
}

export default function Home() {
  const [generatedPlan, setGeneratedPlan] = useState<Plan | null>(null)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            PrepWise AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your AI-powered study assistant. Enter your subject, topics, and exam
            date to get a personalized study schedule.
          </p>
        </div>

        <StudyForm onPlanGenerated={setGeneratedPlan} />
        
        {generatedPlan && (
          <div className="mt-8 max-w-3xl mx-auto">
            <PlanCard plan={generatedPlan} />
          </div>
        )}
      </div>
    </main>
  )
}