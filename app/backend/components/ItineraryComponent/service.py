import requests
from .models import ItineraryResponse
# from core.config import settings
# from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline
# import torch
from huggingface_hub import InferenceClient
import os
from groq import Groq
import re
import json
from shared.FirebaseComponent.firebase import create_trip

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

HF_API_KEY = "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"
client = InferenceClient(model="mistralai/Mistral-7B-Instruct-v0.1", token=HF_API_KEY)

def parse_itinerary_to_json(text):
    # Split the text into days
    days = re.split(r'Day \d+', text)[1:]  # Skip the first empty split
    day_numbers = re.findall(r'Day \d+', text)
    
    formatted_itinerary = []
    
    for day_num, day_content in zip(day_numbers, days):
        # Extract morning, afternoon, and evening sections
        sections = {
            "Morning": re.search(r'Morning:(.*?)(?=Afternoon:|Evening:|$)', day_content, re.DOTALL),
            "Afternoon": re.search(r'Afternoon:(.*?)(?=Evening:|$)', day_content, re.DOTALL),
            "Evening": re.search(r'Evening:(.*?)(?=$)', day_content, re.DOTALL)
        }
        
        activities = []
        times = {
            "Morning": "9:00 AM",
            "Afternoon": "2:00 PM",
            "Evening": "7:00 PM"
        }
        
        for time_of_day, match in sections.items():
            if match:
                description = match.group(1).strip()
                if description:
                    activities.append({
                        "time": times[time_of_day],
                        "description": description
                    })
        
        day_obj = {
            "day": day_num.strip(),
            "activities": activities
        }
        formatted_itinerary.append(day_obj)
    
    return formatted_itinerary

async def generate_itinerary(destination, days):
    prompt = (
        f"Act like a travel planner. Plan a {days}-day trip to {destination} "
        "with food, stay, and activities. Give a detailed day-wise itinerary."
        "Give the output in terms of days and write separate paragraph for morning, afternoon, evening."
        "If the number of days are large do not repeat the generated text. Generate itinerary for maximum 5 days as per your understanding, but do not repeat the text."
        "And then write a paragraph about how can one spend the rest of the time taking walks in the city and do what interests them."
        "Write in this format:"
        "Day <day number>"
        "Morning:"
        "Afternoon:"
        "Evening:"
    )

    client = Groq()
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )
    
    response = ""
    for chunk in completion:
        print(chunk.choices[0].delta.content or "", end="")
        response += chunk.choices[0].delta.content or ""

    # Parse the response into JSON format
    formatted_itinerary = parse_itinerary_to_json(response)
    
    trip_id = 101
    result = {
        "data": formatted_itinerary,
        "trip_id": trip_id,
        "raw_response": response  # Keeping the raw response in case it's needed
    }

    return result

def extract_hotels_from_llm_response(response_text: str):
    print()
    # Regex to match each `{ name: ..., description: ... }` block
    pattern = r'\{\s*name:\s*(.*?),\s*description:\s*(.*?)\s*\}'
    matches = re.findall(pattern, response_text)

    hotel_list = []
    for name, description in matches:
        # Clean up quotes if missing and remove trailing punctuation
        name = name.strip().strip('"').strip("'")
        description = description.strip().strip('"').strip("'").rstrip('.')
        hotel_list.append({
            "name": name,
            "description": description
        })

    return hotel_list

async def generate_hotels(destination):
    prompt = (
        f"Act like a travel planner. Provide a list of 12 hotels in the {destination}."
        "The data should be like this format: with an object containing 2 key value pair - name, one line description about the place"
        "[{ name: Hotel Taj, description: description }]"
    )

    client = Groq()
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=True,
        stop=None,
    )
    
    response = ""
    for chunk in completion:
        # print(chunk.choices[0].delta.content or "", end="")
        response += chunk.choices[0].delta.content or ""

    hotels = extract_hotels_from_llm_response(response)

    print(hotels)

    return {
        "destination": destination,
        "hotels": hotels    
    }


async def save_itinerary_to_db(user_id: str, itinerary: dict):
    """
    Save the itinerary to the database.
    """

    print("save_itinerary_to_db")   
    print(itinerary)
    print(user_id) 
    created = create_trip(user_id, itinerary)

    return {
            "message": "Itinerary saved successfully",
            "data": created
    }

   
