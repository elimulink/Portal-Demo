from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from data import get_dashboard_stats as fetch_dashboard_stats, get_student_assignments, get_student_courses

router = APIRouter()

# Pydantic models
class DashboardStats(BaseModel):
    total_courses: int
    completed_assignments: int
    pending_assignments: int
    fees_paid: float
    fees_due: float
    upcoming_classes: int
    unread_notifications: int

class CourseSummary(BaseModel):
    id: int
    name: str
    progress: float  # 0-100 %

class AssignmentSummary(BaseModel):
    id: int
    title: str
    due_date: str
    status: str  # "completed" or "pending"

@router.get("/", response_model=DashboardStats)
def get_dashboard_stats():
    return DashboardStats(**fetch_dashboard_stats())

@router.get("/courses", response_model=List[CourseSummary])
def get_courses_summary():
    courses = get_student_courses()
    return [{"id": course["id"], "name": course["name"], "progress": course["progress"]} for course in courses]

@router.get("/assignments", response_model=List[AssignmentSummary])
def get_assignments_summary():
    return get_student_assignments()
