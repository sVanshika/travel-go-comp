from pydantic import BaseModel

class ItineraryRequest(BaseModel):
    destination: str
    days: int

class ItineraryResponse(BaseModel):
    destination: str
    days: int
    details: str

class ItineraryHotel(BaseModel):
    destination: str

class ItinerarySaveRequest(BaseModel):
    itinerary: dict
    user_id: str
