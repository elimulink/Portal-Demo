from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext
from passlib.exc import UnknownHashError
from data import get_student_by_username

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")
    if len(password_bytes) > 72:
        raise ValueError("password cannot be longer than 72 bytes")
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    if not hashed_password or not isinstance(hashed_password, str):
        return False
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except (ValueError, TypeError, UnknownHashError):
        return False

def authenticate_student(username: str, password: str):
    student = get_student_by_username(username)

    if not student:
        return None

    if not student.get("password"):
        return None

    if not verify_password(password, student["password"]):
        return None

    return student

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
