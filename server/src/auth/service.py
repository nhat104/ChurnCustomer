from sqlmodel import select

from utils.database import SessionDep
from utils.models import User
from .schemas import UserCreate
from .utils import generate_password_hash


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

    def user_exists(self, username: str, session: SessionDep):
        user = self.get_user_by_username(username, session)
        return user is not None

    def create_user(self, user_data: UserCreate, session: SessionDep):
        # user_data_dict = user_data.model_dump()
        # new_user = User(**user_data_dict)
        # new_user.password_hash = generate_passwd_hash(user_data_dict["password"])
        db_user = User.model_validate(user_data)
        db_user.password = generate_password_hash(user_data.password)

        session.add(db_user)
        session.commit()
        session.refresh(db_user)

        return db_user
