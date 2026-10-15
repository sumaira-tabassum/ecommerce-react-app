from beanie import Document, PydanticObjectId
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class OrderItem(BaseModel):
    product: PydanticObjectId
    quantity: int
    price: Optional[float] = None

class AddressInfo(BaseModel):
    name: str
    email: str
    phone: str
    country: str
    state: str
    city: str
    zipcode: Optional[str] = None
    address: str
    note: Optional[str] = None

class Order(Document):
    orderNumber: str
    user: Optional[PydanticObjectId] = None

    billingInfo: dict   # 
    shippingInfo: dict  # 

    orderItems: List[dict] 

    totalPrice: float
    shippingFee: float = 250
    status: str = "pending"

    createdAt: datetime = datetime.utcnow()
    updatedAt: datetime = datetime.utcnow()

    class Settings:
        name = "orders"