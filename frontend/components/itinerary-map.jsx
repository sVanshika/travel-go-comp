"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Utensils, Plane } from "lucide-react"

export function ItineraryMap({ itinerary }) {
  const mapRef = useRef(null)
  const [selectedDay, setSelectedDay] = useState(1)
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState([])
  const [infoWindow, setInfoWindow] = useState(null)

  // Initialize the map
  useEffect(() => {
    // This is a mock implementation since we can't load Google Maps directly
    // In a real app, you would use the Google Maps JavaScript API
    const mockMap = {
      setCenter: () => {},
      setZoom: () => {},
    }

    setMap(mockMap)
    setInfoWindow({})

    // Cleanup function
    return () => {
      // Clear markers
      markers.forEach((marker) => {
        // In a real app: marker.setMap(null)
      })
    }
  }, [])

  // Update markers when selected day changes
  useEffect(() => {
    if (!map) return

    // Clear existing markers
    markers.forEach((marker) => {
      // In a real app: marker.setMap(null)
    })

    const newMarkers = []
    const day = itinerary.days.find((d) => d.day === selectedDay)

    if (day) {
      // Add hotel marker
      if (day.hotel && day.hotel.location) {
        // In a real app, you would create a marker for the hotel
        newMarkers.push({
          position: day.hotel.location,
          title: day.hotel.name,
          icon: "hotel",
          content: `<div><strong>${day.hotel.name}</strong><p>${day.hotel.area}</p></div>`,
        })
      }

      // Add activity markers
      day.activities.forEach((activity, index) => {
        if (activity.location) {
          // In a real app, you would create a marker for each activity
          newMarkers.push({
            position: activity.location,
            title: activity.title,
            icon: activity.type,
            content: `<div><strong>${activity.time} - ${activity.title}</strong><p>${activity.description}</p></div>`,
          })
        }
      })
    }

    setMarkers(newMarkers)
  }, [map, selectedDay, itinerary])

  return (
    <div className="space-y-4">
      <Tabs
        defaultValue={selectedDay.toString()}
        onValueChange={(value) => setSelectedDay(Number.parseInt(value))}
        className="w-full"
      >
        <TabsList className="mb-4 w-full flex overflow-x-auto">
          {itinerary.days.map((day) => (
            <TabsTrigger key={day.day} value={day.day.toString()} className="flex-1">
              Day {day.day}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="relative rounded-lg border overflow-hidden">
        {/* This would be a real map in a production app */}
        <div className="map-container bg-muted flex items-center justify-center">
          <div className="text-center p-8">
            <div className="mb-4 flex justify-center">
              <MapPin className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Map View</h3>
            <p className="text-muted-foreground">
              In the actual app, this would display an interactive map with all activities for Day {selectedDay}.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Day {selectedDay} Activities</h3>
        {itinerary.days
          .find((d) => d.day === selectedDay)
          ?.activities.map((activity, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  {activity.type === "food" ? (
                    <Utensils className="h-5 w-5 text-primary" />
                  ) : activity.type === "travel" ? (
                    <Plane className="h-5 w-5 text-primary" />
                  ) : (
                    <MapPin className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{activity.time}</span>
                    <span className="text-muted-foreground">•</span>
                    <h4 className="font-medium">{activity.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
