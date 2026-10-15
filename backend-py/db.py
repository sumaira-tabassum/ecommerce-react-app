import os
import sys
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie

from models.user import User
from models.product import Product
from models.category import Category
from models.order import Order


client = None
db = None


async def connect_db():
    global client, db

    try:
        MONGO_URI = os.getenv("MONGO_URI")

        if not MONGO_URI:
            raise Exception("MONGO_URI not found")

        # Create motor client
        client = AsyncIOMotorClient(MONGO_URI)

        # FORCE DB NAME (no default DB usage at all)
        db = client.get_database("test")

        # DEBUG CHECK (important)
        print("DB NAME:", db.name)

        # Beanie init
        await init_beanie(
            database=db,
            document_models=[User, Product, Category, Order]
        )

        print("MongoDB + Beanie connected successfully")

    except Exception as e:
        print("DB connection failed:", e)
        sys.exit(1)