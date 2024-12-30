from sqlmodel import select

from utils.database import SessionDep
from utils.models import ScoreHistory, MLModel
from ml_model.service import MLModelService
from ml_model.schemas import MLModelUpdate

from .schemas import ScoreHistoryUpdate

ml_model_service = MLModelService()


class ScoreHistoryService:
    def get_user_score_histories(
        self, user_id: int, session: SessionDep, offset: int = 0, limit: int = 100
    ):
        statement = (
            select(ScoreHistory, MLModel)
            .join(MLModel)
            .where(MLModel.user_id == user_id)
            .order_by(ScoreHistory.created_at)
            .offset(offset)
            .limit(limit)
        )

        result = session.exec(statement).all()

        converted_result = []
        for score_history, ml_model in result:
            score_history.ml_model = ml_model
            converted_result.append(score_history)

        return converted_result

    def get_score_histories_by_ml_model_id(
        self, ml_model_id: int, session: SessionDep, offset: int = 0, limit: int = 100
    ):
        statement = (
            select(ScoreHistory)
            .where(ScoreHistory.ml_model_id == ml_model_id)
            .order_by(ScoreHistory.created_at)
            .offset(offset)
            .limit(limit)
        )
        result = session.exec(statement).all()
        return result

    def get_score_history(
        self, score_history_id: int, user_id: int, session: SessionDep
    ):
        statement = select(ScoreHistory).where(
            ScoreHistory.id == score_history_id, MLModel.user_id == user_id
        )
        score_history = session.exec(statement).first()
        return score_history

    def create_score_history_with_ml_model_id(
        self, score_history: dict, session: SessionDep
    ):
        db_score_history = ScoreHistory(**score_history)
        session.add(db_score_history)
        session.commit()
        session.refresh(db_score_history)
        return db_score_history

    def update_score_history(
        self,
        score_history_id: int,
        score_history: ScoreHistoryUpdate,
        user_id: int,
        session: SessionDep,
    ):
        db_score_history = self.get_score_history(score_history_id, user_id, session)
        if not db_score_history:
            return None
        score_history_data = score_history.model_dump(exclude_unset=True)
        for key, value in score_history_data.items():
            setattr(db_score_history, key, value)
        session.add(db_score_history)
        session.commit()
        session.refresh(db_score_history)
        return db_score_history

    def delete_score_history(
        self, score_history_id: int, user_id: int, session: SessionDep
    ):
        score_history = self.get_score_history(score_history_id, user_id, session)
        if not score_history:
            return None
        ml_model = ml_model_service.get_model(
            score_history.ml_model_id, user_id, session
        )
        ml_model_service.update_model(
            ml_model.id,
            MLModelUpdate(calculation=ml_model.calculation - 1),
            user_id,
            session,
        )
        session.delete(score_history)
        session.commit()
        return {"ok": True}
