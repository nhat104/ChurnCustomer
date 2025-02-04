from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime
from sqlalchemy import Column, Text


class User(SQLModel, table=True):
    __tablename__ = "user"
    id: int | None = Field(default=None, primary_key=True, unique=True)
    username: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    email: str
    password: str

    ml_models: list["MLModel"] = Relationship(back_populates="user")

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def __repr__(self) -> str:
        return f"<User {self.email}>"


class MLModel(SQLModel, table=True):
    __tablename__ = "ml_model"
    id: int | None = Field(default=None, primary_key=True, unique=True)
    name: str
    filename: str | None = None
    status: str
    predictive_power: float | None = None
    cutoff_selection: float = 0.5
    calculation: int = 0
    last_score_time: datetime | None = None

    user_id: int = Field(foreign_key="user.id")
    user: User = Relationship(back_populates="ml_models")
    score_histories: list["ScoreHistory"] = Relationship(
        back_populates="ml_model", cascade_delete=True
    )
    attributes: list["ModelAttribute"] = Relationship(
        back_populates="ml_model", cascade_delete=True
    )

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def __repr__(self) -> str:
        return f"<MLModel {self.name}>"


class ScoreHistory(SQLModel, table=True):
    __tablename__ = "score_history"
    id: int | None = Field(default=None, primary_key=True, unique=True)
    name: str
    number_exit: int
    number_stay: int
    file_path: str
    cutoff_selection: float = 0.5
    status: str

    ml_model_id: int = Field(foreign_key="ml_model.id")
    ml_model: MLModel = Relationship(back_populates="score_histories")
    score_results: list["ScoreResult"] = Relationship(
        back_populates="score_history", cascade_delete=True
    )

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def __repr__(self) -> str:
        return f"<ScoreHistory {self.name}>"


class ScoreResult(SQLModel, table=True):
    __tablename__ = "score_result"
    id: int | None = Field(default=None, primary_key=True, unique=True)
    name: str
    score: float
    resolution: str
    interpretation: str = Field(sa_column=Column(Text))

    score_history_id: int = Field(foreign_key="score_history.id")
    score_history: ScoreHistory = Relationship(back_populates="score_results")

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    def __repr__(self) -> str:
        return f"<ScoreResult {self.name}>"


class ModelAttribute(SQLModel, table=True):
    __tablename__ = "model_attribute"
    id: int | None = Field(default=None, primary_key=True, unique=True)
    name: str
    value: str = Field(sa_column=Column(Text))
    ml_model_id: int = Field(foreign_key="ml_model.id")
    ml_model: MLModel = Relationship(back_populates="attributes")

    def __repr__(self) -> str:
        return f"<ModelAttribute {self.name}>"
