from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import UserManager, MoneyManager


# Create your models here.


class Tutor(models.Model):
    class Meta:
        verbose_name = 'Tutor'
        verbose_name_plural = 'Tutors'
    url = models.URLField(max_length=300, default="")
    name = models.CharField(max_length=300)
    email = models.EmailField(max_length=300)
    info = models.TextField(max_length=1024)
    image_url = models.URLField(max_length=300, default="", blank=True)

    def __str__(self):
        return self.name


class TutorPhoneNumbers(models.Model):
    class Meta:
        verbose_name = 'Phone number of some tutor'
        verbose_name_plural = 'Phone numbers of some tutors'
    tutor = models.ForeignKey(Tutor, related_name="phones", on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.phone


class CodemodeUser(AbstractUser):
    username = None
    first_name = models.CharField(max_length=300, null=True, blank=True)
    last_name = models.CharField(max_length=300, null=True, blank=True)
    nickname = models.CharField(max_length=300, unique=True, null=True, blank=True)
    password = models.CharField(max_length=300, null=True, blank=True)
    phone = models.CharField(max_length=300, null=True, blank=True)
    email = models.EmailField(max_length=300, default="")
    balance = models.IntegerField(default=0)
    image_url = models.URLField(max_length=301, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = 'nickname'
    REQUIRED_FIELDS = [balance, image_url]


class StudentPhoneNumbers(models.Model):
    class Meta:
        verbose_name = 'Student and his phone number'
        verbose_name_plural = 'Students and their phone numbers'
    student = models.ForeignKey(
        CodemodeUser, related_name="phones", on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.phone


class Course(models.Model):
    class Meta:
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'

    title = models.CharField(max_length=300)
    description = models.TextField(max_length=300)
    price = models.IntegerField(default=0)
    info = models.TextField(max_length=300)
    url = models.URLField(max_length=300, default="")
    tutors = models.ManyToManyField(Tutor, related_name="courses", through="CourseTutor")
    commented_by = models.ManyToManyField(
        CodemodeUser, through="StudentCourseComment")

    def __str__(self):
        return self.title


class CourseTutor(models.Model):
    class Meta:
        verbose_name = 'Course-Tutor'
        verbose_name_plural = 'Courses-Tutors'
    course = models.ForeignKey(
        Course, on_delete=models.CASCADE, blank=True, null=True)
    tutor = models.ForeignKey(
        Tutor, on_delete=models.CASCADE, blank=True, null=True)
    students = models.ManyToManyField(
        CodemodeUser, related_name="courses", through="StudentCourseTutor")
    status = models.CharField(max_length=300)
    time = models.CharField(max_length=300)
    amount = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.course.title} | {self.time} | {self.tutor.name}"


class StudentCourseTutor(models.Model):
    class Meta:
        verbose_name = 'Student and Course-Tutors'
        verbose_name_plural = 'Student and Course-Tutors'
    student = models.ForeignKey(
        CodemodeUser, on_delete=models.CASCADE, blank=True, null=True)
    course_tutor = models.ForeignKey(
        CourseTutor, on_delete=models.CASCADE, blank=True, null=True)
    paid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.student.first_name} {self.student.last_name} | {self.course_tutor}"


class StudentCourseComment(models.Model):
    class Meta:
        verbose_name = "Student's course comment"
        verbose_name_plural = "Students' course comments"
    student = models.ForeignKey(CodemodeUser, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    comment = models.TextField(max_length=512)

    def __str__(self):
        return f"{self.student.nickname} | {self.course.title} | comment"


class Money(models.Model):
    class Meta:
        verbose_name = 'Money'
        verbose_name_plural = 'Money'
    student = models.ForeignKey(
        CodemodeUser, on_delete=models.CASCADE, blank=True, null=True)
    time = models.DateTimeField(auto_now_add=True)
    amount = models.IntegerField(default=0)
    message = models.TextField(max_length=300, blank=True, null=True)
    status = models.CharField(max_length=300)
    # methods = MoneyManager(

    def __str__(self):
        return f'{self.student} | {self.amount}KZT | {self.time}'
