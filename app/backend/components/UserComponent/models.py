from pydantic import BaseModel, EmailStr
from typing import List, Optional

class UserProfileBase(BaseModel):
    fullName: str
    email: EmailStr
    phone: Optional[str] = None
    bio: Optional[str] = None
    preferences: List[str] = []
    budget: Optional[str] = None
    favoriteDestinations: List[str] = []
    profileImage: Optional[str] = None

class UserProfileUpdate(UserProfileBase):
    pass

class UserProfileResponse(UserProfileBase):
    uid: str
    createdAt: str
    updatedAt: str
