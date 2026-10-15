from fastapi import APIRouter
from fastapi.responses import JSONResponse

from controllers.order_controller import (
    create_order,
    get_orders,
    update_order_status,
)
from schemas.order_schema import OrderCreateSchema, OrderStatusUpdateSchema

router = APIRouter()


@router.post("/")
async def create_new_order(data: OrderCreateSchema):
    try:
        result = await create_order(data)
        return JSONResponse(status_code=201, content=result)
    except Exception as e:
        import traceback
        print("ORDER CREATE ERROR:", e)
        traceback.print_exc()
        raise e


@router.get("/")
async def fetch_orders():
    return await get_orders()


@router.put("/{order_id}")
async def change_order_status(order_id: str, data: OrderStatusUpdateSchema):
    return await update_order_status(order_id, data.status)
