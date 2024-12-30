from typing import Annotated
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from sqlmodel import Session, SQLModel, create_engine, select

from utils.models import User
from auth.utils import generate_password_hash
from config import Config

# Create the database engine
engine = create_engine(Config.DATABASE_URL, echo=True)


# Create a session dependency
def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


def create_dummy_data():

    with Session(engine) as session:
        user = User(
            username="nhatmm",
            email="nhatmm@gmail.com",
            first_name="Mai Minh",
            last_name="Nhat",
            password=generate_password_hash("123456"),
        )
        statement = select(User)
        results = session.exec(statement)
        users = results.all()
        if not users:
            session.add(user)
            session.commit()
            session.refresh(user)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    create_dummy_data()


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Server is starting")
    create_db_and_tables()
    yield
    # SQLModel.metadata.drop_all(engine)
    print("server is stopping")
