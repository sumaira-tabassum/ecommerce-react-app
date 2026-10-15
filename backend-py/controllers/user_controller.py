import os
import jwt

from datetime import datetime, timedelta
from passlib.context import CryptContext
from fastapi import HTTPException

from models.user import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
JWT_SECRET = os.getenv("JWT_SECRET")


async def sign_up(data):

    name = data.name
    email = data.email
    password = data.password

    if not name or not email or not password:
        raise HTTPException(status_code=400, detail="All fields are required")

    existing_user = await User.find_one(User.email == email)

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(password)

    new_user = User(
        name=name,
        email=email,
        password=hashed_password,
        role="customer"
    )

    await new_user.insert()

    return {
        "message": "New user created successfully!",
        "newUser": {
            "id": str(new_user.id),
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }
    }



async def log_in(data):

    email = data.email
    password = data.password

    if not email or not password:
        raise HTTPException(status_code=400, detail="Both fields required")

    user = await User.find_one(User.email == email)

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    is_match = pwd_context.verify(password, user.password)

    if not is_match:
        raise HTTPException(status_code=400, detail="Invalid password")

    token = jwt.encode(
        {
            "id": str(user.id),
            "role": user.role,
            "exp": datetime.utcnow() + timedelta(days=1)
        },
        JWT_SECRET,
        algorithm="HS256"
    )

    return {
        "message": "Login successful",
        "token": token
    }



async def get_me(user_data):

    user = await User.get(user_data["id"])

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": str(user.id),
        "name": user.name,
        "email": user.email,
        "role": user.role
    }