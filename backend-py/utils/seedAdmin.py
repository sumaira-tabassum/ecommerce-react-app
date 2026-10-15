from models.user import User
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def seed_admin():
    admin_exists = await User.find_one(User.role == "admin")

    if admin_exists:
        print("Admin already exists")
        return

    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash("admin123")

    admin = User(
        name="Admin",
        email="admin@gmail.com",
        password=hashed_password,
        role="admin"
    )

    await admin.insert()

    print("Admin created successfully")