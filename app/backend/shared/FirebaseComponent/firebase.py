from dotenv import load_dotenv
load_dotenv()

import firebase_admin
from firebase_admin import credentials, auth, storage
import os
from fastapi import HTTPException
from firebase_admin import auth, firestore
from datetime import datetime
from typing import List, Dict, Any
import uuid
import traceback

# Load Firebase Admin credentials from environment
cred_path = os.getenv("FIREBASE_ADMIN_CREDENTIAL")
storage_bucket = os.getenv("FIREBASE_STORAGE_BUCKET")

# Initialize Firebase app only once
if not firebase_admin._apps:
    if not cred_path:
        raise ValueError("FIREBASE_ADMIN_CREDENTIAL not set in .env")
    if not os.path.exists(cred_path):
        raise FileNotFoundError(f"Firebase credentials not found at: {cred_path}")
    
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred, {
        'storageBucket': storage_bucket
    })

# Initialize Firestore after Firebase app is initialized
db = firestore.client()

def create_user(name: str, email: str, password: str):
    """
    Creates a new user in Firebase Authentication and initializes their Firestore data.
    """
    try:
        print("auth")
        print(auth)
        if not email or not password or not name:
            raise ValueError("Email, password, and name must be provided.")
        print("Creating user with:")
        print(f"Name: {name}")
        print(f"Email: {email}")
        print(f"Password length: {len(password) if password else 'None'}")
        user_record = auth.create_user(
            email=email,
            password=password,
            display_name=name
        )
        print("user_record")
        print(user_record)
        
        # Prepare user data to be added to Firestore
        user_data = {
            "fullName": name,
            "email": email,
            "phone": "",
            "bio": "",
            "preferences": [],
            "budget": "",
            "favoriteDestinations": [],
            "profileImage": "",
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        }

        # Add user data to Firestore
        user_ref = db.collection("users").document(user_record.uid)
        print("user_ref")
        print(user_ref)
        user_ref.set(user_data)

        # Initialize empty trips subcollection
        trips_ref = user_ref.collection("trips")
        
        # Create a sample trip document to initialize the subcollection
        sample_trip = {
            "tripId": "sample",
            "destination": "",
            "days": 0,
            "itinerary": "",
            "startDate": None,
            "endDate": None,
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        }
        # trips_ref.document("sample").set(sample_trip)
        print("user_record")
        print(user_record)
        
        return {
            "uid": user_record.uid,
            "email": user_record.email,
            "name": name
        }

    except auth.EmailAlreadyExistsError:
        raise HTTPException(status_code=400, detail="EMAIL_EXISTS")

    except ValueError as ve:
        # Handle common weak password cases
        if "Password should be at least" in str(ve):
            raise HTTPException(status_code=400, detail="WEAK_PASSWORD")
        elif "email" in str(ve).lower():
            raise HTTPException(status_code=400, detail="INVALID_EMAIL")
        else:
            raise HTTPException(status_code=400, detail=str(ve))

    except Exception as e:
        print("🔥 Full exception traceback:")
        traceback.print_exc()

        raise HTTPException(status_code=500, detail=f"Firebase error: {str(e)}")

def update_user_profile(user_id: str, profile_data: Dict[str, Any]):
    """
    Updates a user's profile in Firestore
    """
    try:
        user_ref = db.collection("users").document(user_id)
        
        # Update only the provided fields
        update_data = {
            **profile_data,
            "updatedAt": datetime.now().isoformat()
        }
        
        user_ref.update(update_data)
        return user_ref.get().to_dict()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update profile: {str(e)}")

def upload_profile_image(user_id: str, image_data: bytes, content_type: str) -> str:
    """
    Uploads a profile image to Firebase Storage and returns the download URL
    """
    try:
        bucket = storage.bucket()
        filename = f"profile_images/{user_id}/{uuid.uuid4()}"
        blob = bucket.blob(filename)
        
        # Upload the image
        blob.upload_from_string(
            image_data,
            content_type=content_type
        )
        
        # Make the image publicly accessible
        blob.make_public()
        
        return blob.public_url
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {str(e)}")

def verify_firebase_token(token: str):
    try:
        decoded_token = auth.verify_id_token(token)
        # Get user data from Firestore
        user_doc = db.collection("users").document(decoded_token["uid"]).get()
        user_data = user_doc.to_dict() if user_doc.exists else {}
        
        return {
            "uid": decoded_token["uid"],
            "email": decoded_token.get("email"),
            "name": decoded_token.get("name", ""),
            **user_data
        }
    except Exception as e:
        print("Token verification failed:", e)
        return None

def create_trip(user_id: str, trip_data: Dict[str, Any]):
    """
    Creates a new trip in the user's trips subcollection
    """
    print("firebase.py - create_trip")
    print(user_id)
    print(trip_data)
    try:
        trip_ref = db.collection("users").document(user_id).collection("trips").document()
        print(">>> trip_ref")
        print(trip_ref)

        trip_data.update({
            "tripId": trip_ref.id,
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        })
        
        trip_ref.set(trip_data)
        print(trip_ref)
        return trip_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create trip: {str(e)}")

def get_user_trips_from_db(user_id: str):
    """
    Retrieves all trips for a specific user
    """
    try:
        print("get_user_trips_from_db")
        trips_ref = db.collection("users").document(user_id).collection("trips")
        # print(trips_ref)
        trips = []
        
        # Get all documents in the trips subcollection
        for doc in trips_ref.stream():
            trip_data = doc.to_dict()
            trips.append(trip_data)
        print("trips -----")
        # print(trips)
            
        return trips
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to get trips: {str(e)}")

def get_user_profile(user_id: str) -> Dict[str, Any]:
    """
    Gets a user's profile from Firestore
    """
    try:
        user_ref = db.collection("users").document(user_id)
        user_doc = user_ref.get()
        
        if not user_doc.exists:
            return None
            
        return user_doc.to_dict()
    except Exception as e:
        print(f"Error getting user profile: {str(e)}")
        return None