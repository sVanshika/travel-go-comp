"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, Map, Package, Home, Compass } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useRouter } from "next/navigation";

export function LandingHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user_id = localStorage.getItem("user_id");
      if (user_id) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        localStorage.removeItem("user_id");
        setIsOpen(false);
        setIsAuthenticated(false);
        router.push("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="absolute left-0 right-0 top-0 z-50 border-b border-white/10 bg-transparent px-4 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Logo className="text-white" />
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle className="text-white" />

          {isAuthenticated && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 py-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    Home
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
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="/itinerary"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Map className="h-5 w-5" />
                    Plan Itinerary
                  </Link>
                  <Link
                    href="/packing"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <Package className="h-5 w-5" />
                    Packing List
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-lg font-medium hover:bg-accent"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="h-5 w-5" />
                    Profile
                  </Link>

                  <div className="mt-4">
                    <Button 
                      variant="destructive" 
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
