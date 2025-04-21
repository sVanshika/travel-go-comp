"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Sample destinations for the carousel
const destinations = [
  {
    id: 1,
    name: "Goa",
    description: "Beautiful beaches and vibrant nightlife",
    image: "/images/destinations/goa.jpg",
  },
  {
    id: 2,
    name: "Manali",
    description: "Breathtaking mountain views and adventure sports",
    image: "/images/destinations/manali.jpg",
  },
  {
    id: 3,
    name: "Jaipur",
    description: "Rich cultural heritage and magnificent palaces",
    image: "/images/destinations/jaipur.jpg",
  },
  {
    id: 4,
    name: "Kerala",
    description: "Serene backwaters and lush green landscapes",
    image: "/images/destinations/munnar.jpg",
  },
  {
    id: 5,
    name: "Varanasi",
    description: "Spiritual experience along the sacred Ganges",
    image: "/images/destinations/varanasi.jpg",
  },
]

export function DestinationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      goToNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentIndex])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const goToPrevious = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + destinations.length) % destinations.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToNext = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % destinations.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToIndex = (index) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const currentDestination = destinations[currentIndex]

  return (
    <div
      className="relative mx-auto max-w-4xl overflow-hidden rounded-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-[16/9] w-full">
        {/* Images with animation */}
        <div
          className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {destinations.map((dest) => (
            <div key={dest.id} className="min-w-full">
              <img src={dest.image || "/placeholder.svg"} alt={dest.name} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Destination info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <Link href={`/explore/${currentDestination.id}`} className="group">
            <h3 className="text-2xl font-bold group-hover:underline transition-colors">{currentDestination.name}</h3>
            <p className="mt-2 opacity-90">{currentDestination.description}</p>
          </Link>
        </div>

        {/* Navigation buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
          onClick={goToPrevious}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50"
          onClick={goToNext}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {destinations.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-4" : "bg-white/50"
              }`}
              onClick={() => goToIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  )
}
