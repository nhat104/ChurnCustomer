import uuid
from sqlmodel import SQLModel, Field
from datetime import datetime


class User(SQLModel, table=True):
    __tablename__ = "user"
    id: int | None = Field(default=None, primary_key=True, unique=True)
    username: str
    first_name: str | None = None
    last_name: str | None = None
    email: str | None = None
    password: str
    created_at: datetime = Field(default=datetime.now())
    updated_at: datetime = Field(default=datetime.now())

    def __repr__(self) -> str:
        return f"<User {self.username}>"


class Hero(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    age: int | None = Field(default=None)
    secret_name: str

    def __repr__(self) -> str:
        return f"<Hero {self.name}>"


class Book(SQLModel, table=True):
    __tablename__ = "book"

    uid: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    title: str
    author: str
    publisher: str
    published_date: str | None = None
    page_count: int
    language: str
    created_at: datetime = Field(default=datetime.now)
    updated_at: datetime = Field(default=datetime.now)

    def __repr__(self) -> str:
        return f"<Book {self.title}>"
