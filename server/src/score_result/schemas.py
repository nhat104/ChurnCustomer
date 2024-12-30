from datetime import datetime
from sqlmodel import SQLModel


class ScoreResultBase(SQLModel):
    name: str
    score: float
    resolution: str


class ScoreResultPublic(ScoreResultBase):
    id: int
    # score_history_id: int
    # created_at: datetime
    # updated_at: datetime


class ScoreResultPublicWithInterpretation(ScoreResultPublic):
    interpretation: str
