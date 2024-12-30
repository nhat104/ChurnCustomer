from datetime import datetime
from sqlmodel import SQLModel
from utils.models import ModelAttribute


class MLModelBase(SQLModel):
    name: str
    cutoff_selection: float = 0.5
    filename: str | None = None
    last_score_time: datetime | None = None


class MLModelPublic(MLModelBase):
    id: int
    predictive_power: float
    cutoff_selection: float
    calculation: int
    status: str
    user_id: int
    created_at: datetime
    updated_at: datetime


class MLModelPublicWithAttributes(MLModelPublic):
    attributes: list[ModelAttribute]


class MLModelCreate(MLModelBase):
    filename: str | None = None
    cutoff_selection: float = 0.5


class MLModelUpdate(SQLModel):
    name: str | None = None
    cutoff_selection: float | None = None
    calculation: int | None = None
    last_score_time: datetime | None = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "model1",
                "cutoff_selection": 0.5,
                "last_score_time": "2024-08-08 00:00:00",
            }
        }
    }
