from pydantic import BaseModel
from typing import List, Optional


class OrderItemSchema(BaseModel):
    product: str
    quantity: int


class BillingInfoSchema(BaseModel):
    name: str
    email: str
    phone: str
    country: str
    state: str
    city: str
    zipcode: Optional[str] = None
    address: str
    note: Optional[str] = None


class ShippingInfoSchema(BaseModel):
    name: str
    email: str
    phone: str
    country: str
    state: str
    city: str
    zipcode: Optional[str] = None
    address: str
    note: Optional[str] = None


class OrderCreateSchema(BaseModel):
    user: Optional[str] = None
    billingInfo: Optional[BillingInfoSchema] = None
    shippingInfo: Optional[ShippingInfoSchema] = None
    sameAsBilling: bool = False
    orderItems: List[OrderItemSchema]


class OrderStatusUpdateSchema(BaseModel):
    status: str