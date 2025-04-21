from shared.FirebaseComponent.firebase import create_trip, get_user_trips_from_db
from .models import TripCreate, TripResponse
from fastapi import HTTPException
from typing import List


class TripService:

    async def create_trip(self, user_id: str, trip_data: TripCreate) -> TripResponse:
        """
        Creates a new trip for a user.
        """
        try:
            trip_dict = trip_data.dict()
            created_trip = create_trip(user_id, trip_dict)
            return TripResponse(**created_trip)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Trip creation failed: {str(e)}")

    async def get_user_trips(self, user_id: str) -> List[TripResponse]:
        """
        Retrieves all trips for a specific user, excluding sample/default entries.
        """
        try:
            print("-- get_user_trips")
            trips = get_user_trips_from_db(user_id)
            # Optionally exclude default/sample trip
            # filtered = [TripResponse(**trip) for trip in trips if trip.get("tripId") != "sample"]
            return trips
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to retrieve trips: {str(e)}")
