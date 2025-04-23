"use client"

import { useState, useEffect } from "react"
import { AppHeader } from "@/components/app-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ChatBubbleIcon } from "@/components/chat-bubble-icon"
import { CloudSun, Plus, Trash2, Save, PlusCircle, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function PackingPage() {
  const router = useRouter()
  const [selectedTrip, setSelectedTrip] = useState("")
  const [showWeatherSuggestions, setShowWeatherSuggestions] = useState(false)
  const [items, setItems] = useState([
    { id: 1, name: "Passport", checked: true },
    { id: 2, name: "T-shirts (5)", checked: false },
    { id: 3, name: "Shorts (3)", checked: false },
    { id: 4, name: "Swimwear", checked: false },
    { id: 5, name: "Sunscreen", checked: false },
    { id: 6, name: "Phone charger", checked: false },
    { id: 7, name: "Camera", checked: false },
    { id: 8, name: "First aid kit", checked: false },
  ])
  const [originalItems, setOriginalItems] = useState([])
  const [newItem, setNewItem] = useState("")
  const [weatherSuggestions, setWeatherSuggestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [listSaved, setListSaved] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Check if there are changes to the packing list
  useEffect(() => {
    if (originalItems.length === 0) {
      setHasChanges(false)
      return
    }

    // Check if items have been added, removed, or modified
    if (items.length !== originalItems.length) {
      setHasChanges(true)
      return
    }

    const hasItemChanges = items.some((item) => {
      const originalItem = originalItems.find((oi) => oi.id === item.id)
      return !originalItem || originalItem.checked !== item.checked
    })

    setHasChanges(hasItemChanges)
  }, [items, originalItems])

  // Mock saved trips
  const savedTrips = [
    { id: "trip1", name: "Goa Beach Vacation", destination: "Goa", startDate: "2025-05-15", endDate: "2025-05-22" },
    { id: "trip2", name: "Manali Adventure", destination: "Manali", startDate: "2025-06-10", endDate: "2025-06-17" },
    {
      id: "trip3",
      name: "Mumbai Business Trip",
      destination: "Mumbai",
      startDate: "2025-08-05",
      endDate: "2025-08-08",
    },
  ]

  const handleTripSelect = (tripId) => {
    const trip = savedTrips.find((t) => t.id === tripId)
    if (trip) {
      setSelectedTrip(tripId)

      // Store the original items for comparison
      setOriginalItems([...items])
      setHasChanges(false)
      setListSaved(false)

      // Reset weather suggestions
      setWeatherSuggestions([])
      setShowWeatherSuggestions(false)
    }
  }

  const handleGetSuggestions = () => {
    if (!selectedTrip) return

    const trip = savedTrips.find((t) => t.id === selectedTrip)

    // In a real app, this would fetch the packing list for the selected trip
    // For demo purposes, we'll simulate loading suggestions
    setIsLoading(true)
    setShowWeatherSuggestions(true)

    setTimeout(() => {
      // Generate suggestions based on destination
      let suggestions = []
      const lowerDestination = trip.destination.toLowerCase()

      if (lowerDestination.includes("beach") || lowerDestination.includes("goa")) {
        suggestions = [
          { id: "s1", name: "Swimwear" },
          { id: "s2", name: "Beach Towel" },
          { id: "s3", name: "Sunscreen (SPF 50+)" },
          { id: "s4", name: "Sunglasses" },
          { id: "s5", name: "Flip Flops" },
          { id: "s6", name: "Hat" },
          { id: "s7", name: "Light Cover-up" },
          { id: "s8", name: "Aloe Vera Gel" },
        ]
      } else if (
        lowerDestination.includes("mountain") ||
        lowerDestination.includes("hill") ||
        lowerDestination.includes("manali") ||
        lowerDestination.includes("shimla")
      ) {
        suggestions = [
          { id: "s1", name: "Warm Jacket" },
          { id: "s2", name: "Thermal Underwear" },
          { id: "s3", name: "Hiking Boots" },
          { id: "s4", name: "Woolen Socks" },
          { id: "s5", name: "Gloves" },
          { id: "s6", name: "Scarf" },
          { id: "s7", name: "Beanie/Warm Hat" },
          { id: "s8", name: "Lip Balm" },
        ]
      } else {
        suggestions = [
          { id: "s1", name: "T-shirts (5)" },
          { id: "s2", name: "Pants/Shorts (3)" },
          { id: "s3", name: "Underwear (7)" },
          { id: "s4", name: "Socks (5 pairs)" },
          { id: "s5", name: "Comfortable Shoes" },
          { id: "s6", name: "Light Jacket" },
          { id: "s7", name: "Sunscreen" },
          { id: "s8", name: "Insect Repellent" },
        ]
      }

      setWeatherSuggestions(suggestions)
      setIsLoading(false)
    }, 1500)
  }

  const addItem = () => {
    if (newItem.trim()) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: newItem,
          checked: false,
        },
      ])
      setNewItem("")
      setHasChanges(true)
    }
  }

  const addSuggestedItem = (suggestion) => {
    // Check if item already exists
    const exists = items.some((item) => item.name.toLowerCase() === suggestion.name.toLowerCase())

    if (!exists) {
      setItems([
        ...items,
        {
          id: Date.now(),
          name: suggestion.name,
          checked: false,
        },
      ])
      setHasChanges(true)

      // Remove from suggestions
      setWeatherSuggestions(weatherSuggestions.filter((s) => s.id !== suggestion.id))
    }
  }

  const toggleItem = (id) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
    setHasChanges(true)
  }

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id))
    setHasChanges(true)
  }

  const savePackingList = () => {
    // In a real app, this would save the packing list to the server
    setListSaved(true)
    setHasChanges(false)
    setOriginalItems([...items])

    // Show success message
    alert("Packing list saved successfully!")

    // Redirect to dashboard
    setTimeout(() => {
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Packing List
            </span>
          </h1>

          <div className="grid gap-6 md:grid-cols-2">
            {!selectedTrip ? (
              <Card>
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                  <CardDescription>Select a trip to create a packing list</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <Label htmlFor="trip">Select a Trip</Label>
                    <Select value={selectedTrip} onValueChange={handleTripSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a trip" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedTrips.map((trip) => (
                          <SelectItem key={trip.id} value={trip.id}>
                            {trip.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            ) : showWeatherSuggestions ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudSun className="h-5 w-5 text-primary" />
                    Weather-Based Suggestions
                  </CardTitle>
                  <CardDescription>
                    Based on typical weather in {savedTrips.find((t) => t.id === selectedTrip)?.destination}
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-[400px] overflow-y-auto">
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {weatherSuggestions.length > 0 ? (
                        weatherSuggestions.map((suggestion) => (
                          <div key={suggestion.id} className="flex items-center justify-between rounded-lg border p-3">
                            <span>{suggestion.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => addSuggestedItem(suggestion)}
                              className="gap-1"
                            >
                              <PlusCircle className="h-4 w-4" />
                              Add
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground">All suggestions have been added!</p>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" onClick={() => setShowWeatherSuggestions(false)}>
                    Back to Packing List
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                  <CardDescription>
                    Packing list for {savedTrips.find((t) => t.id === selectedTrip)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Destination</p>
                      <p>{savedTrips.find((t) => t.id === selectedTrip)?.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Dates</p>
                      <p>
                        {new Date(savedTrips.find((t) => t.id === selectedTrip)?.startDate).toLocaleDateString()} -
                        {new Date(savedTrips.find((t) => t.id === selectedTrip)?.endDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleGetSuggestions}>
                    <CloudSun className="mr-2 h-4 w-4" />
                    Get AI Suggestions
                  </Button>
                </CardFooter>
              </Card>
            )}

            <PackingListCard
              items={items}
              newItem={newItem}
              setNewItem={setNewItem}
              addItem={addItem}
              toggleItem={toggleItem}
              deleteItem={deleteItem}
              onSave={savePackingList}
              listSaved={listSaved}
              selectedTrip={selectedTrip}
              hasChanges={hasChanges}
            />
          </div>
        </div>
      </main>
      <ChatBubbleIcon />
    </div>
  )
}

// Update the PackingListCard component to handle the Save button state
function PackingListCard({
  items,
  newItem,
  setNewItem,
  addItem,
  toggleItem,
  deleteItem,
  onSave,
  listSaved,
  selectedTrip,
  hasChanges,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Packing List</CardTitle>
        <CardDescription>
          {items.filter((item) => item.checked).length} of {items.length} items packed
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[500px] overflow-y-auto">
        <div className="mb-4 flex gap-2">
          <Input
            placeholder="Add new item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
          />
          <Button variant="outline" size="icon" onClick={addItem}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2">
                <Checkbox id={`item-${item.id}`} checked={item.checked} onCheckedChange={() => toggleItem(item.id)} />
                <Label htmlFor={`item-${item.id}`} className={cn(item.checked && "text-muted-foreground line-through")}>
                  {item.name}
                </Label>
              </div>
              <Button variant="ghost" size="icon" onClick={() => deleteItem(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      {/* <CardFooter>
        <Button className="w-full" onClick={onSave} disabled={!selectedTrip || listSaved || !hasChanges}>
          {listSaved ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              List Saved
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save List
            </>
          )}
        </Button>
      </CardFooter> */}
    </Card>
  )
}
