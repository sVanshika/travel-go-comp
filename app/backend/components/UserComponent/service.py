from shared.FirebaseComponent.firebase import update_user_profile, upload_profile_image, get_user_profile
from .models import UserProfileUpdate
from datetime import datetime

class UserService:
    @staticmethod
    async def update_profile(user_id, profile: UserProfileUpdate):
        profile_dict = profile.dict(exclude_unset=True)
        profile_dict["updatedAt"] = datetime.utcnow().isoformat()
        return update_user_profile(user_id, profile_dict)

    @staticmethod
    async def upload_profile_image(user_id, image_file):
        image_data = await image_file.read()
        url = upload_profile_image(user_id, image_data, image_file.content_type)
        await UserService.update_profile(user_id, UserProfileUpdate(profileImage=url))
        return url

    @staticmethod
    async def get_profile(user_id):
        return get_user_profile(user_id)
