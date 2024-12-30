from fastapi import Depends

from utils.database import SessionDep
from utils.errors import ScoreResultNotFound
from utils.custom_api import CustomAPIRouter, APIResponse
from auth.dependencies import AccessTokenBearer

from .schemas import ScoreResultPublicWithInterpretation

from .service import ScoreResultService

score_result_router = CustomAPIRouter()
score_result_service = ScoreResultService()
access_token_bearer = AccessTokenBearer()


@score_result_router.get(
    "/{score_result_id}",
    response_model=APIResponse[ScoreResultPublicWithInterpretation],
)
def read_score_result(
    score_result_id: int,
    session: SessionDep,
    _: dict = Depends(access_token_bearer),
):
    score_result = score_result_service.get_score_result(score_result_id, session)
    if not score_result:
        raise ScoreResultNotFound

    return APIResponse(data=score_result)
