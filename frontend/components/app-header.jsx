"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, Map, Package, LogOut, Home, Compass } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { useRouter } from "next/navigation"

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        // Clear all local storage items
        localStorage.removeItem("local_id");
        localStorage.removeItem("user_id");
        // Close the sheet
        setIsOpen(false);
        // Redirect to landing page using router
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background px-4">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 py-6">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/explore"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <Compass className="h-5 w-5" />
                  Explore Destinations
                </Link>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Link
                  href="/itinerary"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <Map className="h-5 w-5" />
                  Plan Itinerary
                </Link>
                {/* <Link
                  href="/packing"
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                  onClick={() => setIsOpen(false)}
                >
                  <Package className="h-5 w-5" />
                  Packing List
                </Link> */}
                <button
                  onClick={handleLogout}
                  className="mt-4 flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
