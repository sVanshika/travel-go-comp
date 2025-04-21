"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

export function ChatBubbleIcon() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi there! I'm your AI travel assistant. How can I help you plan your trip today?",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      setMessages([...messages, { role: "user", content: input }])

      // Simulate AI response (in a real app, this would call an API)
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Thanks for your message! I'm a demo assistant, so I can't provide real responses yet. In the actual app, I would help you with travel recommendations, itinerary adjustments, and answering questions about your destination.",
          },
        ])
      }, 1000)

      setInput("")
    }
  }

  return (
    <>
      <Button className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg" onClick={() => setIsOpen(true)}>
        <MessageCircle className="h-6 w-6" />
      </Button>

      {isOpen && (
        <Card className="fixed bottom-20 right-4 w-[350px] max-w-[calc(100vw-2rem)] shadow-lg md:w-[400px]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Travel Assistant</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`rounded-lg px-4 py-2 max-w-[80%] ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t p-4">
            <div className="flex w-full items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <Button size="icon" onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </>
  )
}
