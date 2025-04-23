"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Compass, Package, Brain } from "lucide-react"
import { LandingHeader } from "@/components/landing-header"
import { DestinationCarousel } from "@/components/destination-carousel"
import { AnimatedText } from "@/components/animated-text"
import { useRouter } from "next/navigation"

export function LandingPage() {
  const router = useRouter();

  const handleButtonClick = (path) => {
    const user_id = localStorage.getItem("user_id");
    if (user_id) {
      router.push("/dashboard");
    } else {
      router.push(path);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center px-4 py-20 text-center md:py-32">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        ></div>
        <div className="hero-overlay absolute inset-0 z-0"></div>
        <div className="relative z-10 max-w-4xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Your AI Travel Companion
          </h1>
          <AnimatedText className="mx-auto max-w-2xl text-lg md:text-xl text-white/90" />
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="font-semibold"
              onClick={() => handleButtonClick("/signup")}
            >
              Start Planning
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 font-semibold text-white backdrop-blur-sm hover:bg-white/20"
              onClick={() => handleButtonClick("/login")}
            >
              Log In
            </Button>
          </div>
        </div>
      </section>

      {/* Destination Carousel Section */}
      <section className="bg-white px-4 py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-8 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Explore Popular Destinations
          </h2>
          <DestinationCarousel />
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              className="transition-all duration-300 hover:bg-primary hover:text-white hover:scale-105 border-primary/50"
              onClick={() => handleButtonClick("/explore")}
            >
              View All Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Plan Your Journey with Ease
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Brain className="h-10 w-10 text-primary" />}
              title="Personalized Plans"
              description="AI-curated itineraries tailored to your budget, interests, and travel dates."
            />
            <FeatureCard
              icon={<Compass className="h-10 w-10 text-primary" />}
              title="Explore with Ease"
              description="Discover must-visit places, local hotspots, and hidden gems at every destination."
            />
            <FeatureCard
              icon={<Package className="h-10 w-10 text-primary" />}
              title="Pack Like a Pro"
              description="Get AI-based packing suggestions based on location and weather."
            />
            <FeatureCard
              icon={<Calendar className="h-10 w-10 text-primary" />}
              title="Dynamic Trip Management"
              description="Easily update, regenerate, and save multiple travel plans with route visualization."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/10 px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to Plan Your Next Adventure?</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of travelers who have discovered the perfect way to plan their trips.
          </p>
          <Button 
            size="lg" 
            className="font-semibold"
            onClick={() => handleButtonClick("/signup")}
          >
            Start Planning Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background px-4 py-6 md:py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center">
            <span className="text-lg font-bold">TravelGo</span>
          </div>
          {/* <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              About
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Contact
            </Link>
          </div> */}
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} TravelGo. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center rounded-lg border p-6 text-center transition-all hover:shadow-md overflow-hidden">
      <div className="mb-4">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
