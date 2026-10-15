import logging
import random
from datetime import datetime

from beanie import PydanticObjectId
from fastapi import HTTPException

from models.order import Order, OrderItem
from models.product import Product
from models.user import User
from utils.send_order_email import send_order_email

logger = logging.getLogger(__name__)

ALLOWED_STATUSES = ["pending", "processing", "in transit", "delivered", "cancelled"]


def generate_order_number() -> str:
    chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
    return "#" + "".join(random.choice(chars) for _ in range(6))


def _serialize_product(product: Product) -> dict:
    data = product.model_dump()
    data["_id"] = str(product.id)
    data.pop("id", None)
    return data


def _serialize_user(user: User) -> dict:
    data = user.model_dump()
    data["_id"] = str(user.id)
    data.pop("id", None)
    return data


async def _serialize_order(order: Order, *, populate: bool = False) -> dict:
    billing = (
        order.billingInfo.model_dump()
        if hasattr(order.billingInfo, "model_dump")
        else order.billingInfo
    )
    shipping = (
        order.shippingInfo.model_dump()
        if hasattr(order.shippingInfo, "model_dump")
        else order.shippingInfo
    )

    order_items = []
    for item in order.orderItems:
        entry = {
            "product": str(item.product),
            "quantity": item.quantity,
        }
        if populate:
            product = await Product.get(item.product)
            if product:
                entry["product"] = _serialize_product(product)
        order_items.append(entry)

    payload = {
        "_id": str(order.id),
        "orderNumber": order.orderNumber,
        "user": str(order.user) if order.user else None,
        "billingInfo": billing,
        "shippingInfo": shipping,
        "orderItems": order_items,
        "totalPrice": order.totalPrice,
        "shippingFee": order.shippingFee,
        "status": order.status,
        "createdAt": order.createdAt.isoformat() if order.createdAt else None,
        "updatedAt": order.updatedAt.isoformat() if order.updatedAt else None,
    }

    if populate and order.user:
        user = await User.get(order.user)
        payload["user"] = _serialize_user(user) if user else None

    return payload


async def create_order(data):
    if not data.user and not data.billingInfo:
        raise HTTPException(status_code=400, detail="User/Billing info is required")

    if not data.orderItems or len(data.orderItems) < 1:
        raise HTTPException(
            status_code=400, detail="Order should contain at least one item."
        )

    processed_items = []
    total_price = 0
    shipping_fee = 250

    for item in data.orderItems:
        try:
            product = await Product.get(PydanticObjectId(item["product"]))
        except Exception:
            product = None

        if not product:
            raise HTTPException(status_code=400, detail="Product not found!")

        if item.quantity > product.quantity:
            raise HTTPException(
                status_code=400, detail="Not enough stock available."
            )

        product.quantity -= item.quantity
        await product.save()

        total_price += product.price * item.quantity

        processed_items.append({
            "product": product.id,
            "quantity": item.quantity,
            "price": product.price
        })

    total_price += shipping_fee

    shipping_info = (
        data.billingInfo
        if data.sameAsBilling
        else data.shippingInfo
    )

    user_id = None
    if data.user:
        try:
            user_id = PydanticObjectId(data.user)
        except Exception:
            user_id = None

    order = Order(
        orderNumber=generate_order_number(),
        user=None,
        billingInfo=data.billingInfo.model_dump(),  
        shippingInfo=(data.shippingInfo.model_dump() if not data.sameAsBilling else data.billingInfo.model_dump()),
        orderItems=[item.model_dump() for item in data.orderItems],  # ALSO FIX THIS
        totalPrice=total_price,
        shippingFee=shipping_fee,
        status="pending"
    )

    await order.insert()

    # email_sent = False
    populated_items = []
    for item in order.orderItems:
        product = await Product.get(PydanticObjectId(item["product"]))
        populated_items.append(
            {
                "product": _serialize_product(product) if product else None,
                "quantity": item.quantity,
            }
        )

    try:
        await send_order_email(
            to_email=data.billingInfo.email,
            customer_name=data.billingInfo.name,
            order_number=order.orderNumber,
            order_date=order.createdAt,
            total_price=order.totalPrice,
            shipping_fee=order.shippingFee,
            billing=data.billingInfo,
            shipping=shipping_info,
            items=populated_items,
        )
        email_sent = True
    except Exception as email_error:
        logger.error(
            "EMAIL SEND ERROR FULL: %s",
            {
                "message": str(email_error),
                "type": type(email_error).__name__,
            },
        )
        email_sent = False
    new_order = await _serialize_order(order, populate=False)

    return {
        "message": "Order created successfully!",
        "newOrder": new_order,
        "emailSent": email_sent,
    }


async def get_orders():
    orders = await Order.find_all().to_list()

    print("RAW ORDERS FROM DB:", len(orders))

    return [o.model_dump() for o in orders]


async def update_order_status(order_id: str, status: str):
    if status not in ALLOWED_STATUSES:
        raise HTTPException(status_code=400, detail="Invalid order status.")

    try:
        order = await Order.get(PydanticObjectId(order_id))
    except Exception:
        order = None

    if not order:
        raise HTTPException(status_code=404, detail="Order not found!")

    order.status = status
    order.updatedAt = datetime.utcnow()
    await order.save()

    return {
        "message": "Order status updated successfully!",
        "order": await _serialize_order(order, populate=False),
    }
