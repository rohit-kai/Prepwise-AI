import { groq } from "@/lib/grok";

export async function POST(req: Request) {
  const body = await req.json();

  const prompt = `
  Create a study plan.

  Subject:
  ${body.subject}

  Topics:
  ${body.topics}

  Exam Date:
  ${body.examDate}

  Give a day-wise schedule with specific topics to cover each day.
  `;

  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });

  return Response.json({
    plan: completion.choices[0].message.content,
  });
}