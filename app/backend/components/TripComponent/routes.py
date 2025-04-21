from fastapi import APIRouter, HTTPException, Depends, Query
from .models import TripCreate, TripResponse
from .service import TripService
from components.AuthComponent.service import AuthService

router = APIRouter(prefix="/trip", tags=["Trip"])
trip_service = TripService()


@router.post("/create", response_model=TripResponse)
async def create_trip(
    trip_data: TripCreate,
    user=Depends(AuthService.get_current_user)
):
    """
    Creates a new trip for the authenticated user.
    """
    try:
        return await trip_service.create_trip(user["uid"], trip_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



@router.get("/my-trips")
async def get_user_trips(user_id: str = Query(...)):
    """
    Fetch trips for a specific user.
    """
    try:
        # Fetch trips from your database or Firestore based on user_id
        print("/trip/my-trips inoked")
        trips = await trip_service.get_user_trips(user_id)
        print("------------------------------------------")
        print(trips)
        return trips
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
