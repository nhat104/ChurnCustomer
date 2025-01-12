from datetime import datetime
from sqlmodel import SQLModel, Field

from user.schemas import UserBase


class UserCreate(UserBase):
    password: str

    model_config = {
        "json_schema_extra": {
            "example": {
                "first_name": "Mai",
                "last_name": "Nhat",
                "username": "nhatmm",
                "email": "nhatmm@gmail.com",
                "password": "123456",
            }
        }
    }


class UserLogin(SQLModel):
    email: str = Field(max_length=40)
    password: str = Field(min_length=6)

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "nhatmm@gmail.com",
                "password": "123456",
            }
        }
    }


class AuthResponse(SQLModel):
    status_code: int
    message: str
    access_token: str
    refresh_token: str
    user: UserBase
