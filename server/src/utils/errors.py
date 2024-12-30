from fastapi import FastAPI, status, Request, HTTPException
from fastapi.responses import JSONResponse
from typing import Any, Callable

HeroNotFound = HTTPException(status_code=404, detail="Hero not found")


class BaseException(Exception):
    """Base exception class for all custom exceptions"""

    pass


class InvalidToken(BaseException):
    """User has provided an invalid or expired token"""

    pass


class RevokedToken(BaseException):
    """User has provided a revoked token"""

    pass


class AccessTokenRequired(BaseException):
    """User has not provided an access token"""

    pass


class UserNotFound(BaseException):
    """User not found"""

    pass


class UserExists(BaseException):
    """User has already registered with the provided email"""

    pass


class InvalidCredentials(BaseException):
    """User has provided wrong username or password"""

    pass


class ModelNotFound(BaseException):
    """Model not found"""

    pass


class ScoreResultNotFound(BaseException):
    """Score result not found"""

    pass


def create_exception_handler(
    status_code: int, detail: Any
) -> Callable[[Request, Exception], HTTPException]:
    async def exception_handler(request: Request, exc: BaseException):
        return JSONResponse(content=detail, status_code=status_code)

    return exception_handler


def register_all_errors(app: FastAPI):
    app.add_exception_handler(
        UserExists,
        create_exception_handler(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "status_code": 403,
                "message": "User with email already exists",
                "error_code": "user_exists",
            },
        ),
    )

    app.add_exception_handler(
        UserNotFound,
        create_exception_handler(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "message": "User not found",
                "error_code": "user_not_found",
            },
        ),
    )
    app.add_exception_handler(
        InvalidCredentials,
        create_exception_handler(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                "message": "Invalid username or password",
                "error_code": "invalid_username_or_password",
            },
        ),
    )
    app.add_exception_handler(
        InvalidToken,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "Token is invalid or expired",
                "resolution": "Please get new token",
                "error_code": "invalid_token",
            },
        ),
    )
    app.add_exception_handler(
        RevokedToken,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "Token is invalid or has been revoked",
                "resolution": "Please get new token",
                "error_code": "token_revoked",
            },
        ),
    )
    app.add_exception_handler(
        AccessTokenRequired,
        create_exception_handler(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "message": "Please provide a valid access token",
                "resolution": "Please get an access token",
                "error_code": "access_token_required",
            },
        ),
    )
    app.add_exception_handler(
        ModelNotFound,
        create_exception_handler(
            status_code=status.HTTP_200_OK,
            detail={
                "status": 404,
                "message": "Model not found",
                "error_code": "model_not_found",
            },
        ),
    )
    app.add_exception_handler(
        ScoreResultNotFound,
        create_exception_handler(
            status_code=status.HTTP_200_OK,
            detail={
                "status": 404,
                "message": "Score result not found",
                "error_code": "score_result_not_found",
            },
        ),
    )

    @app.exception_handler(500)
    async def internal_server_error(request, exc):
        return JSONResponse(
            content={
                "message": "Oops! Something went wrong",
                "error_code": "server_error",
            },
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )
