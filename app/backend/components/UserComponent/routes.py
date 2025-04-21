from fastapi import APIRouter, Depends, UploadFile, File
from .service import UserService
from .models import UserProfileUpdate, UserProfileResponse
from components.AuthComponent.service import AuthService  # Token-based auth

router = APIRouter(prefix="/user", tags=["User"])
user_service = UserService()
auth_service = AuthService()


@router.get("/profile", response_model=UserProfileResponse)
async def get_profile(user=Depends(auth_service.get_current_user)):
    return await user_service.get_profile(user["uid"])


@router.put("/profile", response_model=UserProfileResponse)
async def update_profile(
    profile: UserProfileUpdate,
    user=Depends(auth_service.get_current_user)
):
    return await user_service.update_profile(user["uid"], profile)


@router.post("/upload-profile-image")
async def upload_profile_image(
    image: UploadFile = File(...),
    user=Depends(auth_service.get_current_user)
):
    return await user_service.upload_profile_image(user["uid"], image)
