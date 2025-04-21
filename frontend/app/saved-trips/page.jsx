"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from "@/components/app-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import requests from 'axios';
import ActivityModal from "@/components/ActivityModal";


const SavedTripsPage = () => {
    const router = useRouter();
    const [trips, setTrips] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedActivities, setSelectedActivities] = useState([]);

    useEffect(() => {
        const fetchSavedTrips = async () => {
            try {
                const userId = localStorage.getItem("user_id") 
                console.log("user_id: " + userId)
                const response = await fetch(`http://127.0.0.1:8000/trip/my-trips?user_id=${userId}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include"
                });

                const data = await response.json()

                setTrips(data);

                console.log(data)
            } catch (error) {
                console.error('Error fetching saved trips:', error);
            }
        };

        fetchSavedTrips();
    }, []);

    const handleViewActivities = (activities) => {
        console.log("Activities:", activities); // Check if activities are being passed correctly
        setSelectedActivities(activities);
        setIsModalOpen(true);
    };

    return (
        <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-1 p-4 md:p-6">
                <div className="mx-auto max-w-3xl flex justify-between items-center">
                    <h1 className="text-3xl font-bold mb-6">Your Saved Trips</h1>
                    <button
                        onClick={() => router.push('/dashboard')} // Navigate to the dashboard
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
                    >
                        Go to Dashboard
                    </button>
                </div>
                <div className="space-y-4 w-1/2 mx-auto">
                    {trips.length > 0 ? (
                        trips.map((trip, index) => (
                            <Card key={index} 
                                onClick={() => handleViewActivities(trip.activities)}
                                className="cursor-pointer hover:scale-105 transition duration-300 shadow-sm hover:shadow-lg">
                                <CardHeader>
                                    <CardTitle>{trip.destination}</CardTitle>
                                    <CardDescription>
                                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))
                    ) : (
                        <p>No saved trips found.</p>
                    )}
                </div>
            </main>
            <ActivityModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                activities={selectedActivities} 
            />
        </div>
    );
};

export default SavedTripsPage;