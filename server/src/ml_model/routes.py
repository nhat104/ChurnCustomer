import os
import numpy as np

from datetime import datetime
from typing import Annotated
from fastapi import Query, Depends, status, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse

from utils.database import SessionDep
from utils.errors import ModelNotFound
from utils.custom_api import CustomAPIRouter, APIResponse
from auth.dependencies import AccessTokenBearer
from file.file import FileHandler

from score_history.schemas import ScoreHistoryPublic
from score_history.service import ScoreHistoryService
from score_result.service import ScoreResultService

from .schemas import MLModelPublic, MLModelPublicWithAttributes, MLModelUpdate
from .service import MLModelService

ml_model_router = CustomAPIRouter()
ml_model_service = MLModelService()
score_history_service = ScoreHistoryService()
score_result_service = ScoreResultService()
access_token_bearer = AccessTokenBearer()


@ml_model_router.get("", response_model=APIResponse[list[MLModelPublic]])
def read_models_by_user(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]
    models = ml_model_service.get_user_models(
        user_id, session, offset=offset, limit=limit
    )
    return APIResponse(data=models)


@ml_model_router.post(
    "/upload_data",
    status_code=status.HTTP_201_CREATED,
    response_model=APIResponse[MLModelPublic],
)
async def upload_data_to_build_model(
    session: SessionDep,
    data_file: UploadFile = File(...),
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]

    # validate with FileHandler
    file_handler = FileHandler(data_file)
    file_handler.validate_table_file()

    file_name = file_handler.split_file_name()[0]
    name = ml_model_service.isFilenameExist(file_name, user_id, session)

    file_path = file_handler.save_model_file_with_user_id(user_id)

    status, gini_index, attributes = ml_model_service.build_ml_model(
        file_path=file_path, test_size=0.3
    )

    new_model = {
        "name": name,
        "filename": data_file.filename,
        "status": status,
        "predictive_power": gini_index,
        "user_id": user_id,
        "attributes": attributes,
    }
    db_model = ml_model_service.create_model_by_user(new_model, session)
    return APIResponse(status_code=201, data=db_model)


@ml_model_router.post(
    "/{model_id}/rebuild",
    status_code=status.HTTP_200_OK,
    response_model=APIResponse[MLModelPublicWithAttributes],
)
def rebuild_model(
    session: SessionDep,
    model_id: int,
    test_size: float = Query(0.3, ge=0, le=1.0),
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]

    file_path = ml_model_service.get_file_path(model_id, user_id, session)

    status, gini_index, attributes = ml_model_service.build_ml_model(
        file_path=file_path, test_size=test_size
    )

    rebuild_model = {
        # "name": model.name,
        # "filename": filename,
        "status": status,
        "predictive_power": gini_index,
        # "user_id": user_id,
        "attributes": attributes,
    }
    db_model = ml_model_service.update_model(
        model_id, MLModelUpdate(**rebuild_model), user_id, session
    )
    return APIResponse(data=db_model)


@ml_model_router.get(
    "/{model_id}",
    response_model=APIResponse[MLModelPublicWithAttributes],
)
def read_model(
    model_id: int,
    session: SessionDep,
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]
    model = ml_model_service.get_model(model_id, user_id, session)
    if not model:
        raise ModelNotFound
    return APIResponse(data=model)


@ml_model_router.post(
    "/{model_id}/predict",
    response_model=APIResponse[ScoreHistoryPublic],
)
async def upload_data_to_predict(
    model_id: int,
    session: SessionDep,
    data_file: UploadFile = File(...),
    cutoff_selection: str = Form("0.5"),
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]

    cutoff_selection = float(cutoff_selection)

    model = ml_model_service.get_model(model_id, user_id, session)
    if not model:
        raise ModelNotFound

    # validate with FileHandler
    file_handler = FileHandler(data_file)
    file_handler.validate_table_file()
    # file_handler = FileHandler(data_file)
    # file_handler.validate_table_file()

    # file_name, file_extension = file_handler.split_file_name()
    # name = ml_model_service.isFilenameExist(file_name, user_id, session)

    # file_path = file_handler.save_model_file_with_user_id(user_id)

    # status, gini_index, attributes = ml_model_service.build_ml_model(
    #     file_path=file_path, file_ext=file_extension, test_size=0.3
    # )

    model_path = ml_model_service.get_model_path(model_id, user_id, session)
    predict_path = file_handler.save_predict_file_with_model_path(model_path=model_path)

    predictions = ml_model_service.predict_with_model(model_path, predict_path)
    score_results = score_result_service.predictions_to_list_score_result(
        predictions, cutoff_selection
    )
    filename = data_file.filename.split(".")[0]

    no_exit = int(
        np.sum([1 for _, score, _ in predictions if score >= cutoff_selection])
    )
    score_history_dict = {
        "name": filename,
        "ml_model_id": model_id,
        "number_exit": no_exit,
        "number_stay": len(predictions) - no_exit,
        "file_path": predict_path,
        "cutoff_selection": cutoff_selection,
        "status": "Finished",
        "score_results": score_results,
    }
    score_history = score_history_service.create_score_history_with_ml_model_id(
        score_history_dict, session
    )

    ml_model = ml_model_service.get_model(model_id, user_id, session)
    calculation = ml_model.calculation + 1
    ml_model_service.update_model(
        model_id,
        MLModelUpdate(calculation=calculation, last_score_time=datetime.now()),
        user_id,
        session,
    )

    return APIResponse(data=score_history)


@ml_model_router.patch("/{model_id}", response_model=APIResponse[MLModelPublic])
def update_model(
    model_id: int,
    model: MLModelUpdate,
    session: SessionDep,
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]
    db_model = ml_model_service.update_model(model_id, model, user_id, session)
    if not db_model:
        raise ModelNotFound

    return APIResponse(data=db_model)


@ml_model_router.delete("/{model_id}", response_model=APIResponse)
def delete_model(
    model_id: int,
    session: SessionDep,
    token: dict = Depends(access_token_bearer),
):
    user_id = token["user"]["id"]
    result = ml_model_service.delete_model(model_id, user_id, session)
    if not result:
        raise ModelNotFound

    return APIResponse()


@ml_model_router.get("/export/{model_id}")
def export_model(
    model_id: int, session: SessionDep, token: dict = Depends(access_token_bearer)
):
    user_id = token["user"]["id"]
    model = ml_model_service.get_model(model_id, user_id, session)
    if not model:
        raise ModelNotFound

    model_path = "models/forest_reg.joblib"

    return FileResponse(model_path, filename=model.name + ".joblib")
