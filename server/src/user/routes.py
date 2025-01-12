from fastapi import Depends

from utils.database import SessionDep
from utils.custom_api import APIResponse, CustomAPIRouter
from auth.dependencies import AccessTokenBearer

from .schemas import UserPublic, UserUpdate
from .service import UserService

user_router = CustomAPIRouter()
user_service = UserService()


@user_router.get("/me", response_model=APIResponse[UserPublic])
def get_user_me(
    session: SessionDep,
    token: dict = Depends(AccessTokenBearer()),
):
    email = token["user"]["email"]
    user = user_service.get_user_by_email(email, session)
    return APIResponse(data=user)


@user_router.patch("/me", response_model=APIResponse[UserPublic])
def update_user_me(
    user_data: UserUpdate,
    session: SessionDep,
    token: dict = Depends(AccessTokenBearer()),
):
    email = token["user"]["email"]
    user = user_service.update_user(email, user_data, session)
    return APIResponse(data=user)
