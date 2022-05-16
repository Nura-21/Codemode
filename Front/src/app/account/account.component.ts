import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UniServiceService } from '../uni-service.service';
import { timer } from 'rxjs';
import { User, StCourse, Course } from '../models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  imageColor = '4825c0';
  text = '';
  loaded = false;
  have = false;
  phone = '+7()';
  declare courses: StCourse[];
  output: string[] = [];
  declare user: User;

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

  constructor(private service: UniServiceService, private router: Router) {}

  ngOnInit(): void {
    if (!this.isLogged) {
      this.router.navigate(['/authorize']);
    }

    timer(this.service.pageLoad).subscribe((x) => {
      this.loaded = true;
      this.getUser();
      this.getCourses();
    });
  }

  get isLogged(): boolean {
    return this.service.logged;
  }

  toManager() {
    location.href = 'https://t.me/codemode';
  }

  getUser() {
    this.loaded = false;
    const id = localStorage.getItem('user_id') || 1;
    this.service.getUser(+id).subscribe((user) => {
      this.user = user;
      this.loaded = true;
      if (user.phone != '') {
        this.have = true;
      } else {
        this.have = false;
      }
    });
  }

  setPhone() {
    this.loaded = false;
    const id = localStorage.getItem('user_id') || 1;
    console.log(this.user.phone);
    if (this.user.phone != '') {
      this.service.setPhone(+id, this.user.phone).subscribe((user) => {
        this.loaded = true;
        this.Toast.fire({
          icon: 'success',
          title: 'Успешно!',
        });
      });
    }
  }

  getCourses() {
    const id = localStorage.getItem('user_id') || 1;
    this.service.getUsersCourses(+id).subscribe((courses) => {
      for (let i of courses) {
        this.service.getCourse(i.course).subscribe((each) => {
          this.output.push(each.url);
        });
      }
    });
    console.log(this.output);
  }

  async addCash() {
    const { value: money } = await Swal.fire({
      title: 'Внесите сумму',
      input: 'number',
      inputLabel: 'Сумма',
      showCancelButton: true,
      inputValue: 0,
    });

    if (money <= 0) {
      this.Toast.fire({
        icon: 'error',
        title: 'Внесите верную сумму',
      });
    } else {
      const id = localStorage.getItem('user_id') || 1;
      this.service.getUser(+id).subscribe((user) => {
        this.service.updateBalance(+id, user.balance + +money).subscribe();
        this.Toast.fire({
          icon: 'success',
          title: 'Успешно! Обновите страничку.',
        });
      });
    }
  }

  async updateProfile() {
    const { value: file } = await Swal.fire({
      title: 'Выберите изображение',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });

    // if (file) {
    //   const reader = new FileReader()
    //   reader.onload = (e) => {
    //     Swal.fire({
    //       title: 'Your uploaded picture',
    //       imageUrl: e.target.result,
    //       imageAlt: 'The uploaded picture'
    //     })

    //   }
    //   reader.readAsDataURL(file)
    // }

    this.Toast.fire({
      icon: 'success',
      title: 'Успешно!',
    });
  }

  async postComment() {
    const id = localStorage.getItem('user_id') || 1;

    const { value: course_id } = await Swal.fire({
      title: 'Выберите курс',
      input: 'select',
      inputOptions: {
        2: 'C++',
        1: 'Python',
        5: 'Databases',
        4: 'OOP',
        3: 'ADS',
      },
      html: '<textarea type="text" id="textarea" class="swal2-input">',
      inputPlaceholder: 'Выберите курс',
      showCancelButton: true,
    });

    this.text = (<HTMLTextAreaElement>(
      document.getElementById('textarea')
    )).value;

    if (this.text == '') {
      this.Toast.fire({
        icon: 'error',
        title: 'Заполните текст...',
      });
      return;
    }
    if (!course_id) {
      this.Toast.fire({
        icon: 'error',
        title: 'Выберите курс...',
      });
      return;
    }
    // console.log(this.text);
    // console.log(course_id)

    this.service
      .postComment(+id, course_id, this.text)
      .subscribe((response) => {
        if (response != null) {
          this.Toast.fire({
            icon: 'success',
            title: 'Успешно! Просмотрите отзывы.',
          });
        } else {
          this.Toast.fire({
            icon: 'error',
            title: 'Что-то пошло не так(',
          });
        }
      });
  }
}
