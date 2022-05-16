import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {
  Token,
  Course,
  Tutor,
  Info,
  User,
  RegUser,
  StCourse,
  CourseTutor,
  Buy,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class UniServiceService {
  logged: any;
  pageLoad = 800;
  slideLoad = 500;

  logChange: Subject<boolean> = new Subject<boolean>();

  ROOT_URL = 'http://127.0.0.1:8000/api';
  // ROOT_URL = 'http://192.168.0.113:8000/api';
  // ROOT_URL = 'http://172.16.92.217:8000/api';
  // ROOT_URL = 'https://trdln.pythonanywhere.com/api';

  constructor(private client: HttpClient) {
    this.logChange.subscribe((value) => {
      this.logged = value;
    });
  }

  setFalse() {
    this.logged = false;
  }

  setTrue() {
    this.logged = true;
  }

  login(nickname: string, password: string): Observable<Token> {
    return this.client.post<Token>(`${this.ROOT_URL}/login/`, {
      nickname,
      password,
    });
  }

  register(
    nickname: string,
    password: string,
    first_name: string,
    last_name: string,
    email: string
  ): Observable<RegUser> {
    return this.client.post<RegUser>(`${this.ROOT_URL}/students/register/`, {
      nickname,
      password,
      first_name,
      last_name,
      email,
    });
  }

  refresh(): Observable<Token> {
    const token = localStorage.getItem('refresh');
    return this.client.post<Token>(`${this.ROOT_URL}/login/refresh/`, {
      token,
    });
  }

  logout() {
    this.logged = false;
    localStorage.removeItem('access');
  }

  getCourses(): Observable<Course[]> {
    return this.client.get<Course[]>(`${this.ROOT_URL}/courses/`);
  }

  getTutors(): Observable<Tutor[]> {
    return this.client.get<Tutor[]>(`${this.ROOT_URL}/tutors/`);
  }

  getCourse(id: number): Observable<Course> {
    return this.client.get<Course>(`${this.ROOT_URL}/courses/${id}/`);
  }

  getTutor(id: number): Observable<Tutor> {
    return this.client.get<Tutor>(`${this.ROOT_URL}/tutors/${id}/`);
  }

  getTutorCourse(id: number): Observable<Course[]> {
    return this.client.get<Course[]>(`${this.ROOT_URL}/tutors/${id}/courses/`);
  }

  getCourseTutors(id: number): Observable<Tutor[]> {
    return this.client.get<Tutor[]>(`${this.ROOT_URL}/courses/${id}/tutors/`);
  }

  getUser(id: number): Observable<User> {
    return this.client.get<User>(`${this.ROOT_URL}/students/${id}/`);
  }

  getUsersCourses(id: number): Observable<StCourse[]> {
    return this.client.get<StCourse[]>(
      `${this.ROOT_URL}/students/${id}/courses/`
    );
  }

  getInfo(): Observable<any[]> {
    return this.client.get<any[]>(`${this.ROOT_URL}/comments/`);
  }

  setPhone(id: number, phone: string): Observable<string> {
    return this.client.put<string>(`${this.ROOT_URL}/students/${id}/`, {
      phone,
    });
  }

  buyCourse(
    student: number,
    course_tutor: number,
    paid: boolean
  ): Observable<Buy> {
    return this.client.post<Buy>(
      `${this.ROOT_URL}/students/${student}/courses/`,
      {
        student,
        course_tutor,
        paid,
      }
    );
  }

  getAllCoursesTutors(): Observable<CourseTutor[]> {
    return this.client.get<CourseTutor[]>(`${this.ROOT_URL}/courses/tutors/`);
  }

  updateBalance(id: number, balance: number): Observable<number> {
    return this.client.put<number>(`${this.ROOT_URL}/students/${id}/`, {
      balance,
    });
  }

  postComment(
    student: number,
    course: number,
    comment: string
  ): Observable<any> {
    return this.client.post<any>(`${this.ROOT_URL}/comments/`, {
      student,
      course,
      comment,
    });
  }
}
