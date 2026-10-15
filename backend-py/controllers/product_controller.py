from models.product import Product
from models.category import Category
from fastapi import HTTPException
from beanie.operators import RegEx


# GET ALL PRODUCTS
async def get_products(category: str = None):

    filter_query = {}

    if category:
        category_doc = await Category.find_one(
            RegEx(Category.name, category, "i")
        )

        if not category_doc:
            return []

        filter_query["category"] = category_doc.id

    products = await Product.find(filter_query).to_list()

    return products


# GET PRODUCT BY ID
async def get_product_by_id(product_id: str):

    product = await Product.get(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    return product


# CREATE PRODUCT
async def create_product(data):

    product_data = data.dict()

    # optional validation (already mostly handled by schema)
    if not product_data.get("name") or not product_data.get("price"):
        raise HTTPException(
            status_code=400,
            detail="Name and price for product is required."
        )

    new_product = Product(**product_data)
    await new_product.insert()

    return new_product


# DELETE PRODUCT
async def delete_product(product_id: str):

    product = await Product.get(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    await product.delete()

    return {"message": "Product deleted successfully!"}


# UPDATE PRODUCT
async def update_product(product_id: str, data):

    product = await Product.get(product_id)

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    update_data = data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(product, key, value)

    await product.save()

    return product