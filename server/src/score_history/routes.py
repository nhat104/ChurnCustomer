from typing import Annotated
from fastapi import Query, Depends

from utils.database import SessionDep
from utils.errors import ModelNotFound
from utils.custom_api import CustomAPIRouter, APIResponse
from auth.dependencies import AccessTokenBearer

from .schemas import (
    ScoreHistoryPublic,
    ScoreHistoryWithModel,
    ScoreHistoryPublicWithResult,
    ScoreHistoryUpdate,
)
from .service import ScoreHistoryService

score_history_router = CustomAPIRouter()
score_history_service = ScoreHistoryService()
access_token_bearer = AccessTokenBearer()


@score_history_router.get("", response_model=APIResponse[list[ScoreHistoryWithModel]])
def read_score_histories_by_user(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]
    score_histories = score_history_service.get_user_score_histories(
        user_id, session, offset=offset, limit=limit
    )
    return APIResponse(data=score_histories)


# read all score history, don't need to be authenticated
@score_history_router.get(
    "/all", response_model=APIResponse[list[ScoreHistoryWithModel]]
)
def read_all_score_histories(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
):
    score_histories = score_history_service.get_all_score_histories(
        session, offset=offset, limit=limit
    )
    return APIResponse(data=score_histories)


@score_history_router.get(
    "/{score_history_id}", response_model=APIResponse[ScoreHistoryPublicWithResult]
)
def read_score_history(
    score_history_id: int,
    session: SessionDep,
):
    score_history = score_history_service.get_score_history(score_history_id, session)
    if not score_history:
        raise ModelNotFound

    return APIResponse(data=score_history)


@score_history_router.patch(
    "/{score_history_id}", response_model=APIResponse[ScoreHistoryPublicWithResult]
)
def update_score_history(
    score_history_id: int,
    score_history: ScoreHistoryUpdate,
    session: SessionDep,
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]
    db_score_history = score_history_service.update_score_history(
        score_history_id, score_history, user_id, session
    )
    return APIResponse(data=db_score_history)


@score_history_router.get(
    "/model/{model_id}", response_model=APIResponse[list[ScoreHistoryPublic]]
)
def read_score_histories_by_ml_model_id(
    model_id: int,
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
    _: dict = Depends(access_token_bearer),
):
    score_histories = score_history_service.get_score_histories_by_ml_model_id(
        model_id, session, offset=offset, limit=limit
    )
    return APIResponse(data=score_histories)


@score_history_router.delete("/{score_history_id}", response_model=APIResponse)
def delete_score_history(
    score_history_id: int,
    session: SessionDep,
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]
    result = score_history_service.delete_score_history(
        score_history_id, user_id, session
    )
    if not result:
        raise ModelNotFound
    return APIResponse()
