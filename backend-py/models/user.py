from beanie import Document
from pydantic import EmailStr
from typing import Literal


class User(Document):
    role: Literal["customer", "admin"] = "customer"
    name: str
    email: EmailStr
    password: str

    class Settings:
        name = "users"