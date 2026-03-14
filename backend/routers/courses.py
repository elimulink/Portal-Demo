from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from data import get_student_courses

router = APIRouter()

# Pydantic model for Course
class Course(BaseModel):
    id: int
    name: str
    instructor: str
    progress: float  # 0 to 100

@router.get("/", response_model=List[Course])
def get_courses():
    return get_student_courses()
