"use client"

import { useEffect, useState } from "react"

export function AnimatedText({ className }) {
  const [displayText, setDisplayText] = useState("")
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  const texts = [
    "Plan your perfect trip with AI-driven itineraries",
    "Discover hidden gems with personalized recommendations",
    "Create your dream vacation with smart travel planning",
    "Explore the world with confidence and ease",
  ]

  useEffect(() => {
    const currentText = texts[textIndex]

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length + 1))

        if (displayText.length === currentText.length) {
          // Pause at the end before deleting
          setTypingSpeed(1500)
          setIsDeleting(true)
        } else {
          setTypingSpeed(80)
        }
      } else {
        setDisplayText(currentText.substring(0, displayText.length - 1))

        if (displayText.length === 0) {
          setIsDeleting(false)
          setTextIndex((textIndex + 1) % texts.length)
          setTypingSpeed(500)
        } else {
          setTypingSpeed(40)
        }
      }
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, textIndex, texts, typingSpeed])

  return (
    <div className={className}>
      <p className="h-[3em] sm:h-[2em]">
        {displayText}
        <span className="animate-blink">|</span>
      </p>
    </div>
  )
}
