"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { ChatBubbleIcon } from "@/components/chat-bubble-icon"
import { CalendarIcon, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useAuth } from "../context/auth-context"

export default function ItineraryPage() {
  const router = useRouter()
  const { setItinerary } = useAuth()
  const [destination, setDestination] = useState("")
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [budget, setBudget] = useState(50000)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateItinerary = async () => {
    console.log("** handleGenerateItinerary starts **")
    if (!destination || !startDate || !endDate) return

    setIsGenerating(true)

    try {
      // Calculate number of days between start and end date
      const diffTime = Math.abs(endDate - startDate);
      const numberOfDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days

      const response = await fetch('http://127.0.0.1:8000/itinerary/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination,
          days: numberOfDays
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary');
      }

      const data = await response.json();
      console.log('Trip id: ', data.trip_id);
      console.log('Generated itinerary:', data.data);
      
      // Create a structured itinerary object with all details
      const itineraryData = {
        tripId: data.trip_id,
        destination: destination,
        startDate: startDate,
        endDate: endDate,
        budget: budget,
        activities: data.data // This contains the day-wise activities
      };
      
      // Store the structured itinerary data in the auth context
      setItinerary(itineraryData);

      // Navigate to the itinerary detail page with just the trip ID
      router.push(`/itinerary/${data.trip_id}`);
      
    } catch (error) {
      console.error('Error generating itinerary:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsGenerating(false);
    }
  }

  const formatBudget = (value) => {
    // Convert to Indian format (e.g., 1,00,000)
    const formatter = Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(value);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Plan Your Trip
            </span>
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>Create New Itinerary</CardTitle>
              <CardDescription>
                Fill in these four details and our AI will generate a personalized travel plan for you.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="destination">Destination City</Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Mumbai, Delhi, Goa"
                    required
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Trip Dates</Label>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DatePicker label="Start Date" date={startDate} setDate={setStartDate} />
                    <DatePicker label="End Date" date={endDate} setDate={setEndDate} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="budget">Budget</Label>
                    <span className="text-sm font-medium">{formatBudget(budget)}</span>
                  </div>
                  <Slider
                    id="budget"
                    min={0}
                    max={500000}
                    step={10000}
                    value={[budget]}
                    onValueChange={(values) => setBudget(values[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatBudget(0)}</span>
                    <span>{formatBudget(250000)}</span>
                    <span>{formatBudget(500000)}</span>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={handleGenerateItinerary}
                disabled={!destination || !startDate || !endDate || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Itinerary...
                  </>
                ) : (
                  "Generate Itinerary"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <ChatBubbleIcon />
    </div>
  )
}

function DatePicker({ label, date, setDate }) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}
