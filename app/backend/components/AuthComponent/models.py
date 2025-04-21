from pydantic import BaseModel, EmailStr

class SignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    uid: str
    name: str
    email: EmailStr

class TokenResponse(BaseModel):
    id_token: str
    local_id: str
    message: str = "Login successful"
