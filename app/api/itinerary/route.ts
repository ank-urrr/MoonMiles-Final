import { generateText } from "ai"
import { google } from "@ai-sdk/google"

export async function POST(req: Request) {
  const { destination, duration, preferences, requirements } = await req.json()

  const preferencesText = preferences?.length > 0 ? preferences.join(", ") : "general sightseeing"

  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: `You are MoonMiles AI, an expert travel itinerary planner. Create detailed, day-by-day travel itineraries that are practical and engaging. Include specific times, activities, restaurant suggestions, and local tips. Format your response as a structured itinerary with clear day headings and time slots.`,
      prompt: `Create a detailed travel itinerary for:
- Destination: ${destination || "a surprise destination based on preferences"}
- Duration: ${duration || "3-5 days"}
- Preferences: ${preferencesText}
- Special requests: ${requirements || "None"}

Please provide a day-by-day itinerary with specific times, activities, meal suggestions, and insider tips. Make it practical and memorable.`,
    })

    return Response.json({ itinerary: text })
  } catch (error) {
    return Response.json({
      itinerary:
        "Unable to generate itinerary. Please ensure your GOOGLE_GENERATIVE_AI_API_KEY is set in your .env.local file.",
    })
  }
}
