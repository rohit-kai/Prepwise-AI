import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for your database
export type StudyPlan = {
  id?: string
  subject: string
  topics: string[]
  exam_date: string
  schedule: any
  created_at?: string
  user_id?: string
}