from datetime import datetime
from sqlmodel import SQLModel, Field


class UserBase(SQLModel):
    username: str
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None


class UserPublic(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime


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
    username: str = Field(max_length=40)
    password: str = Field(min_length=6)

    model_config = {
        "json_schema_extra": {
            "example": {
                "username": "nhatmm",
                "password": "123456",
            }
        }
    }


class LoginResponse(SQLModel):
    message: str
    access_token: str
    refresh_token: str
    user: UserBase


class UserUpdate(UserBase):
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None
    password: str | None = None
