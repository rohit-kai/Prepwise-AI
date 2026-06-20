interface Plan {
  subject: string
  topics: string[]
  examDate: string
  schedule: Array<{ day: number; topic: string; duration: string }>
}

interface PlanCardProps {
  plan: Plan
}

export default function PlanCard({ plan }: PlanCardProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">{plan.subject}</h3>
          <p className="text-gray-600 mt-1">
            <span className="font-semibold">Topics:</span> {plan.topics.join(', ')}
          </p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
          📅 {plan.examDate}
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
          <span className="text-xl mr-2">📚</span> Study Schedule
        </h4>
        <div className="space-y-2">
          {plan.schedule.map((item, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center hover:bg-gray-100 transition">
              <span className="font-medium text-gray-700">Day {item.day}</span>
              <span className="text-gray-800">{item.topic}</span>
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {item.duration}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <button 
          onClick={() => {
            // Save plan functionality - to be implemented with Supabase
            alert('Plan saved! (Supabase integration coming soon)')
          }}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          💾 Save Plan
        </button>
      </div>
    </div>
  )
}