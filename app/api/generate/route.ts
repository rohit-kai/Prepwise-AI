import { NextResponse } from 'next/server'
import { generateStudyPlan } from '@/lib/groq'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  try {
    const { subject, topics, examDate } = await request.json()
    
    // Generate AI study plan
    const schedule = await generateStudyPlan(subject, topics, examDate)
    
    const plan = {
      subject,
      topics: topics.split(',').map((t: string) => t.trim()),
      examDate,
      schedule
    }

    // Save to Supabase (optional - will work even without Supabase)
    try {
      const { data, error } = await supabase
        .from('study_plans')
        .insert([
          {
            subject: plan.subject,
            topics: plan.topics,
            exam_date: plan.examDate,
            schedule: plan.schedule,
          }
        ])
        .select()

      if (error) {
        console.error('Supabase save error:', error)
        // Continue anyway - the plan is still generated
      } else {
        console.log('Plan saved to database:', data)
      }
    } catch (error) {
      console.error('Error saving to Supabase:', error)
      // Continue - the plan is still generated
    }

    return NextResponse.json({ plan })
  } catch (error) {
    console.error('Error generating plan:', error)
    return NextResponse.json(
      { error: 'Failed to generate plan' },
      { status: 500 }
    )
  }
}