import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

from db import connect_db
from utils.seedAdmin import  seed_admin

from routes.user_routes import router as user_router
from routes.product_routes import router as product_router
from routes.category_routes import router as category_router
from routes.order_routes import router as order_router
from routes.upload_routes import router as upload_router

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")

if not JWT_SECRET:
    raise ValueError("JWT_SECRET is missing")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await connect_db()
    await seed_admin()

@app.get("/")
def root():
    return {"message": "API is running"}

@app.get("/health")
def health():
    return {
        "status": "OK",
        "message": "Server is running"
    }

app.include_router(user_router, prefix="/api/auth")
app.include_router(
    product_router,
    prefix="/api/products",
    tags=["Products"]
)
app.include_router(category_router, prefix="/api/categories")
app.include_router(order_router, prefix="/api/orders")
app.include_router(upload_router, prefix="/api/uploads")