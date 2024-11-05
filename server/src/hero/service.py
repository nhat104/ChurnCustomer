from sqlmodel import select

from utils.models import Hero
from utils.database import SessionDep
from .schema import HeroCreate, HeroUpdate


class HeroService:
    def get_all_heroes(self, session: SessionDep, offset: int = 0, limit: int = 100):
        statement = select(Hero).offset(offset).limit(limit)
        result = session.exec(statement).all()
        return result

    def get_hero(self, hero_id: int, session: SessionDep):
        hero = session.get(Hero, hero_id)
        return hero

    def create_hero(self, hero: HeroCreate, session: SessionDep):
        db_hero = Hero.model_validate(hero)
        session.add(db_hero)
        session.commit()
        session.refresh(db_hero)
        return db_hero

    def update_hero(self, hero_id: int, hero: HeroUpdate, session: SessionDep):
        db_hero = self.get_hero(hero_id, session)
        if not db_hero:
            return None
        hero_data = hero.model_dump(exclude_unset=True)
        for key, value in hero_data.items():
            setattr(db_hero, key, value)
        session.add(db_hero)
        session.commit()
        session.refresh(db_hero)
        return db_hero

    def delete_hero(self, hero_id: int, session: SessionDep):
        hero = self.get_hero(hero_id, session)
        if not hero:
            return None
        session.delete(hero)
        session.commit()
        return {"ok": True}
