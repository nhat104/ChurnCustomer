from datetime import timedelta
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.responses import JSONResponse

from utils.database import SessionDep
from utils.errors import UserExists, InvalidCredentials
from .schema import UserCreate, UserLogin, UserPublic, LoginResponse
from .service import UserService
from .utils import create_access_token, verify_password
from .dependencies import AccessTokenBearer

auth_router = APIRouter()
user_service = UserService()


@auth_router.post(
    "/signup", response_model=UserPublic, status_code=status.HTTP_201_CREATED
)
def create_user_account(user_data: UserCreate, session: SessionDep):
    username = user_data.username
    user_exists = user_service.user_exists(username, session)
    if user_exists:
        raise UserExists()

    new_user = user_service.create_user(user_data, session)
    return new_user


@auth_router.post("/login", response_model=LoginResponse)
def login(login_data: UserLogin, session: SessionDep):
    username, password = login_data.username, login_data.password

    user = user_service.get_user_by_username(username, session)
    if not user:
        raise InvalidCredentials()

    password_valid = verify_password(password, user.password)
    if not password_valid:
        raise InvalidCredentials()

    access_token = create_access_token(
        user_data={"username": user.username, "id": user.id}
    )
    refresh_token = create_access_token(
        user_data={"username": user.username, "id": user.id},
        expiry=timedelta(days=30),
        refresh=True,
    )

    return JSONResponse(
        content={
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            },
        }
    )


@auth_router.get("/me", response_model=UserPublic)
def get_user_me(
    session: SessionDep,
    token: dict = Depends(AccessTokenBearer()),
):
    username = token["user"]["username"]
    user = user_service.get_user_by_username(username, session)
    return user


# @auth_router.get("/refresh_token")
# def get_new_access_token(token_details: dict = Depends(RefreshTokenBearer())):
#     expiry_timestamp = token_details["exp"]

#     if datetime.fromtimestamp(expiry_timestamp) > datetime.now():
#         new_access_token = create_access_token(user_data=token_details["user"])

#         return JSONResponse(content={"access_token": new_access_token})

#     raise HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Token has expired",
#     )


@auth_router.get("/logout")
def logout(token_details: dict = Depends(AccessTokenBearer())):
    return JSONResponse(content={"message": "Logout successful"})
