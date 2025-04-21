from pydantic import BaseModel
from typing import Optional
from datetime import date


class TripCreate(BaseModel):
    destination: str
    days: int
    itinerary: Optional[str] = ""
    startDate: Optional[date] = None
    endDate: Optional[date] = None


class TripResponse(TripCreate):
    tripId: str
    createdAt: str
    updatedAt: str

    class Config:
        from_attributes = True  # Optional: if you're pulling directly from Firestore dict
