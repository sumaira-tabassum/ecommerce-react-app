from fastapi import APIRouter, Depends
from controllers.user_controller import sign_up, log_in, get_me as get_me_controller
from middleware.auth_middleware import auth
from schemas.user_schema import SignUpSchema, LoginSchema

router = APIRouter()


@router.post("/signup")
async def signup_route(data: SignUpSchema):
    return await sign_up(data)


@router.post("/login")
async def login_route(data: LoginSchema):
    return await log_in(data)


@router.get("/me")
async def me_route(user = Depends(auth)):
    return await get_me_controller(user)