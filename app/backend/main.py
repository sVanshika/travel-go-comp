from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from components.AuthComponent.routes import router as auth_router
from components.UserComponent.routes import router as user_router
from components.ItineraryComponent.routes import router as itinerary_router
from components.TripComponent.routes import router as trip_router

app = FastAPI(title="TravelGo: AI Agentic Travel Planner")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://172.17.48.231:3000", "http://172.17.48.231:3001"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

app.include_router(auth_router)
app.include_router(user_router)
app.include_router(itinerary_router)
app.include_router(trip_router)

@app.get("/")
async def root():
    return {"message": "Welcome to TravelGo"}
