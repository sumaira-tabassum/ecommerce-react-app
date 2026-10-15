from fastapi import HTTPException, Depends
from middleware.auth_middleware import auth


async def admin_only(user=Depends(auth)):
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=403,
            detail="Admin only access"
        )

    return user