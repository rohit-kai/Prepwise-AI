import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function generateStudyPlan(subject: string, topics: string, examDate: string) {
  try {
    const prompt = `
      Create a detailed study plan for the following:
      Subject: ${subject}
      Topics: ${topics}
      Exam Date: ${examDate}
      
      Please provide a day-by-day study schedule with:
      1. Daily topics to cover
      2. Time allocation for each day
      3. Revision and practice sessions
      
      Format the response as a JSON object with the following structure:
      {
        "schedule": [
          {"day": 1, "topic": "topic name", "duration": "X hours"},
          ...
        ]
      }
    `

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a study planner assistant. Return only valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      max_tokens: 1024,
    })

    const response = completion.choices[0]?.message?.content || '{}'
    const parsedResponse = JSON.parse(response)
    
    return parsedResponse.schedule || []
  } catch (error) {
    console.error('Groq API Error:', error)
    // Return a fallback schedule if AI fails
    return generateFallbackSchedule(topics)
  }
}

// Fallback schedule if AI fails
function generateFallbackSchedule(topics: string) {
  const topicList = topics.split(',').map(t => t.trim())
  return [
    { day: 1, topic: topicList[0] || 'Introduction', duration: '2 hours' },
    { day: 2, topic: topicList[1] || 'Core Concepts', duration: '2 hours' },
    { day: 3, topic: topicList[2] || 'Practice Problems', duration: '3 hours' },
    { day: 4, topic: 'Review and Revision', duration: '2 hours' },
    { day: 5, topic: 'Mock Test', duration: '3 hours' },
  ]
}