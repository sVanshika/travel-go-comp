"use client";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChatBubbleIcon } from "@/components/chat-bubble-icon";
import Link from "next/link";
import { Calendar, MapPin, Package, Plus, Grid, List } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://172.17.48.231:8000/auth/protected", {
          method: "GET",
          credentials: "include", // send cookies
        });

        console.log("dashboard /protected res")
        console.log(res)

        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // store user info if needed
        } else {
          router.push("/signup");
        }
      } catch (err) {
        router.push("/signup");
      }
    };

    //checkAuth();
  });

  // Mock data for upcoming trips 
  const upcomingTrips = [
    {
      id: 1,
      destination: "Goa",
      startDate: "2025-05-15",
      endDate: "2025-05-22",
      image: "/images/destinations/goa.jpg",
    },
    {
      id: 2,
      destination: "Manali",
      startDate: "2025-06-10",
      endDate: "2025-06-17",
      image: "/images/destinations/manali.jpg",
    },
  ];

  // Mock data for past trips
  const pastTrips = [
    {
      id: 9,
      destination: "Mumbai",
      startDate: "2024-01-10",
      endDate: "2024-01-15",
      image: "/images/destinations/mumbai.jpg",
    },
    {
      id: 10,
      destination: "Delhi",
      startDate: "2023-11-05",
      endDate: "2023-11-10",
      image: "/images/destinations/delhi.jpg",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-6 text-3xl font-bold">
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Welcome back!
            </span>
          </h1>

          {/* Quick Actions */}
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <QuickActionCard
              title="Plan New Trip"
              description="Create a new AI-generated itinerary"
              icon={<MapPin className="h-5 w-5" />}
              href="/itinerary"
            />
            <QuickActionCard
              title="Create Packing List"
              description="Get AI-suggested items for your trip"
              icon={<Package className="h-5 w-5" />}
              href="/packing"
            />
            {/* <QuickActionCard
              title="View Calendar"
              description="See all your upcoming trips"
              icon={<Calendar className="h-5 w-5" />}
              href="/calendar"
            /> */}
            <QuickActionCard
              title="View Saved Trips"
              description="See all your saved trips"
              icon={<List className="h-5 w-5" />}
              href="/saved-trips"
            />
          </div>

          {/* Upcoming Trips Section */}
          <div className="space-y-6 mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Upcoming Trips</h2>
              <div className="flex rounded-md border">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none rounded-l-md"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none rounded-r-md"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {upcomingTrips.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-4"
                }
              >
                {upcomingTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    viewMode={viewMode}
                    isPast={false}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="mb-4 text-center text-muted-foreground">
                    You don't have any upcoming trips yet.
                  </p>
                  <Button asChild>
                    <Link href="/itinerary">
                      <Plus className="mr-2 h-4 w-4" />
                      Plan Your First Trip
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Past Trips Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Past Trips</h2>
            </div>

            {pastTrips.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                    : "space-y-4"
                }
              >
                {pastTrips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    viewMode={viewMode}
                    isPast={true}
                  />
                ))}
              </div>
            ) : (
              <Card className="bg-muted/50">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <p className="text-center text-muted-foreground">
                    You don't have any past trips yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <ChatBubbleIcon />
    </div>
  );
}

function QuickActionCard({ title, description, icon, href }) {
  const handleClick = async () => {
    try {
      // const res = await fetch("http://127.0.0.1:8000/auth/protected", {
      //   credentials: "include",
      // });

      // if (res.ok) {
      //   // User is authenticated, go to intended page
      //   router.push(href);
      // } else {
      //   // Not authenticated, go to signup
      //   router.push("/signup");
      // }
    } catch (error) {
      console.error("Error checking auth:", error);
      router.push("/signup");
    }
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" onClick={handleClick}>
          <Link href={href}>Get Started</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Update the TripCard component to add the past-trip-card class for past trips
function TripCard({ trip, viewMode, isPast = false }) {
  // Format dates
  const startDate = new Date(trip.startDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const endDate = new Date(trip.endDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (viewMode === "list") {
    return (
      <Card
        className={`overflow-hidden transition-all hover:shadow-md ${
          isPast ? "past-trip-card" : ""
        }`}
      >
        <div className="flex flex-col sm:flex-row">
          <div className="aspect-video h-40 w-full sm:h-auto sm:w-48">
            <img
              src={trip.image || "/placeholder.svg"}
              alt={trip.destination}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-4">
            <div>
              <h3 className="text-xl font-semibold">{trip.destination}</h3>
              <p className="text-sm text-muted-foreground">
                {startDate} - {endDate}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href={`/explore/${trip.id}`}>View Itinerary</Link>
              </Button>
              <Button asChild size="sm">
                <Link href={`/packing?trip=${trip.id}`}>Packing List</Link>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md ${
        isPast ? "past-trip-card" : ""
      }`}
    >
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={trip.image || "/placeholder.svg"}
          alt={trip.destination}
          className="h-full w-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{trip.destination}</CardTitle>
        <CardDescription>
          {startDate} - {endDate}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href={`/explore/${trip.id}`}>View Itinerary</Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/packing?trip=${trip.id}`}>Packing List</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
