from typing import List, Dict, Any, Callable, Generic, TypeVar
from pydantic import BaseModel
from fastapi import APIRouter


class ValidationErrorResponse(BaseModel):
    status_code: int
    message: str
    detail: List[Dict[str, Any]]

    class Config:
        json_schema_extra = {
            "example": {
                "status_code": 422,
                "message": "Validation error",
                "detail": [
                    {"field": "Field required."},
                ],
            }
        }


class CustomAPIRouter(APIRouter):
    def add_api_route(self, path: str, endpoint: Callable, **kwargs):
        # Ensure the responses dictionary exists
        responses = kwargs.get("responses", {}) or {}
        # Add the validation error response
        responses[422] = {
            "model": ValidationErrorResponse,
            "description": "Validation Error",
        }
        kwargs["responses"] = responses
        # Call the superclass's method with updated kwargs
        super().add_api_route(path, endpoint, **kwargs)


# Define a type variable
T = TypeVar("T")


class APIResponse(BaseModel, Generic[T]):
    status_code: int = 200
    message: str = "Successfully"
    data: T | list[T] = None
