"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function RegenerateItineraryModal({ isOpen, onClose, onRegenerate }) {
  const [changes, setChanges] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleRegenerate = async () => {
    if (!changes.trim()) return

    setIsLoading(true)

    // In a real app, this would call an API to regenerate the itinerary
    // Simulating API call with timeout
    setTimeout(() => {
      onRegenerate(changes)
      setIsLoading(false)
      setChanges("")
      onClose()
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Regenerate Itinerary</DialogTitle>
          <DialogDescription>Tell us what changes you'd like to make to your current itinerary.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Examples: 'Add more outdoor activities', 'Include more budget-friendly options', 'Focus on historical sites', etc."
            className="min-h-[150px]"
            value={changes}
            onChange={(e) => setChanges(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleRegenerate} disabled={!changes.trim() || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Regenerating...
              </>
            ) : (
              "Regenerate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
