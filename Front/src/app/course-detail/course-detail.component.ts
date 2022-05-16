import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../models';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UniServiceService } from '../uni-service.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course!: Course;
  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: UniServiceService
  ) {}

  ngOnInit(): void {
    timer(this.service.pageLoad).subscribe((x) => this.getCourse());
  }

  getCourse() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') || 0;
      this.loaded = false;
      this.service.getCourse(+id).subscribe((course) => {
        this.course = course;
      });
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
