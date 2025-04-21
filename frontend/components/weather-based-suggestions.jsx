"use client"

import { useState, useEffect } from "react"
import { Cloud, Sun, CloudRain, Snowflake } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function WeatherBasedSuggestions({ destination, startDate, endDate }) {
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (destination && startDate && endDate) {
      fetchWeatherAndSuggestions()
    }
  }, [destination, startDate, endDate])

  const fetchWeatherAndSuggestions = async () => {
    setLoading(true)

    // In a real app, this would call a weather API
    // For demo purposes, we'll simulate different weather conditions based on destination
    setTimeout(() => {
      let weatherData
      const lowerDestination = destination.toLowerCase()

      if (
        lowerDestination.includes("goa") ||
        lowerDestination.includes("mumbai") ||
        lowerDestination.includes("kerala")
      ) {
        weatherData = { condition: "sunny", temperature: "28-32°C", humidity: "70%" }
      } else if (lowerDestination.includes("manali") || lowerDestination.includes("shimla")) {
        weatherData = { condition: "cold", temperature: "5-10°C", humidity: "40%" }
      } else if (lowerDestination.includes("delhi") || lowerDestination.includes("jaipur")) {
        weatherData = { condition: "hot", temperature: "35-40°C", humidity: "30%" }
      } else if (lowerDestination.includes("darjeeling") || lowerDestination.includes("gangtok")) {
        weatherData = { condition: "rainy", temperature: "15-20°C", humidity: "85%" }
      } else {
        weatherData = { condition: "moderate", temperature: "22-28°C", humidity: "50%" }
      }

      setWeather(weatherData)
      generateSuggestions(weatherData)
      setLoading(false)
    }, 1500)
  }

  const generateSuggestions = (weatherData) => {
    let weatherSuggestions = []

    // Base suggestions on weather conditions
    switch (weatherData.condition) {
      case "sunny":
        weatherSuggestions = [
          "Sunscreen (SPF 50+)",
          "Sunglasses",
          "Hat or cap",
          "Light cotton clothes",
          "Umbrella for shade",
          "Reusable water bottle",
          "Electrolyte packets",
          "Aloe vera gel for sunburn",
        ]
        break
      case "cold":
        weatherSuggestions = [
          "Thermal underwear",
          "Woolen sweaters",
          "Heavy jacket",
          "Gloves and scarf",
          "Woolen socks",
          "Moisturizer for dry skin",
          "Lip balm",
          "Hot water bottle",
        ]
        break
      case "rainy":
        weatherSuggestions = [
          "Waterproof jacket",
          "Umbrella",
          "Waterproof footwear",
          "Quick-dry clothes",
          "Plastic bags for electronics",
          "Waterproof phone case",
          "Extra pair of shoes",
          "Portable towel",
        ]
        break
      case "hot":
        weatherSuggestions = [
          "Light, breathable clothing",
          "Sunscreen (SPF 50+)",
          "Sunglasses",
          "Hat or cap",
          "Cooling towel",
          "Reusable water bottle",
          "Electrolyte packets",
          "Insect repellent",
        ]
        break
      default:
        weatherSuggestions = [
          "Light jacket",
          "Umbrella (just in case)",
          "Comfortable walking shoes",
          "Mix of light and warm clothes for layering",
          "Sunscreen",
          "Sunglasses",
          "Reusable water bottle",
        ]
    }

    setSuggestions(weatherSuggestions)
  }

  const getWeatherIcon = () => {
    switch (weather?.condition) {
      case "sunny":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "cold":
        return <Snowflake className="h-8 w-8 text-blue-500" />
      case "rainy":
        return <CloudRain className="h-8 w-8 text-blue-400" />
      case "hot":
        return <Sun className="h-8 w-8 text-orange-500" />
      default:
        return <Cloud className="h-8 w-8 text-gray-400" />
    }
  }

  if (!destination || !startDate || !endDate) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {loading ? <Skeleton className="h-8 w-8 rounded-full" /> : getWeatherIcon()}
          Weather-Based Suggestions
        </CardTitle>
        <CardDescription>
          {loading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <>
              Expected weather in {destination}: {weather?.temperature}, {weather?.condition}
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
          </div>
        ) : (
          <ul className="ml-6 list-disc space-y-1">
            {suggestions.map((item, index) => (
              <li key={index} className="text-sm">
                {item}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
