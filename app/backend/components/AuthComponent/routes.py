from fastapi import APIRouter, HTTPException, Response, Request, Depends, Cookie

from .service import AuthService
from .models import SignupRequest, LoginRequest, UserResponse, TokenResponse

router = APIRouter(prefix="/auth")

@router.post("/signup")
async def signup(req: SignupRequest):
    return await AuthService.signup(req)

@router.post("/login")
async def login(req: LoginRequest):
    return await AuthService.login(req)

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("session_token")
    return {"message": "Logged out successfully"}

# @router.get("/protected", response_model=UserResponse)
# async def protected_route(session_token: str = Cookie(None)):
#     print("-> /protected session token:")
#     print(session_token)
#     # if not session_token:
#     #     raise HTTPException(status_code=401, detail="Not authenticated")

#     return await auth_service.verify_token(session_token)

@router.post("/signup", response_model=UserResponse)  
async def signup(user: SignupRequest):
    """
    Signup Endpoint: Creates a new user in Firebase Authentication.
    """
    return await AuthService.signup(user)

@router.post("/login", response_model=TokenResponse)
async def login(user: LoginRequest, response: Response):
    result = await AuthService.login(user)
    
    # Set cookie
    response.set_cookie(
        key="session_token",
        value=result.id_token,
        httponly=True,
        # secure=True,
        secure=False,
        samesite="None"
    )
    response.set_cookie(
        key="local_id",
        value=result.local_id,
        httponly=False,
        # secure=True,
        secure=True,
        samesite="Lax"
    )
    print("-> login result: ")
    print(result)
    return result

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("session_token")
    return {"message": "Logged out successfully"}

@router.get("/protected", response_model=UserResponse)
async def protected_route(session_token: str = Cookie(None)):
    print("-> /protected session token:")
    print(session_token)
    # if not session_token:
    #     raise HTTPException(status_code=401, detail="Not authenticated")

    return await AuthService.verify_token(session_token)


