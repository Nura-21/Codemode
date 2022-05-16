# urls here
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import *

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view()),
    path('login/refresh/', TokenRefreshView.as_view()),

    path('tutors/', TutorView.as_view()),
    path('tutors/<int:id>/', tutor_details_int),
    path('tutors/phones/', post_teacher_phone),
    path('tutors/<int:id>/courses/', tutor_courses_int),

    # path('students/', StudentView.as_view()),
    path('students/', get_students),
    path('students/register/', register),
    path('students/phones/', post_student_phone),
    path('students/<int:id>/', student_details),
    path('students/<int:id>/courses/', student_courses),

    path('courses/', CourseView.as_view()),
    path('courses/<int:id>/', course_details_int),
    path('courses/<int:id>/tutors/', course_tutors_int),
    path('courses/<int:id>/comments/', course_comments_int),
    path('courses/tutors/', all_course_tutors),
    path('comments/', comments_list),

    path('money/', MoneyView.as_view())
]
