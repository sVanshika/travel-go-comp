from fastapi import APIRouter, HTTPException
from .models import ItineraryRequest, ItineraryResponse, ItineraryHotel, ItinerarySaveRequest
from .service import generate_itinerary, generate_hotels, save_itinerary_to_db
from shared.FirebaseComponent.firebase import create_trip


router = APIRouter(prefix="/itinerary", tags=["Itinerary"])


@router.post("/generate")
async def generate_new_itinerary(request: ItineraryRequest):
    try:
        print("/itinerary/generate invoked")
        itinerary_generated = await generate_itinerary(request.destination, request.days)
        return itinerary_generated
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/gethotels")
async def generate_hotel_suggestions(request: ItineraryHotel):
    try:
        print("/itinerary/gethotels invoked")
        hotels_generated = await generate_hotels(request.destination)
        return hotels_generated
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/save")
async def save_itinerary(itinerary_request: ItinerarySaveRequest):
    try:
        print("/itinerary/save invoked")
        result = await save_itinerary_to_db(itinerary_request.user_id, itinerary_request.itinerary)
        print("-----------")
        print(result)
        return {"message": "Itinerary saved successfully", "status": 200}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
