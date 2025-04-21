"use client"

import { useState } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

export function TravelCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [viewMode, setViewMode] = useState("month") // month or year

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
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Travel Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {monthName} {currentYear}
            </span>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardDescription>Visualize your upcoming trips</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {DAYS.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {/* Calendar days */}
          {calendarDays.map((dayData, index) => (
            <div
              key={index}
              className={cn(
                "aspect-square p-1 relative",
                dayData ? "hover:bg-muted cursor-pointer" : "",
                selectedDate && dayData?.date.toDateString() === selectedDate.toDateString() ? "bg-muted" : "",
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
                        <div key={i} className={cn("h-1.5 w-1.5 rounded-full", event.color)} title={event.title} />
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
          <div className="mt-4 border-t pt-4">
            <h3 className="mb-2 text-sm font-medium">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </h3>
            <div className="space-y-2">
              {getEventsForDate(selectedDate).length > 0 ? (
                getEventsForDate(selectedDate).map((event) => (
                  <div key={event.id} className="flex items-center gap-2 rounded-md border p-2">
                    <div className={cn("h-3 w-3 rounded-full", event.color)} />
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {event.startDate.toLocaleDateString()} - {event.endDate.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No trips scheduled for this day</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
