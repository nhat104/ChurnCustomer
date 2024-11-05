from sqlmodel.ext.asyncio.session import AsyncSession
from sqlmodel import select, desc
from datetime import datetime

from .schema import BookCreateModel, BookUpdateModel
from .model import Book


class BookService:
    def get_all_books(self, session: AsyncSession):
        statement = select(Book).order_by(desc(Book.created_at))

        result = session.exec(statement)

        return result.all()

    # def get_book(self, book_uid: str, session: AsyncSession):
    #     statement = select(Book).where(Book.uid == book_uid)

    #     result = await session.exec(statement)

    #     book = result.first()

    #     return book if book is not None else None

    def create_book(self, book_data: BookCreateModel, session: AsyncSession):
        book_data_dict = book_data.model_dump()
        # book_data_dict["created_at"] = datetime.now()
        # book_data_dict["updated_at"] = datetime.now()
        # print(book_data_dict)

        new_book = Book(**book_data_dict)
        # new_book.published_date = datetime.strptime(
        #     book_data_dict["published_date"], "%Y-%m-%d"
        # )
        session.add(new_book)

        session.commit()

        return new_book


# def update_book(
#     self, book_uid: str, update_data: BookUpdateModel, session: AsyncSession
# ):
#     book_to_update = await self.get_book(book_uid, session)

#     if book_to_update is not None:
#         update_data_dict = update_data.model_dump()

#         for k, v in update_data_dict.items():
#             setattr(book_to_update, k, v)

#         await session.commit()

#         return book_to_update
#     else:
#         return None

# def delete_book(self, book_uid: str, session: AsyncSession):

#     book_to_delete = await self.get_book(book_uid, session)

#     if book_to_delete is not None:
#         await session.delete(book_to_delete)

#         await session.commit()

#         return {}

#     else:
#         return None
