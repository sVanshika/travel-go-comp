"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChatBubbleIcon } from "@/components/chat-bubble-icon"
import { MapPin, Calendar, DollarSign, Utensils, Ticket, Info, Map, ArrowLeft, Heart } from "lucide-react"
import Link from "next/link"

// Mock destinations data (same as in explore page)
const DESTINATIONS = [
  {
    id: 1,
    name: "Goa",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/goa.jpg",
    images: [
      "/images/destinations/goa-1.jpg",
      "/images/destinations/goa-2.jpg",
      "/images/destinations/goa-3.jpg",
      "/images/destinations/goa-4.jpg",
    ],
    budget: "budget-friendly",
    activityTypes: ["beach", "relaxation", "nightlife"],
    bestTimeToVisit: ["october", "november", "december", "january", "february", "march"],
    description: "Famous for its beaches, nightlife, and Portuguese heritage.",
    overview:
      "Goa is a state on the southwestern coast of India within the region known as the Konkan. It is bounded by the state of Maharashtra to the north and by Karnataka to the east and south, with the Arabian Sea forming its western coast. Goa is India's smallest state by area and the fourth-smallest by population. Goa has the highest GDP per capita among all Indian states, two and a half times that of the country. The Eleventh Finance Commission of India named Goa the best-placed state because of its infrastructure, and India's National Commission on Population rated it as having the best quality of life in India.",
    attractions: [
      { name: "Calangute Beach", description: "One of the most popular beaches in Goa." },
      {
        name: "Basilica of Bom Jesus",
        description: "UNESCO World Heritage Site and one of the most famous churches in Goa.",
      },
      { name: "Fort Aguada", description: "A well-preserved 17th-century Portuguese fort." },
      {
        name: "Dudhsagar Falls",
        description: "One of India's tallest waterfalls, located in the Bhagwan Mahavir Wildlife Sanctuary.",
      },
      { name: "Anjuna Flea Market", description: "Famous market selling everything from clothes to spices." },
    ],
    cuisine: [
      { name: "Fish Curry Rice", description: "The staple food of Goa, a spicy curry with local fish and rice." },
      { name: "Vindaloo", description: "A spicy curry dish of Portuguese influence." },
      { name: "Bebinca", description: "A traditional Goan dessert with multiple layers." },
      { name: "Feni", description: "A traditional spirit distilled from cashew fruit or coconut palm." },
    ],
    events: [
      { name: "Goa Carnival", month: "February", description: "A colorful celebration before Lent." },
      { name: "Shigmo Festival", month: "March", description: "A spring festival celebrating the arrival of spring." },
      {
        name: "Sunburn Festival",
        month: "December",
        description: "One of Asia's biggest electronic dance music festivals.",
      },
    ],
    costBreakdown: {
      accommodation: {
        budget: "₹1,000 - ₹2,500 per night",
        mid: "₹2,500 - ₹7,000 per night",
        luxury: "₹7,000+ per night",
      },
      food: {
        budget: "₹300 - ₹600 per day",
        mid: "₹600 - ₹1,500 per day",
        luxury: "₹1,500+ per day",
      },
      transportation: {
        budget: "₹200 - ₹500 per day",
        mid: "₹500 - ₹1,200 per day",
        luxury: "₹1,200+ per day",
      },
      activities: {
        budget: "₹500 - ₹1,000 per day",
        mid: "₹1,000 - ₹3,000 per day",
        luxury: "₹3,000+ per day",
      },
    },
    nearbyPlaces: [
      { name: "Hampi", distance: "300 km", description: "UNESCO World Heritage Site with ancient ruins." },
      { name: "Mumbai", distance: "590 km", description: "India's financial capital and home to Bollywood." },
      { name: "Pune", distance: "450 km", description: "Cultural capital of Maharashtra with historical sites." },
    ],
  },
  // More destinations would be here in a real app
]

export default function DestinationDetailPage({ params }) {
  const destinationId = Number.parseInt(params.id)
  const destination = DESTINATIONS.find((d) => d.id === destinationId) || DESTINATIONS[0]

  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1">
        {/* Hero Header */}
        <div
          className="destination-header"
          style={{ backgroundImage: `url(${destination.images[activeImageIndex] || destination.image})` }}
        >
          <div className="destination-header-overlay"></div>
          <div className="destination-header-content">
            <Button
              asChild
              variant="outline"
              className="mb-4 text-white border-white/30 bg-black/20 hover:bg-black/30 hover:text-white w-fit"
            >
              <Link href="/explore" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Destinations
              </Link>
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">{destination.name}</h1>
                <p className="text-white/80">
                  {destination.country}, {destination.continent}
                </p>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/20 border-white/30 text-white hover:bg-black/30 hover:text-white"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
              </Button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 py-8">
          {/* Image Gallery */}
          <div className="mb-8 grid gap-4 grid-cols-4">
            {destination.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-video cursor-pointer overflow-hidden rounded-lg ${activeImageIndex === index ? "ring-2 ring-primary" : ""}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${destination.name} ${index + 1}`}
                  className="h-full w-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>

          {/* Quick Info Cards */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Calendar className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Best Time to Visit</h3>
                <p className="text-sm text-muted-foreground">
                  {destination.bestTimeToVisit
                    .map((month) => month.charAt(0).toUpperCase() + month.slice(1))
                    .join(", ")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <DollarSign className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Budget Category</h3>
                <p className="text-sm text-muted-foreground">
                  {destination.budget === "budget-friendly"
                    ? "Budget-Friendly"
                    : destination.budget === "moderate"
                      ? "Moderate"
                      : "Luxury"}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <MapPin className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Activities</h3>
                <p className="text-sm text-muted-foreground">
                  {destination.activityTypes
                    .map((activity) => activity.charAt(0).toUpperCase() + activity.slice(1))
                    .join(", ")}
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <Info className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-medium">Overview</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">{destination.description}</p>
              </CardContent>
            </Card>
          </div>

          {/* Destination Info */}
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    About {destination.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed">{destination.overview}</p>
                </CardContent>
              </Card>

              <Tabs defaultValue="attractions" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="attractions">Attractions</TabsTrigger>
                  <TabsTrigger value="cuisine">Cuisine</TabsTrigger>
                  <TabsTrigger value="events">Events & Festivals</TabsTrigger>
                </TabsList>

                <TabsContent value="attractions" className="mt-4 space-y-4">
                  {destination.attractions.map((attraction, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="aspect-video w-full sm:w-1/3">
                            <img
                              src={`/images/attractions/${destination.name.toLowerCase()}-${index + 1}.jpg`}
                              alt={attraction.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=200&width=300"
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="flex items-center gap-2 font-semibold">
                              <MapPin className="h-4 w-4 text-primary" />
                              {attraction.name}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">{attraction.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="cuisine" className="mt-4 space-y-4">
                  {destination.cuisine.map((item, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="aspect-video w-full sm:w-1/3">
                            <img
                              src={`/images/cuisine/${destination.name.toLowerCase()}-${index + 1}.jpg`}
                              alt={item.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=200&width=300"
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="flex items-center gap-2 font-semibold">
                              <Utensils className="h-4 w-4 text-primary" />
                              {item.name}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="events" className="mt-4 space-y-4">
                  {destination.events.map((event, index) => (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="flex flex-col sm:flex-row">
                          <div className="aspect-video w-full sm:w-1/3">
                            <img
                              src={`/images/events/${destination.name.toLowerCase()}-${index + 1}.jpg`}
                              alt={event.name}
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                e.target.src = "/placeholder.svg?height=200&width=300"
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="flex items-center gap-2 font-semibold">
                              <Ticket className="h-4 w-4 text-primary" />
                              {event.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">Month: {event.month}</p>
                            <p className="mt-1 text-sm">{event.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-primary" />
                    Nearby Places Worth Visiting
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {destination.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex items-start gap-3 rounded-lg border p-3">
                      <MapPin className="mt-0.5 h-4 w-4 text-primary" />
                      <div>
                        <h3 className="font-medium">{place.name}</h3>
                        <p className="text-xs text-muted-foreground">Distance: {place.distance}</p>
                        <p className="mt-1 text-sm">{place.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Cost Breakdown
                  </CardTitle>
                  <CardDescription>Estimated daily expenses</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-medium">Accommodation</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Budget</p>
                        <p className="text-xs text-muted-foreground">
                          {destination.costBreakdown.accommodation.budget}
                        </p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Mid-range</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.accommodation.mid}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Luxury</p>
                        <p className="text-xs text-muted-foreground">
                          {destination.costBreakdown.accommodation.luxury}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Food</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Budget</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.food.budget}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Mid-range</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.food.mid}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Luxury</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.food.luxury}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Transportation</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Budget</p>
                        <p className="text-xs text-muted-foreground">
                          {destination.costBreakdown.transportation.budget}
                        </p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Mid-range</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.transportation.mid}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Luxury</p>
                        <p className="text-xs text-muted-foreground">
                          {destination.costBreakdown.transportation.luxury}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Activities</h3>
                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Budget</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.activities.budget}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Mid-range</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.activities.mid}</p>
                      </div>
                      <div className="rounded-lg border p-2 text-center">
                        <p className="font-medium">Luxury</p>
                        <p className="text-xs text-muted-foreground">{destination.costBreakdown.activities.luxury}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Button asChild size="lg" className="gap-2 w-full">
                  <Link href={`/itinerary?destination=${destination.name}`}>
                    <MapPin className="h-4 w-4" />
                    Plan a Trip to {destination.name}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ChatBubbleIcon />
    </div>
  )
}
