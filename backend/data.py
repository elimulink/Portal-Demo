from auth import pwd_context

# Pre-hashed passwords
students_db = {
    "joshua": {
        "username": "joshua",
        "full_name": "Joshua Ajode",
        "password": pwd_context.hash("1234"),
        "timetable": [
            {"day": "Monday", "subject": "Math", "time": "08:00-09:00"},
            {"day": "Monday", "subject": "English", "time": "09:00-10:00"},
        ],
        "fees": {"tuition": 5000, "library": 200},
        "courses": ["Math", "English", "Physics"],
        "assignments": [
            {"title": "Math HW 1", "due_date": "2026-03-15"},
            {"title": "English Essay", "due_date": "2026-03-18"}
        ],
        "notifications": [
            {"message": "Semester fees due", "date": "2026-03-10"},
            {"message": "New assignment uploaded", "date": "2026-03-11"}
        ]
    },

    "alice": {
        "username": "alice",
        "full_name": "Alice Kimani",
        "password": pwd_context.hash("abcd"),
        "timetable": [
            {"day": "Tuesday", "subject": "Biology", "time": "08:00-09:00"},
            {"day": "Tuesday", "subject": "Chemistry", "time": "09:00-10:00"},
        ],
        "fees": {"tuition": 5500, "library": 250},
        "courses": ["Biology", "Chemistry", "History"],
        "assignments": [
            {"title": "Biology Report", "due_date": "2026-03-16"}
        ],
        "notifications": [
            {"message": "Library fee due", "date": "2026-03-12"}
        ]
    }
}