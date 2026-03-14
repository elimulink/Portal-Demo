from datetime import datetime, timedelta
from jose import jwt
from passlib.context import CryptContext

SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Demo bcrypt hashes are stored as constants so app startup never hashes
# arbitrary values such as long secrets loaded from the environment.
DEMO_PASSWORD_HASHES = {
    "joshua": "$2b$12$x.RP0czJlgEwMFqML2zu9uTc3FmOUDa1KP.RBkDElkepiF3mJmP.y",
}

fake_student_db = {
    "joshua": {
        "username": "joshua",
        "full_name": "Joshua Ajode",
        "password": DEMO_PASSWORD_HASHES["joshua"],
    }
}

def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")
    if len(password_bytes) > 72:
        raise ValueError("password cannot be longer than 72 bytes")
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def authenticate_student(username: str, password: str):
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
