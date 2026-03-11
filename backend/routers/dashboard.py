from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

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

# Sample data
courses_data = [
    {"id": 1, "name": "ICT Policy", "progress": 75},
    {"id": 2, "name": "Database Systems", "progress": 40},
    {"id": 3, "name": "Networking Basics", "progress": 100},
]

assignments_data = [
    {"id": 1, "title": "ICT Assignment 1", "due_date": "2026-03-10", "status": "completed"},
    {"id": 2, "title": "Database Assignment 1", "due_date": "2026-03-12", "status": "pending"},
]

# Dashboard endpoint
@router.get("/", response_model=DashboardStats)
def get_dashboard_stats():
    total_courses = len(courses_data)
    completed_assignments = len([a for a in assignments_data if a["status"] == "completed"])
    pending_assignments = len([a for a in assignments_data if a["status"] == "pending"])
    
    fees_paid = 5000.0
    fees_due = 2000.0
    upcoming_classes = 3
    unread_notifications = 2

    return DashboardStats(
        total_courses=total_courses,
        completed_assignments=completed_assignments,
        pending_assignments=pending_assignments,
        fees_paid=fees_paid,
        fees_due=fees_due,
        upcoming_classes=upcoming_classes,
        unread_notifications=unread_notifications
    )

# Optional endpoints for details
@router.get("/courses", response_model=List[CourseSummary])
def get_courses_summary():
    return courses_data

@router.get("/assignments", response_model=List[AssignmentSummary])
def get_assignments_summary():
    return assignments_data