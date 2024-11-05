from fastapi import APIRouter, status
from sqlmodel import Session

from utils.database import SessionDep
from .schema import Book, BookCreateModel, BookUpdateModel
from .service import BookService

book_router = APIRouter()
book_service = BookService()


@book_router.get("/", response_model=list[Book])
def get_all_books(session: SessionDep):
    books = book_service.get_all_books(session)
    return books


@book_router.post("/", status_code=status.HTTP_201_CREATED, response_model=Book)
def create_a_book(book_data: BookCreateModel, session: SessionDep) -> dict:
    book = book_service.create_book(book_data, session)
    return book


# @book_router.get("/book/{book_id}")
# def get_book(book_id: int) -> dict:
#     for book in books:
#         if book["id"] == book_id:
#             return book

#     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")


# @book_router.patch("/book/{book_id}")
# def update_book(book_id: int, book_update_data: BookUpdateModel) -> dict:

#     for book in books:
#         if book["id"] == book_id:
#             book["title"] = book_update_data.title
#             book["publisher"] = book_update_data.publisher
#             book["page_count"] = book_update_data.page_count
#             book["language"] = book_update_data.language

#             return book

#     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")


# @book_router.delete("/book/{book_id}", status_code=status.HTTP_204_NO_CONTENT)
# def delete_book(book_id: int):
#     for book in books:
#         if book["id"] == book_id:
#             books.remove(book)

#             return {}

#     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Book not found")
