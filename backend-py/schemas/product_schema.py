from pydantic import BaseModel
from typing import Optional


class ProductCreateSchema(BaseModel):
    sku: str
    name: str
    price: float
    description: Optional[str] = ""
    category: str
    image: Optional[str] = ""
    quantity: Optional[int] = 0


class ProductUpdateSchema(BaseModel):
    sku: Optional[str] = None
    name: Optional[str] = None
    price: Optional[float] = None
    description: Optional[str] = None
    category: Optional[str] = None
    image: Optional[str] = None
    quantity: Optional[int] = None