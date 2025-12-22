import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  const { destination, currency } = await req.json()

  const { text } = await generateText({
    model: google("gemini-2.5-flash"),
    system: `You are MoonMiles AI, a knowledgeable travel advisor. Provide concise, helpful insights about travel destinations including weather, top attractions, local tips, best times to visit, and budget estimates. Keep responses informative but brief (2-3 paragraphs max).`,
    prompt: `Provide quick travel insights for ${destination}. Include:
- Current typical weather and best time to visit
- Top 3 must-see attractions
- Local tips and cultural notes
- Approximate daily budget in ${currency || "USD"}
- One insider tip most tourists don't know

Keep it concise and practical.`,
  })

  return Response.json({ insights: text })
}
