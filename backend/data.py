import os
from typing import Any

from supabase_client import get_supabase

DEMO_USERNAME = os.getenv("DEMO_USERNAME", "joshua")


def _student_password(row: dict[str, Any]) -> str | None:
    return row.get("password_hash") or row.get("password")


def get_student_by_username(username: str) -> dict[str, Any] | None:
    response = (
        get_supabase()
        .table("students")
        .select("*")
        .eq("username", username)
        .limit(1)
        .execute()
    )
    if not response.data:
        return None

    student = response.data[0]
    return {
        "id": student.get("id"),
        "username": student.get("username"),
        "full_name": student.get("full_name") or student.get("name") or student.get("username"),
        "password": _student_password(student),
    }


def get_demo_student() -> dict[str, Any] | None:
    return get_student_by_username(DEMO_USERNAME)


def _student_id(username: str = DEMO_USERNAME) -> Any:
    student = get_student_by_username(username)
    if not student:
        return None
    return student.get("id")


def get_student_courses(username: str = DEMO_USERNAME) -> list[dict[str, Any]]:
    enrollments = (
        get_supabase()
        .table("enrollments")
        .select("course_code")
        .eq("student_userr", username)
        .execute()
        .data
        or []
    )
    if not enrollments:
        return []

    course_codes = [row["course_code"] for row in enrollments if row.get("course_code")]
    if not course_codes:
        return []

    courses = (
        get_supabase()
        .table("courses")
        .select("id, code, title, progress")
        .in_("code", course_codes)
        .execute()
        .data
        or []
    )
    courses_by_code = {course["code"]: course for course in courses if course.get("code")}

    results = []
    for enrollment in enrollments:
        course = courses_by_code.get(enrollment.get("course_code"))
        if not course:
            continue
        results.append(
            {
                "id": course["id"],
                "name": course.get("title") or course.get("code", ""),
                "instructor": course.get("code", "TBA"),
                "progress": float(course.get("progress") or 0),
            }
        )
    return results


def get_student_assignments(username: str = DEMO_USERNAME) -> list[dict[str, Any]]:
    assignments = (
        get_supabase()
        .table("assignments")
        .select("id, title, due_date, status")
        .eq("student_userr", username)
        .execute()
        .data
        or []
    )
    return [
        {
            "id": assignment["id"],
            "title": assignment.get("title", ""),
            "due_date": assignment.get("due_date", ""),
            "status": assignment.get("status", "pending"),
        }
        for assignment in assignments
    ]


def get_student_timetable(username: str = DEMO_USERNAME) -> list[dict[str, Any]]:
    timetable_rows = (
        get_supabase()
        .table("timetable")
        .select("id, day, subject, time_slot")
        .eq("student_userr", username)
        .execute()
        .data
        or []
    )
    if not timetable_rows:
        return []

    return [
        {
            "id": row["id"],
            "course_name": row.get("subject", ""),
            "day": row.get("day", ""),
            "start_time": row.get("time_slot", ""),
            "end_time": "",
            "location": "",
        }
        for row in timetable_rows
    ]


def get_dashboard_stats(username: str = DEMO_USERNAME) -> dict[str, Any]:
    courses = get_student_courses(username)
    assignments = get_student_assignments(username)
    timetable = get_student_timetable(username)

    return {
        "total_courses": len(courses),
        "completed_assignments": len([item for item in assignments if item.get("status") == "completed"]),
        "pending_assignments": len([item for item in assignments if item.get("status") == "pending"]),
        "fees_paid": 0.0,
        "fees_due": 0.0,
        "upcoming_classes": len(timetable),
        "unread_notifications": 0,
    }
