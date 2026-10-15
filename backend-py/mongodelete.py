# Dev utility: deletes every order in the database. Reads MONGO_URI from .env.
import asyncio
import os

from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

load_dotenv()


async def main():
    client = AsyncIOMotorClient(os.getenv("MONGO_URI"))
    db = client.get_database("test")
    result = await db.orders.delete_many({})
    print(f"deleted {result.deleted_count} orders")


asyncio.run(main())
