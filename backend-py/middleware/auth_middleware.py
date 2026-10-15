from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os

security = HTTPBearer()


def auth(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials

    if not token:
        raise HTTPException(status_code=401, detail="No token provided")

    try:
        decoded = jwt.decode(
            token,
            os.getenv("JWT_SECRET"),
            algorithms=["HS256"]
        )
        return decoded

    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")

    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")