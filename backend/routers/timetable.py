from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from data import get_student_timetable

router = APIRouter()

class TimetableEntry(BaseModel):
    id: int
    course_name: str
    day: str
    start_time: str
    end_time: str
    location: str

@router.get("/", response_model=List[TimetableEntry])
def get_timetable():
    return get_student_timetable()
