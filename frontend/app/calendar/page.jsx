"use client"

import { useState } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatBubbleIcon } from "@/components/chat-bubble-icon"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Days of the week
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// Mock travel data
const TRAVEL_EVENTS = [
  {
    id: 1,
    title: "Goa Trip",
    startDate: new Date(2025, 4, 15), // May 15, 2025
    endDate: new Date(2025, 4, 22), // May 22, 2025
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "Manali Trip",
    startDate: new Date(2025, 5, 10), // June 10, 2025
    endDate: new Date(2025, 5, 17), // June 17, 2025
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Mumbai Business Trip",
    startDate: new Date(2025, 7, 5), // August 5, 2025
    endDate: new Date(2025, 7, 8), // August 8, 2025
    color: "bg-purple-500",
  },
]

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  // Get current month and year
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Check if a date has travel events
  const getEventsForDate = (date) => {
    return TRAVEL_EVENTS.filter((event) => {
      const eventStart = new Date(event.startDate)
      const eventEnd = new Date(event.endDate)
      return date >= eventStart && date <= eventEnd
    })
  }

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth)

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day)
      const events = getEventsForDate(date)
      days.push({ day, date, events })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  // Format month name
  const monthName = currentDate.toLocaleString("default", { month: "long" })

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="mb-6 text-3xl font-bold">
              <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                Travel Calendar
              </span>
            </h1>
            <Button asChild>
              <Link href="/itinerary">
                <Plus className="mr-2 h-4 w-4" />
                Plan New Trip
              </Link>
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  {monthName} {currentYear}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={prevMonth}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextMonth}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>View and manage your travel plans</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day headers */}
                {DAYS.map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {calendarDays.map((dayData, index) => (
                  <div
                    key={index}
                    className={cn(
                      "aspect-square p-1 relative border rounded-md",
                      dayData ? "hover:bg-muted cursor-pointer" : "bg-muted/20",
                      selectedDate && dayData?.date.toDateString() === selectedDate.toDateString()
                        ? "bg-muted ring-1 ring-primary"
                        : "",
                    )}
                    onClick={() => dayData && setSelectedDate(dayData.date)}
                  >
                    {dayData && (
                      <>
                        <span className="text-xs">{dayData.day}</span>

                        {/* Event indicators */}
                        {dayData.events.length > 0 && (
                          <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-0.5">
                            {dayData.events.map((event, i) => (
                              <div
                                key={i}
                                className={cn("h-1.5 w-1.5 rounded-full", event.color)}
                                title={event.title}
                              />
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Selected date events */}
              {selectedDate && (
                <div className="mt-6 border-t pt-4">
                  <h3 className="mb-4 text-sm font-medium">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </h3>
                  <div className="space-y-3">
                    {getEventsForDate(selectedDate).length > 0 ? (
                      getEventsForDate(selectedDate).map((event) => (
                        <div key={event.id} className="flex items-center gap-3 rounded-md border p-3">
                          <div className={cn("h-4 w-4 rounded-full", event.color)} />
                          <div className="flex-1">
                            <p className="font-medium">{event.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                            </p>
                          </div>
                          <Button asChild variant="outline" size="sm">
                            <Link href={`/itinerary/${event.id}`}>View</Link>
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-md border border-dashed p-6 text-center">
                        <p className="text-sm text-muted-foreground">No trips scheduled for this day</p>
                        <Button asChild className="mt-4" size="sm">
                          <Link href="/itinerary">
                            <Plus className="mr-2 h-3 w-3" />
                            Plan a Trip
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Trips</CardTitle>
              <CardDescription>Your scheduled travel plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {TRAVEL_EVENTS.map((event) => (
                  <div key={event.id} className="flex items-center gap-3 rounded-md border p-3">
                    <div className={cn("h-4 w-4 rounded-full", event.color)} />
                    <div className="flex-1">
                      <p className="font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                      </p>
                    </div>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/itinerary/${event.id}`}>View</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <ChatBubbleIcon />
    </div>
  )
}
