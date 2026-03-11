from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Pydantic model for Course
class Course(BaseModel):
    id: int
    name: str
    instructor: str
    progress: float  # 0 to 100

# Sample in-memory data
courses_data = [
    {"id": 1, "name": "ICT Policy", "instructor": "Dr. John Doe", "progress": 90},
    {"id": 2, "name": "Database Systems", "instructor": "Prof. Jane Smith", "progress": 40},
]

@router.get("/", response_model=List[Course])
def get_courses():
    return courses_data