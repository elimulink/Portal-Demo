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
    student_id = _student_id(username)
    if student_id is None:
        return []

    enrollments = (
        get_supabase()
        .table("enrollments")
        .select("course_id, progress")
        .eq("student_id", student_id)
        .execute()
        .data
        or []
    )
    if not enrollments:
        return []

    course_ids = [row["course_id"] for row in enrollments if row.get("course_id") is not None]
    if not course_ids:
        return []

    courses = (
        get_supabase()
        .table("courses")
        .select("id, name, instructor")
        .in_("id", course_ids)
        .execute()
        .data
        or []
    )
    courses_by_id = {course["id"]: course for course in courses}

    results = []
    for enrollment in enrollments:
        course = courses_by_id.get(enrollment.get("course_id"))
        if not course:
            continue
        results.append(
            {
                "id": course["id"],
                "name": course.get("name", ""),
                "instructor": course.get("instructor", "TBA"),
                "progress": float(enrollment.get("progress") or 0),
            }
        )
    return results


def get_student_assignments(username: str = DEMO_USERNAME) -> list[dict[str, Any]]:
    student_id = _student_id(username)
    if student_id is None:
        return []

    assignments = (
        get_supabase()
        .table("assignments")
        .select("id, title, due_date, status")
        .eq("student_id", student_id)
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
    student_id = _student_id(username)
    if student_id is None:
        return []

    timetable_rows = (
        get_supabase()
        .table("timetable")
        .select("id, course_id, day, start_time, end_time, location")
        .eq("student_id", student_id)
        .execute()
        .data
        or []
    )
    if not timetable_rows:
        return []

    course_ids = [row["course_id"] for row in timetable_rows if row.get("course_id") is not None]
    courses_by_id = {}
    if course_ids:
        courses = (
            get_supabase()
            .table("courses")
            .select("id, name")
            .in_("id", course_ids)
            .execute()
            .data
            or []
        )
        courses_by_id = {course["id"]: course for course in courses}

    return [
        {
            "id": row["id"],
            "course_name": courses_by_id.get(row.get("course_id"), {}).get("name", "Unknown Course"),
            "day": row.get("day", ""),
            "start_time": row.get("start_time", ""),
            "end_time": row.get("end_time", ""),
            "location": row.get("location", ""),
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
