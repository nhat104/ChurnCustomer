from fastapi import FastAPI

from utils.database import lifespan
from middleware import register_middleware
from utils.errors import register_all_errors

from hero.route import hero_router
from auth.route import auth_router

app = FastAPI(
    lifespan=lifespan,
    debug=False,
    contact={
        "name": "Mai Minh Nhật",
        "url": "https://github.com/nhat104",
        "email": "minhnhat1042001@gmail.com",
    },
)
register_all_errors(app)
register_middleware(app)

app.include_router(hero_router, prefix="/hero", tags=["heroes"])
app.include_router(auth_router, prefix="/auth", tags=["auth"])
