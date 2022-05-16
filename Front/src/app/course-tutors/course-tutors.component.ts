import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Course, Tutor } from '../models';
import { UniServiceService } from '../uni-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-tutors',
  templateUrl: './course-tutors.component.html',
  styleUrls: ['./course-tutors.component.scss'],
})
export class CourseTutorsComponent implements OnInit {
  loaded: boolean = false;
  declare course: Course;
  declare tutors: Tutor[];

  Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  constructor(
    private service: UniServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    timer(this.service.pageLoad).subscribe((x) => this.getCourseTutors());
  }

  getCourseTutors() {
    this.route.paramMap.subscribe((params) => {
      this.loaded = false;
      const id = params.get('id') || '0';
      this.service.getCourse(+id).subscribe((data) => {
        this.course = data;
      });
      this.service.getCourseTutors(+id).subscribe((data) => {
        this.tutors = data;
        this.loaded = true;
      });
    });
  }

  get isLogged(): boolean {
    return this.service.logged;
  }

  toManager() {
    location.href = 'https://t.me/codemode';
  }

  buyCourse(tutor: number) {
    this.route.paramMap.subscribe((params) => {
      const course_id = params.get('id') || '0';
      const id = localStorage.getItem('user_id') || 1;

      Swal.fire({
        title: 'Оплата курса',
        text: 'Вы уверены?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Да!',
        cancelButtonText: 'Нет(',
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.getCourse(+course_id).subscribe((course) => {
            this.service.getUser(+id).subscribe((user) => {
              if (user.balance >= course.price) {
                this.service
                  .updateBalance(+id, user.balance - course.price)
                  .subscribe((data) => {
                    console.log(data);
                  });

                this.service.getAllCoursesTutors().subscribe((courses) => {
                  for (let each of courses) {
                    if (each.course == +course_id && each.tutor == tutor) {
                      this.service
                        .buyCourse(+id, each.id, true)
                        .subscribe((data) => {
                          console.log(data);
                        });
                    }
                  }
                });
                this.Toast.fire({
                  icon: 'success',
                  title: 'Курс добавлен успешно!',
                });
              } else {
                this.Toast.fire({
                  icon: 'error',
                  title: 'Не достаточно средств!',
                });
              }
            });
          });
        } else if (result.isDismissed) {
          console.log('declined');
        }
      });
    });
  }
}
