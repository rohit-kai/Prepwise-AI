'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface SavedPlan {
  id: string
  subject: string
  topics: string[]
  exam_date: string
  schedule: any
  created_at: string
}

export default function SavedPlans() {
  const [plans, setPlans] = useState<SavedPlan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const { data, error } = await supabase
        .from('study_plans')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPlans(data || [])
    } catch (error) {
      console.error('Error fetching plans:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletePlan = async (id: string) => {
    if (!confirm('Are you sure you want to delete this plan?')) return
    
    try {
      const { error } = await supabase
        .from('study_plans')
        .delete()
        .eq('id', id)

      if (error) throw error
      setPlans(plans.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting plan:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center">
        <div className="text-xl text-gray-600">Loading saved plans...</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Saved Study Plans
        </h1>
        
        {plans.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow">
            <p className="text-gray-600 text-lg">No saved plans yet.</p>
            <p className="text-gray-500">Create your first study plan from the home page!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {plans.map((plan) => (
              <div key={plan.id} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{plan.subject}</h3>
                    <p className="text-gray-600">
                      <span className="font-semibold">Topics:</span> {plan.topics.join(', ')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                      📅 {plan.exam_date}
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(plan.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Study Schedule:</h4>
                  <div className="space-y-2">
                    {plan.schedule.map((item: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                        <span className="font-medium">Day {item.day}</span>
                        <span>{item.topic}</span>
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                          {item.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="mt-4 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  🗑️ Delete Plan
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}