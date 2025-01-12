from sqlmodel import select

from utils.database import SessionDep
from utils.models import User

from .schemas import UserUpdate


class UserService:
    def get_user_by_username(self, username: str, session: SessionDep):
        statement = select(User).where(User.username == username)
        result = session.exec(statement)
        user = result.first()
        return user

    def get_user_by_email(self, email: str, session: SessionDep):
        statement = select(User).where(User.email == email)
        result = session.exec(statement)
        user = result.first()
        return user

    def user_exists(self, email: str, session: SessionDep):
        user = self.get_user_by_email(email, session)
        return user is not None

    def update_user(self, email: str, user_data: UserUpdate, session: SessionDep):
        user = self.get_user_by_email(email, session)
        for field, value in user_data.model_dump(exclude_unset=True).items():
            setattr(user, field, value)
        session.add(user)
        session.commit()
        session.refresh(user)
        return user
