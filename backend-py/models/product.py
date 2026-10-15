from beanie import Document, PydanticObjectId
from typing import Optional


class Product(Document):
    sku: str
    name: str
    price: float
    description: str

    category: PydanticObjectId   
    image: str
    quantity: int = 0

    class Settings:
        name = "products"