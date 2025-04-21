import { useEffect, useState } from 'react';
import { AppHeader } from "@/components/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import requests from 'axios';

export default function SavedTripsPage() {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchSavedTrips = async () => {
            try {
                const userId = getCookieValue("local_id"); // Function to get user ID from cookies
                const response = await requests.get(`/itinerary/saved?user_id=${userId}`);
                setTrips(response.data);
            } catch (error) {
                console.error('Error fetching saved trips:', error);
            }
        };

        fetchSavedTrips();
    }, []);

    return (
        <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-1 p-4 md:p-6">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-3xl font-bold mb-6">Your Saved Trips</h1>
                    <div className="space-y-4">
                        {trips.length > 0 ? (
                            trips.map((trip, index) => (
                                <Card key={index}>
                                    <CardHeader>
                                        <CardTitle>{trip.destination}</CardTitle>
                                        <CardDescription>
                                            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p>{trip.description}</p> {/* Adjust based on your trip data structure */}
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p>No saved trips found.</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}