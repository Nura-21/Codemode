import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UniServiceService } from '../uni-service.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.scss'],
})
export class LogRegComponent implements OnInit {
  nickname = '';
  password = '';
  first_name = '';
  last_name = '';
  email = '';
  register: boolean = false;

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

  constructor(public service: UniServiceService, private router: Router) {}

  get isLogged(): boolean {
    return this.service.logged;
  }

  ngOnInit(): void {
    const token = localStorage.getItem('access');
    if (token != null) {
      this.service.setTrue();
    } else {
      this.service.setFalse();
    }
  }

  login() {
    this.service.login(this.nickname, this.password).subscribe((data) => {
      console.log(data);
      localStorage.setItem('access', data.access);
      localStorage.setItem('user_id', String(data.id));

      this.service.setTrue();
      this.nickname = '';
      this.password = '';
      this.router.navigate(['/account']);
    });
  }

  reg() {
    if (this.nickname == '') {
      this.Toast.fire({
        icon: 'error',
        title: 'Неправильное имя пользователя!',
      });
      return;
    }

    if (this.first_name == '' || this.first_name.length < 2) {
      this.Toast.fire({
        icon: 'error',
        title: 'Неправильное имя!',
      });
      return;
    }

    if (this.last_name == '' || this.last_name.length < 2) {
      this.Toast.fire({
        icon: 'error',
        title: 'Неправильная фамилья!',
      });
      return;
    }

    if (this.email == '') {
      this.Toast.fire({
        icon: 'error',
        title: 'Неправильная почта!',
      });
      return;
    }

    if (this.password == '' || this.password.length < 5) {
      this.Toast.fire({
        icon: 'error',
        title: 'Неправильный пароль!',
        timer: 1000,
      });
      timer(1000).subscribe((x) => {
        this.Toast.fire({
          icon: 'warning',
          title: 'Пароль должен состоять из не менее 5 символов.',
          timer: 1000,
        });
      });
      return;
    }

    this.service
      .register(
        this.nickname,
        this.password,
        this.first_name,
        this.last_name,
        this.email
      )
      .subscribe((data) => {
        // console.log(data);

        // this.nickname = '';
        // this.password = '';
        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.Toast.fire({
          icon: 'success',
          title: 'Регистрация прошла успешно!',
        });
        this.register = false;
      });
  }

  logout() {
    this.service.setFalse();
    this.service.logout();
  }

  toRegister() {
    this.register = true;
  }

  outRegister() {
    this.register = false;
  }
}
