import { Component, OnInit } from '@angular/core';
import { Course } from '../models';
import { UniServiceService } from '../uni-service.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  id!: number;
  courses!: Course[];
  loaded: boolean = false;
  constructor(private service: UniServiceService) {}

  ngOnInit(): void {
    timer(this.service.pageLoad).subscribe((x) => this.getCourses());
  }

  getCourses() {
    this.service.getCourses().subscribe((courses) => {
      this.courses = courses;
      this.loaded = true;
    });
  }

  get isLogged(): boolean {
    return this.service.logged;
  }

  toManager() {
    location.href = 'https://t.me/codemode';
  }
}
