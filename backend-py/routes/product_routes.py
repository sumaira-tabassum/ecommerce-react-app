from fastapi import APIRouter, Depends, Query

from controllers.product_controller import (
    get_products,
    get_product_by_id,
    create_product,
    delete_product,
    update_product
)

from middleware.auth_middleware import auth
from middleware.admin_middleware import admin_only

from schemas.product_schema import (
    ProductCreateSchema,
    ProductUpdateSchema
)

router = APIRouter()


# GET ALL PRODUCTS
@router.get("/")
async def get_all_products(
    category: str = Query(None)
):
    return await get_products(category)


# GET PRODUCT BY ID
@router.get("/{product_id}")
async def single_product(product_id: str):
    return await get_product_by_id(product_id)



@router.post("/")
async def create_new_product(
    data: ProductCreateSchema,
    user=Depends(admin_only)
):
    return await create_product(data)


# DELETE PRODUCT
@router.delete("/{product_id}")
async def remove_product(
    product_id: str,
    user=Depends(auth)
):
    admin_only(user)

    return await delete_product(product_id)


# UPDATE PRODUCT
@router.put("/{product_id}")
async def edit_product(
    product_id: str,
    data: ProductUpdateSchema,
    user=Depends(auth)
):
    admin_only(user)

    return await update_product(product_id, data)