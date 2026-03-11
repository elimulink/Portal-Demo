from fastapi import APIRouter, HTTPException
from models import LoginRequest, Token
from auth import authenticate_student, create_access_token

router = APIRouter()

@router.post("/login", response_model=Token)
def login(student: LoginRequest):

    user = authenticate_student(student.username, student.password)

    if not user:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    token = create_access_token({"sub": user["username"]})

    return {
        "access_token": token,
        "token_type": "bearer"
    }