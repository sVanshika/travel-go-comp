import { NextResponse } from "next/server"

// This is a mock API endpoint for generating packing suggestions
// In a real application, this would connect to an AI service

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json()
    const { destination, startDate, endDate } = body

    // Validate required fields
    if (!destination || !startDate || !endDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Generate mock packing suggestions based on destination
    // In a real app, this would use AI to generate personalized suggestions
    const suggestions = generatePackingSuggestions(destination)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error("Error generating packing suggestions:", error)
    return NextResponse.json({ error: "Failed to generate packing suggestions" }, { status: 500 })
  }
}

function generatePackingSuggestions(destination) {
  // Base items that everyone should pack
  const baseItems = [
    { id: 1, name: "Passport", category: "Documents" },
    { id: 2, name: "ID Card", category: "Documents" },
    { id: 3, name: "Travel Insurance", category: "Documents" },
    { id: 4, name: "Credit/Debit Cards", category: "Documents" },
    { id: 5, name: "Phone Charger", category: "Electronics" },
    { id: 6, name: "Power Bank", category: "Electronics" },
    { id: 7, name: "Camera", category: "Electronics" },
    { id: 8, name: "Toothbrush", category: "Toiletries" },
    { id: 9, name: "Toothpaste", category: "Toiletries" },
    { id: 10, name: "Shampoo", category: "Toiletries" },
    { id: 11, name: "Soap/Body Wash", category: "Toiletries" },
    { id: 12, name: "First Aid Kit", category: "Health" },
    { id: 13, name: "Prescription Medications", category: "Health" },
  ]

  // Destination-specific items
  let specificItems = []

  // Convert destination to lowercase for case-insensitive comparison
  const lowerDestination = destination.toLowerCase()

  if (lowerDestination.includes("beach") || lowerDestination.includes("goa")) {
    specificItems = [
      { id: 101, name: "Swimwear", category: "Clothing" },
      { id: 102, name: "Beach Towel", category: "Accessories" },
      { id: 103, name: "Sunscreen (SPF 50+)", category: "Toiletries" },
      { id: 104, name: "Sunglasses", category: "Accessories" },
      { id: 105, name: "Flip Flops", category: "Footwear" },
      { id: 106, name: "Hat", category: "Accessories" },
      { id: 107, name: "Light Cover-up", category: "Clothing" },
      { id: 108, name: "Aloe Vera Gel", category: "Toiletries" },
    ]
  } else if (
    lowerDestination.includes("mountain") ||
    lowerDestination.includes("hill") ||
    lowerDestination.includes("manali") ||
    lowerDestination.includes("shimla")
  ) {
    specificItems = [
      { id: 201, name: "Warm Jacket", category: "Clothing" },
      { id: 202, name: "Thermal Underwear", category: "Clothing" },
      { id: 203, name: "Hiking Boots", category: "Footwear" },
      { id: 204, name: "Woolen Socks", category: "Clothing" },
      { id: 205, name: "Gloves", category: "Accessories" },
      { id: 206, name: "Scarf", category: "Accessories" },
      { id: 207, name: "Beanie/Warm Hat", category: "Accessories" },
      { id: 208, name: "Lip Balm", category: "Toiletries" },
      { id: 209, name: "Sunscreen", category: "Toiletries" },
      { id: 210, name: "Trekking Poles", category: "Equipment" },
    ]
  } else if (
    lowerDestination.includes("city") ||
    lowerDestination.includes("delhi") ||
    lowerDestination.includes("mumbai") ||
    lowerDestination.includes("bangalore")
  ) {
    specificItems = [
      { id: 301, name: "Comfortable Walking Shoes", category: "Footwear" },
      { id: 302, name: "Day Bag/Backpack", category: "Accessories" },
      { id: 303, name: "City Map/Guidebook", category: "Accessories" },
      { id: 304, name: "Umbrella", category: "Accessories" },
      { id: 305, name: "Light Jacket", category: "Clothing" },
      { id: 306, name: "Portable Wi-Fi/SIM Card", category: "Electronics" },
      { id: 307, name: "Hand Sanitizer", category: "Health" },
      { id: 308, name: "Face Mask", category: "Health" },
    ]
  } else {
    // Generic travel items for any other destination
    specificItems = [
      { id: 401, name: "T-shirts (5)", category: "Clothing" },
      { id: 402, name: "Pants/Shorts (3)", category: "Clothing" },
      { id: 403, name: "Underwear (7)", category: "Clothing" },
      { id: 404, name: "Socks (5 pairs)", category: "Clothing" },
      { id: 405, name: "Comfortable Shoes", category: "Footwear" },
      { id: 406, name: "Light Jacket", category: "Clothing" },
      { id: 407, name: "Sunscreen", category: "Toiletries" },
      { id: 408, name: "Insect Repellent", category: "Toiletries" },
    ]
  }

  // Combine and return all items
  return [...baseItems, ...specificItems]
}
