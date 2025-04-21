"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChatBubbleIcon } from "@/components/chat-bubble-icon"
import { Search, Filter, Calendar, DollarSign, Compass, MapPin, Grid, List } from "lucide-react"
import Link from "next/link"

// Mock destinations data
const DESTINATIONS = [
  {
    id: 1,
    name: "Goa",
    state: "Goa",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/goa.jpg",
    budget: "budget-friendly",
    activityTypes: ["beach", "relaxation", "nightlife"],
    bestTimeToVisit: ["october", "november", "december", "january", "february", "march"],
    description: "Famous for its beaches, nightlife, and Portuguese heritage.",
  },
  {
    id: 2,
    name: "Manali",
    state: "Himachal Pradesh",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/manali.jpg",
    budget: "budget-friendly",
    activityTypes: ["adventure", "nature", "mountains"],
    bestTimeToVisit: ["march", "april", "may", "june", "october", "november"],
    description: "A hill station nestled in the mountains of Himachal Pradesh.",
  },
  {
    id: 3,
    name: "Jaipur",
    state: "Rajasthan",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/jaipur.jpg",
    budget: "budget-friendly",
    activityTypes: ["cultural", "historical", "architecture"],
    bestTimeToVisit: ["october", "november", "december", "january", "february", "march"],
    description: "Known as the Pink City, famous for its stunning architecture and royal heritage.",
  },
  {
    id: 4,
    name: "Munnar",
    state: "Kerala",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/munnar.jpg",
    budget: "moderate",
    activityTypes: ["nature", "relaxation", "cultural"],
    bestTimeToVisit: ["september", "october", "november", "december", "january", "february", "march"],
    description: "Beautiful hill station with tea plantations and misty mountains.",
  },
  {
    id: 5,
    name: "Andaman Islands",
    state: "Andaman and Nicobar Islands",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/andaman.jpg",
    budget: "luxury",
    activityTypes: ["beach", "adventure", "nature"],
    bestTimeToVisit: ["november", "december", "january", "february", "march", "april", "may"],
    description: "Pristine beaches, crystal clear waters, and rich marine life.",
  },
  {
    id: 6,
    name: "Darjeeling",
    state: "West Bengal",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/darjeeling.jpg",
    budget: "moderate",
    activityTypes: ["nature", "relaxation", "cultural"],
    bestTimeToVisit: ["march", "april", "may", "september", "october", "november"],
    description:
      "Famous for its tea plantations, stunning views of the Himalayas, and the Darjeeling Himalayan Railway.",
  },
  {
    id: 7,
    name: "Varanasi",
    state: "Uttar Pradesh",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/varanasi.jpg",
    budget: "budget-friendly",
    activityTypes: ["cultural", "spiritual", "historical"],
    bestTimeToVisit: ["october", "november", "december", "january", "february", "march"],
    description: "One of the oldest continuously inhabited cities in the world, known for its spiritual significance.",
  },
  {
    id: 8,
    name: "Udaipur",
    state: "Rajasthan",
    country: "India",
    continent: "Asia",
    image: "/images/destinations/udaipur.jpg",
    budget: "moderate",
    activityTypes: ["cultural", "historical", "architecture"],
    bestTimeToVisit: ["september", "october", "november", "december", "january", "february", "march"],
    description: "Known as the City of Lakes, famous for its palaces, lakes, and romantic ambiance.",
  },
]

// Get unique states from destinations
const STATES = [...new Set(DESTINATIONS.map((dest) => dest.state))].sort()

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    state: "",
    budget: "",
    activityType: "",
    bestTime: "",
  })
  const [appliedFilters, setAppliedFilters] = useState({
    state: "",
    budget: "",
    activityType: "",
    bestTime: "",
  })

  // Apply filters
  const handleApplyFilters = () => {
    setAppliedFilters({ ...filters })
    setShowFilters(false)
  }

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      state: "",
      budget: "",
      activityType: "",
      bestTime: "",
    })
    setAppliedFilters({
      state: "",
      budget: "",
      activityType: "",
      bestTime: "",
    })
  }

  // Filter destinations based on search query and filters
  const filteredDestinations = DESTINATIONS.filter((destination) => {
    // Search query filter
    if (
      searchQuery &&
      !destination.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !destination.state.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // State filter
    if (appliedFilters.state && destination.state !== appliedFilters.state) {
      return false
    }

    // Budget filter
    if (appliedFilters.budget && destination.budget !== appliedFilters.budget) {
      return false
    }

    // Activity Type filter
    if (appliedFilters.activityType && !destination.activityTypes.includes(appliedFilters.activityType)) {
      return false
    }

    // Best Time to Visit filter
    if (appliedFilters.bestTime && !destination.bestTimeToVisit.includes(appliedFilters.bestTime)) {
      return false
    }

    return true
  })

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Explore Destinations
            </span>
          </h1>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-[200px]">
                  <Input
                    placeholder="Search destinations..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowFilters(!showFilters)}
                    className={showFilters ? "bg-secondary" : ""}
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  >
                    {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Filter options */}
              {showFilters && (
                <div className="mt-4 space-y-4 border-t pt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-primary" />
                        State
                      </label>
                      <Select value={filters.state} onValueChange={(value) => setFilters({ ...filters, state: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="All States" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All States</SelectItem>
                          {STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <DollarSign className="h-4 w-4 text-primary" />
                        Budget
                      </label>
                      <Select
                        value={filters.budget}
                        onValueChange={(value) => setFilters({ ...filters, budget: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any Budget" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Budget</SelectItem>
                          <SelectItem value="budget-friendly">Budget-Friendly</SelectItem>
                          <SelectItem value="moderate">Moderate</SelectItem>
                          <SelectItem value="luxury">Luxury</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <Compass className="h-4 w-4 text-primary" />
                        Activity Type
                      </label>
                      <Select
                        value={filters.activityType}
                        onValueChange={(value) => setFilters({ ...filters, activityType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="All Activities" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Activities</SelectItem>
                          <SelectItem value="adventure">Adventure</SelectItem>
                          <SelectItem value="beach">Beach</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="historical">Historical</SelectItem>
                          <SelectItem value="nature">Nature</SelectItem>
                          <SelectItem value="relaxation">Relaxation</SelectItem>
                          <SelectItem value="spiritual">Spiritual</SelectItem>
                          <SelectItem value="nightlife">Nightlife</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="h-4 w-4 text-primary" />
                        Best Time to Visit
                      </label>
                      <Select
                        value={filters.bestTime}
                        onValueChange={(value) => setFilters({ ...filters, bestTime: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Any Time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Time</SelectItem>
                          <SelectItem value="january">January</SelectItem>
                          <SelectItem value="february">February</SelectItem>
                          <SelectItem value="march">March</SelectItem>
                          <SelectItem value="april">April</SelectItem>
                          <SelectItem value="may">May</SelectItem>
                          <SelectItem value="june">June</SelectItem>
                          <SelectItem value="july">July</SelectItem>
                          <SelectItem value="august">August</SelectItem>
                          <SelectItem value="september">September</SelectItem>
                          <SelectItem value="october">October</SelectItem>
                          <SelectItem value="november">November</SelectItem>
                          <SelectItem value="december">December</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleApplyFilters}>Apply Filters</Button>
                    <Button variant="outline" onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Destinations */}
          <div className={viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map((destination) => (
                <DestinationCard key={destination.id} destination={destination} viewMode={viewMode} />
              ))
            ) : (
              <div className="col-span-full rounded-lg border p-8 text-center">
                <h3 className="mb-2 text-lg font-semibold">No destinations found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <ChatBubbleIcon />
    </div>
  )
}

function DestinationCard({ destination, viewMode }) {
  if (viewMode === "list") {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="flex flex-col sm:flex-row">
          <div className="aspect-video h-40 w-full sm:h-auto sm:w-48">
            <img
              src={destination.image || "/placeholder.svg"}
              alt={destination.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <h3 className="text-xl font-semibold">{destination.name}</h3>
              <p className="text-sm text-muted-foreground">{destination.state}</p>
              <p className="mt-2 text-sm">{destination.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                  <DollarSign className="mr-1 h-3 w-3" />
                  {destination.budget === "budget-friendly"
                    ? "Budget"
                    : destination.budget === "moderate"
                      ? "Moderate"
                      : "Luxury"}
                </span>
                {destination.activityTypes.slice(0, 2).map((activity) => (
                  <span
                    key={activity}
                    className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium"
                  >
                    <Compass className="mr-1 h-3 w-3" />
                    {activity.charAt(0).toUpperCase() + activity.slice(1)}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4">
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/explore/${destination.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={destination.image || "/placeholder.svg"}
          alt={destination.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold">{destination.name}</h3>
        <p className="text-sm text-muted-foreground">{destination.state}</p>
        <p className="mt-2 line-clamp-2 text-sm">{destination.description}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
            <DollarSign className="mr-1 h-3 w-3" />
            {destination.budget === "budget-friendly"
              ? "Budget"
              : destination.budget === "moderate"
                ? "Moderate"
                : "Luxury"}
          </span>
          <span className="inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium">
            <Calendar className="mr-1 h-3 w-3" />
            Best time:{" "}
            {destination.bestTimeToVisit[0].charAt(0).toUpperCase() + destination.bestTimeToVisit[0].slice(1)}
          </span>
        </div>
        <Button asChild className="mt-4 w-full">
          <Link href={`/explore/${destination.id}`}>View Details</Link>
        </Button>
      </div>
    </Card>
  )
}
