from fastapi import HTTPException
from models.category import Category


async def create_category(data):

    name = data.get("name") if isinstance(data, dict) else data.name

    if not name:
        raise HTTPException(status_code=400, detail="Name is required")

    existing = await Category.find_one(Category.name == name)

    if existing:
        raise HTTPException(status_code=400, detail="Category already exists")

    new_category = Category(name=name)
    await new_category.insert()

    return {
        "message": "Category created successfully",
        "category": new_category
    }


async def get_categories():
    return await Category.find_all().to_list()



async def update_category(category_id: str, data):

    category = await Category.get(category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    name = data.get("name") if isinstance(data, dict) else data.name

    if name:
        category.name = name

    await category.save()

    return {
        "message": "Category updated successfully",
        "category": category
    }


async def delete_category(category_id: str):

    category = await Category.get(category_id)

    if not category:
        raise HTTPException(status_code=404, detail="Category not found")

    await category.delete()

    return {
        "message": "Category deleted successfully"
    }