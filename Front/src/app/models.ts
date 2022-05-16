export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  info: string;
  url: string;
}

export interface Tutor {
  id: number;
  name: string;
  info: string;
  email: string;
  url: string;
  image_url: string;
  phones: string[];
}

export interface Token {
  access: string;
  id: number;
}

export interface Info {
  id: number;
  comment: string;
  student: string;
  course: string;
}

export interface User {
  id: number;
  nickname: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  image_url: string;
  balance: number;
}

export interface RegUser {
  nickname: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
}

export interface StCourse {
  id: number;
  status: string;
  time: string;
  amount: number;
  course: number;
  tutor: number;
}

export interface CourseTutor {
  id: number;
  status: string;
  time: string;
  amoun: number;
  course: number;
  tutor: number;
  students: [];
}

export interface Buy {
  student: number;
  course_tutor: number;
  paid: boolean;
}
