from datetime import datetime
from sqlmodel import SQLModel


class UserBase(SQLModel):
    username: str | None = None
    email: str | None = None
    first_name: str | None = None
    last_name: str | None = None


class UserPublic(UserBase):
    id: int
    created_at: datetime
    updated_at: datetime


class UserUpdate(UserBase):
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None
    password: str | None = None
