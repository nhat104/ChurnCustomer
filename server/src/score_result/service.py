import numpy as np

from sqlmodel import select

from utils.database import SessionDep
from utils.models import ScoreResult


class ScoreResultService:
    def get_score_result(
        self, score_result_id: int, session: SessionDep
    ) -> ScoreResult:
        score_result = session.exec(
            select(ScoreResult).where(ScoreResult.id == score_result_id)
        ).first()
        return score_result

    def predictions_to_list_score_result(
        self,
        predictions: list[tuple[str, np.float64, np.array]],
        cutoff_selection: float,
    ) -> list[ScoreResult]:
        score_results = []
        for prediction in predictions:
            resolution = "Churn" if prediction[1] >= cutoff_selection else "Stay"
            score_results.append(
                ScoreResult(
                    name=prediction[0],
                    score=float(prediction[1]),
                    resolution=resolution,
                    interpretation=str(prediction[2]),
                )
            )
        return score_results
