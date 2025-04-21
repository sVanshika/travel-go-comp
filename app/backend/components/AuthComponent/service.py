from shared.FirebaseComponent.firebase import create_user, verify_firebase_token
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import requests
import os

# FastAPI's built-in security scheme for Bearer token
security = HTTPBearer()


class AuthService:
    firebase_api_key = os.getenv("FIREBASE_API_KEY")

    @staticmethod
    async def signup(request):
        return create_user(request.name, request.email, request.password)

    @staticmethod
    async def login(request):
        url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={AuthService.firebase_api_key}"
        response = requests.post(url, json=request.dict()).json()
        if "idToken" not in response:
            raise HTTPException(401, "Invalid credentials")
        return response

    @staticmethod
    async def get_current_user(
        credentials: HTTPAuthorizationCredentials = Depends(security)
    ):
        token = credentials.credentials
        user = verify_firebase_token(token)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authentication credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user
