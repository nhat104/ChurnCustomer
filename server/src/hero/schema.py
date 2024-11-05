from sqlmodel import SQLModel


class HeroPublic(SQLModel):
    id: int
    name: str
    secret_name: str
    age: int | None = None


class HeroCreate(SQLModel):
    name: str
    age: int | None = None
    secret_name: str


class HeroUpdate(SQLModel):
    name: str | None = None
    age: int | None = None
    secret_name: str | None = None
