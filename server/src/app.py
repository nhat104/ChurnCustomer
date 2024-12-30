from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

from utils.database import lifespan
from utils.errors import register_all_errors

from middleware import register_middleware


from auth.routes import auth_router
from ml_model.routes import ml_model_router
from score_history.routes import score_history_router
from score_result.routes import score_result_router

app = FastAPI(
    lifespan=lifespan,
    debug=False,
    contact={
        "name": "Mai Minh Nhật",
        "url": "https://github.com/nhat104",
        "email": "minhnhat1042001@gmail.com",
    },
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    custom_errors = []
    for error in errors:
        field = error["loc"][-1]
        message = error["msg"]
        custom_errors.append({field: message})
    return JSONResponse(
        status_code=422,
        content={
            "status_code": 422,
            "message": "Validation error",
            "detail": custom_errors,
        },
    )


register_all_errors(app)
register_middleware(app)

app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
app.include_router(ml_model_router, prefix="/api/model", tags=["ml_model"])
app.include_router(score_history_router, prefix="/api/score", tags=["score_history"])
app.include_router(
    score_result_router, prefix="/api/score-result", tags=["score_result"]
)
