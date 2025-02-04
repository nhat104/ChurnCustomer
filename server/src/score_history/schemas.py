from datetime import datetime
from sqlmodel import SQLModel
from ml_model.schemas import MLModelPublic
from score_result.schemas import ScoreResultPublic


class ScoreHistoryBase(SQLModel):
    name: str
    status: str
    number_exit: int
    number_stay: int
    cutoff_selection: float


class ScoreHistoryPublic(ScoreHistoryBase):
    id: int
    created_at: datetime
    updated_at: datetime


class ScoreHistoryWithModel(ScoreHistoryPublic):
    ml_model: MLModelPublic


class ScoreHistoryPublicWithResult(ScoreHistoryPublic):
    ml_model: MLModelPublic
    score_results: list["ScoreResultPublic"]


class ScoreHistoryCreate(ScoreHistoryBase):
    file_path: str
    ml_model_id: str


class ScoreHistoryUpdate(SQLModel):
    name: str | None = None

    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "model1",
            }
        }
    }
