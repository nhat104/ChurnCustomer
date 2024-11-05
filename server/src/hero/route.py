from typing import Annotated
from fastapi import APIRouter, Query, Depends, status

from utils.database import SessionDep
from utils.errors import HeroNotFound

from auth.dependencies import AccessTokenBearer
from .schema import HeroCreate, HeroPublic, HeroUpdate
from .service import HeroService

hero_router = APIRouter()
hero_service = HeroService()
access_token_bearer = AccessTokenBearer()


@hero_router.post("/", response_model=HeroPublic, status_code=status.HTTP_201_CREATED)
def create_hero(
    hero: HeroCreate,
    session: SessionDep,
    _: dict = Depends(access_token_bearer),
):
    db_hero = hero_service.create_hero(hero, session)
    return db_hero


@hero_router.get("/", response_model=list[HeroPublic])
def read_heroes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
    _: dict = Depends(access_token_bearer),
):
    heroes = hero_service.get_all_heroes(session, offset=offset, limit=limit)
    return heroes


@hero_router.get("/{hero_id}", response_model=HeroPublic)
def read_hero(
    hero_id: int,
    session: SessionDep,
    _: dict = Depends(access_token_bearer),
):
    hero = hero_service.get_hero(hero_id, session)
    if not hero:
        raise HeroNotFound
    return hero


@hero_router.patch("/{hero_id}", response_model=HeroPublic)
def update_hero(
    hero_id: int,
    hero: HeroUpdate,
    session: SessionDep,
    _: dict = Depends(access_token_bearer),
):
    db_hero = hero_service.update_hero(hero_id, hero, session)
    if not db_hero:
        raise HeroNotFound

    return db_hero


@hero_router.delete("/{hero_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_hero(
    hero_id: int,
    session: SessionDep,
    _: dict = Depends(access_token_bearer),
):
    hero = hero_service.delete_hero(hero_id, session)
    if not hero:
        raise HeroNotFound
    return {"ok": True}
