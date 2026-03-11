from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Hash password once
hashed_password = pwd_context.hash("1234")

# Test student database
fake_student_db = {
    "joshua": {
        "username": "joshua",
        "full_name": "Joshua Ajode",
        "password": hashed_password
    }
}

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_student(username, password):
    student = fake_student_db.get(username)

    if not student:
        return None

    if not verify_password(password, student["password"]):
        return None

    return student

def create_access_token(data: dict):
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    data.update({"exp": expire})
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)