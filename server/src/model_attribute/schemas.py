from datetime import datetime
from sqlmodel import SQLModel
from ml_model.schemas import MLModelPublic
from score_result.schemas import ScoreResultPublic


class ModelAttributeBase(SQLModel):
    name: str
    value: str


class ModelAttributePublic(ModelAttributeBase):
    id: int
    ml_model: MLModelPublic


class ModelAttributeCreate(ModelAttributeBase):
    ml_model_id: str


class ModelAttributeUpdate(SQLModel):
    name: str | None = None
    value: str | None = None
