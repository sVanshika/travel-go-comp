import { NextResponse } from "next/server"

// This is a mock API endpoint for generating itineraries
// In a real application, this would connect to an AI service

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { destination, startDate, endDate, budget } = body

    // Validate required fields
    if (!destination || !startDate || !endDate || !budget) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate number of days
    const start = new Date(startDate)
    const end = new Date(endDate)
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1

    // In a real app, this would call an AI service to generate the itinerary
    // For now, we'll return a mock response

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate a mock itinerary
    const itinerary = {
      id: Math.floor(Math.random() * 1000),
      destination,
      startDate,
      endDate,
      budget,
      days: Array.from({ length: days }, (_, i) => ({
        day: i + 1,
        date: new Date(start.getTime() + i * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        activities: [
          {
            time: "9:00 AM",
            title: "Breakfast at local cafe",
            description: "Start your day with a delicious breakfast.",
            type: "food",
          },
          {
            time: "11:00 AM",
            title: `Visit ${destination} landmark`,
            description: "Explore the famous attractions.",
            type: "activity",
          },
          {
            time: "2:00 PM",
            title: "Lunch at recommended restaurant",
            description: "Enjoy local cuisine.",
            type: "food",
          },
          {
            time: "4:00 PM",
            title: "Leisure activity",
            description: "Relax and enjoy the local atmosphere.",
            type: "activity",
          },
          {
            time: "8:00 PM",
            title: "Dinner at popular spot",
            description: "Experience the nightlife and cuisine.",
            type: "food",
          },
        ],
        hotel: {
          name: `${destination} Luxury Hotel`,
          area: "City Center",
          description: "Comfortable accommodation with great amenities.",
        },
      })),
    }

    return NextResponse.json({ itinerary })
  } catch (error) {
    console.error("Error generating itinerary:", error)
    return NextResponse.json({ error: "Failed to generate itinerary" }, { status: 500 })
  }
}
