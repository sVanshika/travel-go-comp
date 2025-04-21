"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function TypewriterEffect({ words, className }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const fullText = words.map((word) => word.text).join(" ")

    const type = () => {
      if (!isDeleting && currentText === fullText) {
        // Pause at the end of typing
        setTimeout(() => setIsDeleting(true), 2000)
        return
      }

      if (isDeleting && currentText === "") {
        setIsDeleting(false)
        return
      }

      const delta = isDeleting ? 50 : 150

      if (isDeleting) {
        setCurrentText((prev) => prev.slice(0, -1))
      } else {
        setCurrentText(fullText.slice(0, currentText.length + 1))
      }

      setTimeout(type, delta)
    }

    const timeout = setTimeout(type, typingSpeed)
    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed])

  return (
    <div className={cn("text-center", className)}>
      <p className="inline-block">
        {words.map((word, idx) => {
          const isActive = currentText.includes(word.text)
          return (
            <span
              key={idx}
              className={cn(
                "inline-block transition-opacity duration-200",
                isActive ? "opacity-100" : "opacity-0",
                word.className,
              )}
            >
              {word.text}{" "}
            </span>
          )
        })}
      </p>
    </div>
  )
}
