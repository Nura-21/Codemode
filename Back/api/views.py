from django.db.models import Sum
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from .serializers import *
from django.core.mail import send_mail

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView

# Create your views here.
from .models import Tutor, CodemodeUser, Course


class CustomTokenObtainPairView(TokenObtainPairView):
    # Replace the serializer with your custom
    serializer_class = CustomTokenObtainPairSerializer


class TutorView(APIView):
    def get(self, request):
        tutors = Tutor.objects.all()
        serializer = TutorSerializer(tutors, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TutorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    
@api_view(['GET', 'PUT', 'DELETE'])
def tutor_details_int(request, id):
    try:
        tutor = Tutor.objects.get(id=id)
    except Tutor.DoesNotExist as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = TutorSerializer(tutor)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = TutorSerializer(tutor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        tutor.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
def post_teacher_phone(request):
    if request.method == 'POST':
        serializer = TutorPhoneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_students(request):
    students = CodemodeUser.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register(request):
    serializer = StudentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        send_mail('Благодарим за регистрацию на портале codemode.kz!',
                  'Если Вы получили это письмо, значит Вы зарегистрировались на один из курсов школы программирования Codemode. Если есть какие-либо вопросы, можете обратиться к телеграмм менеджеру по ссылке: t.me/codemodecpp',
                  'codemode.02@gmail.com', [f"{request.data['email']}"], fail_silently=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors)

# class StudentView(APIView):
#     # permission_classes = [IsAuthenticated]

#     def get(self, request):
#         students = CodemodeUser.objects.all()
#         serializer = StudentSerializer(students, many=True)
#         return Response(serializer.data)

#     def post(self, request):
#         serializer = StudentSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             send_mail('Благодарим за регистрацию на портале codemode.kz!',
#                       'Если Вы получили это письмо, значит Вы зарегистрировались на один из курсов школы программирования Codemode. Если есть какие-либо вопросы, можете обратиться к телеграмм менеджеру по ссылке: t.me/codemodecpp',
#                       'codemode.02@gmail.com', [f"{request.data['email']}"], fail_silently=True)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def post_student_phone(request):
    serializer = StudentPhoneSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([IsAuthenticated])
def student_details(request, id):
    try:
        student = CodemodeUser.objects.get(pk=id)
    except CodemodeUser.DoesNotExist as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = StudentSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CourseView(APIView):
    def get(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


@api_view(['GET', 'PUT', 'DELETE'])
def course_details_int(request, id):
    try:
        course = Course.objects.get(id=id)
    except Course.DoesNotExist as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = CourseSerializer(course)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        course.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def student_courses(request, id):
    if request.method == 'GET':
        courses = CodemodeUser.objects.get(pk=id).courses.all()
        serializer = CourseTutorSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = request.data
        data["student"] = id
        serializer = StudentCourseTutorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


@api_view(['GET', 'POST'])
def tutor_courses_int(request, id):
    try:
        tutor = Tutor.objects.get(id=id)
    except Tutor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        courses = tutor.courses.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = request.data
        data["tutor"] = tutor.pk
        serializer = CourseTutorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)
    

@api_view(['GET', 'POST'])
def course_tutors_int(request, id):
    try:
        course = Course.objects.get(id=id)
    except Course.DoesNotExist as e:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        tutors = course.tutors.all()
        serializer = TutorSerializer(tutors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = request.data
        data["course"] = course.pk
        serializer = CourseTutorSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)

@api_view(['GET'])
def all_course_tutors(request):
    try:
        courses = CourseTutor.objects.all()
    except CourseTutor.DoesNotExist as e:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = CourseTutorSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET', 'POST'])
def course_comments_int(request, id):
    if request.method == 'GET':
        course = Course.objects.get(id=id)
        comments = course.studentcoursecomment_set.all()
        serializer = StudentCourseCommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = request.data
        data["course"] = id
        serializer = StudentCourseCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)


@api_view(['GET', 'POST'])
def comments_list(request):
    if request.method == 'GET':
        comments = StudentCourseComment.objects.all()
        serializer = StudentCourseCommentSerializer(comments, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        data = request.data
        serializer = StudentCourseCommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors)

class MoneyView(APIView):
    def get(self, request):
        money = Money.objects.all()
        serializer = MoneySerializer(money, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MoneySerializer(data=request.data)
        if serializer.is_valid():
            student = serializer.validated_data['student']
            student.balance += serializer.validated_data['amount']
            if student.balance >= 0:
                student.save()
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            elif student.balance < 0:
                return Response({'message': 'Not enough cash on the balance'})
        return Response(serializer.errors)


