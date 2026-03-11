from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import courses, assignments, fees, notifications, timetable, profile, auth_router
from routers import dashboard
app = FastAPI(title="Student Portal API")

# Allow CORS for React frontend
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",  # if using npm start
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(courses.router, prefix="/courses", tags=["Courses"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
app.include_router(auth_router.router, prefix="/auth", tags=["Authentication"])
# app.include_router(assignments.router, prefix="/assignments", tags=["Assignments"])
# app.include_router(fees.router, prefix="/fees", tags=["Fees"])
# app.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
app.include_router(timetable.router, prefix="/timetable", tags=["Timetable"])
# app.include_router(profile.router, prefix="/profile", tags=["Profile"])

@app.get("/")
def root():
    return {"message": "Student Portal API is running"}