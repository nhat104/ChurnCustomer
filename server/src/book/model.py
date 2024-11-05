import uuid
from sqlmodel import SQLModel, Field, Column
from sqlalchemy.dialects import mysql, postgresql as pg
from datetime import datetime


class Book(SQLModel, table=True):
    __tablename__ = "book"

    uid: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)

    # id: int | None = Field(default=None, primary_key=True)
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
