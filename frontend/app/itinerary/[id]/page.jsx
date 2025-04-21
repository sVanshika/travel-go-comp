"use client"

import { AppHeader } from "@/components/app-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from '../../context/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchHotels } from '../hotelService';
import requests from 'axios';

export default function ItineraryDetailPage({ params }) {
  const { itinerary } = useAuth();
  const router = useRouter();
  const [activeView, setActiveView] = useState('itinerary');
  const [hotelList, setHotelList] = useState([]);

  const formatBudget = (value) => {
    const formatter = Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(value);
  }

  function getCookieValue(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split("; ");
  
    for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }
  


  const renderActiveView = () => {
    switch (activeView) {
      case 'map':
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Map View</h2>
            <p className="text-gray-500">Map integration coming soon...</p>
          </div>
        );
      case 'hotels':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended Hotels</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
              {hotelList && hotelList.length > 0 ? (
                hotelList.map((hotel, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-4">
                    <div className="flex items-center mb-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center mr-4">
                        <span className="text-3xl">🏨</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-lg text-gray-800">{hotel.name}</h3>
                        <p className="text-gray-600">{hotel.description}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Loading...</p>
              )}
            </div>
          </div>
        );
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Your Generated Itinerary</CardTitle>
              <CardDescription>
                Here's your personalized travel plan for {itinerary.destination}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {itinerary.activities && Array.isArray(itinerary.activities) ? (
                  itinerary.activities.map((day, index) => (
                    <div key={index} className="border rounded-lg p-6 mb-6 bg-white shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <h3 className="font-semibold text-xl text-gray-800">Day {index + 1}</h3>
                      </div>
                      <p className="text-sm text-gray-500 mb-6">{day.activities?.length || 0} activities planned</p>
                      
                      <div className="space-y-8">
                        {day.activities && Array.isArray(day.activities) ? (
                          day.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="flex gap-6">
                              {/* Time Column */}
                              <div className="w-24 flex-shrink-0">
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full bg-primary/20 ring-4 ring-primary/10" />
                                  <span className="text-sm font-medium text-gray-600">{activity.time}</span>
                                </div>
                              </div>
                              
                              {/* Activity Content */}
                              <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                                <p className="text-gray-600 text-sm leading-relaxed">{activity.description.split(':')[1] || activity.description}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-muted-foreground italic">No activities planned for this day.</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-8">No itinerary data available.</p>
                )}
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  useEffect(() => {
    if (activeView === 'hotels' && itinerary) {
        // Usage

      const getHotels = async () => {
        try {
          const data = await fetchHotels(itinerary.destination);
          setHotelList(data.hotels);

          const userId = getCookieValue("local_id");
          console.log("local user id: ")
          console.log(userId);
        } catch (error) {
          console.error('Error getting hotels:', error);
        }
      };
      getHotels();
    }
  }, [activeView, itinerary]);

  const saveItinerary = async () => {
    try {
      console.log("saveItinerary")
      const user_id = localStorage.getItem("user_id");
      console.log(user_id)
      // const response = await requests.post('/itinerary/save', 
      //   { itinerary: itinerary, user_id: user_id });

      const response = await fetch('http://127.0.0.1:8000/itinerary/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itinerary: itinerary,
          user_id: user_id
        })
      });

      const data = await response.json()
      console.log(data)
      console.log(response)
      if (response.ok) {
        console.log("Itinerary saved successfully:", response.data);
        alert('Itinerary saved successfully!');
        router.push('/dashboard')
      } else {
        console.error("Failed to save itinerary.");
      }
    } catch (error) {
      console.error('Error saving itinerary:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  {itinerary?.destination || 'Your Itinerary'}
                </span>
              </h1>
              {itinerary && (
                <div className="mt-2 text-sm text-gray-600 space-x-4">
                  <span>
                    {new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}
                  </span>
                  <span>•</span>
                  <span>Budget: {formatBudget(itinerary.budget)}</span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push('/itinerary')}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Regenerate Plan
              </button>
              <button
                onClick={saveItinerary}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Itinerary
              </button>
            </div>
          </div>

          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              onClick={() => setActiveView('itinerary')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
                activeView === 'itinerary'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Itinerary
            </button>
            {/* <button
              onClick={() => setActiveView('map')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
                activeView === 'map'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Map View
            </button> */}
            <button
              onClick={() => setActiveView('hotels')}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
                activeView === 'hotels'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Hotels
            </button>
          </div>

          {renderActiveView()}
        </div>
      </main>
    </div>
  )
}
