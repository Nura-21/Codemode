from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Tutor)
admin.site.register(Course)
admin.site.register(CourseTutor)
admin.site.register(TutorPhoneNumbers)
admin.site.register(CodemodeUser)
admin.site.register(StudentPhoneNumbers)
admin.site.register(StudentCourseTutor)
admin.site.register(StudentCourseComment)