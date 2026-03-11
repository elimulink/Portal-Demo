from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class TimetableEntry(BaseModel):
    id: int
    course_name: str
    day: str
    start_time: str
    end_time: str
    location: str

# Sample timetable data
timetable_data = [
    {"id": 1, "course_name": "ICT Policy", "day": "Monday", "start_time": "09:00", "end_time": "10:30", "location": "Room 101"},
    {"id": 2, "course_name": "Database Systems", "day": "Monday", "start_time": "11:00", "end_time": "12:30", "location": "Room 102"},
    {"id": 3, "course_name": "Networking Basics", "day": "Tuesday", "start_time": "09:00", "end_time": "10:30", "location": "Room 101"},
    {"id": 4, "course_name": "Operating Systems", "day": "Wednesday", "start_time": "13:00", "end_time": "14:30", "location": "Room 103"},
]

@router.get("/", response_model=List[TimetableEntry])
def get_timetable():
    return timetable_data