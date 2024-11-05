from typing import Annotated
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI
from sqlmodel import Session, SQLModel, create_engine

from config import Config

# Create the database engine
engine = create_engine(Config.DATABASE_URL, echo=True)


# Create a session dependency
def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Server is starting")
    # Session(engine).add(Hero(name="Hero 1", secret_name="Secret 1", age=30))
    # create the database and table
    SQLModel.metadata.create_all(engine)
    yield
    # SQLModel.metadata.drop_all(engine)
    print("server is stopping")
