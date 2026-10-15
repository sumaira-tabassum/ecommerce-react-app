from fastapi import APIRouter, Body, Depends

from controllers.category_controller import (
    create_category,
    get_categories,
    update_category,
    delete_category
)

from middleware.admin_middleware import admin_only

router = APIRouter()


# CREATE
@router.post("/")
async def create(data: dict = Body(...), user=Depends(admin_only)):
    return await create_category(data)


# GET ALL
@router.get("/")
async def list_categories():
    return await get_categories()


# UPDATE
@router.put("/{category_id}")
async def update(
    category_id: str,
    data: dict = Body(...),
    user=Depends(admin_only)
):
    return await update_category(category_id, data)


# DELETE
@router.delete("/{category_id}")
async def remove(
    category_id: str,
    user=Depends(admin_only)
):
    return await delete_category(category_id)