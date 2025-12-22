import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  const { messages } = await req.json()

  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: `You are MoonMiles AI, a helpful travel assistant. You help users plan trips, recommend destinations, suggest activities, provide travel tips, and answer any travel-related questions. Be friendly, knowledgeable, and enthusiastic about travel. Keep responses concise but informative.`,
      messages,
    })

    return Response.json({ response: text })
  } catch (error) {
    return Response.json({
      response:
        "I apologize, but I'm having trouble connecting to the AI service. Please ensure your GOOGLE_GENERATIVE_AI_API_KEY is set in your .env.local file.",
    })
  }
}
