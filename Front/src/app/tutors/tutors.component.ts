import { Component, OnInit } from '@angular/core';
import { UniServiceService } from '../uni-service.service';
import { Tutor } from '../models';
import { timer } from 'rxjs';

@Component({
  selector: 'app-tutors',
  templateUrl: './tutors.component.html',
  styleUrls: ['./tutors.component.scss'],
})
export class TutorsComponent implements OnInit {
  constructor(private service: UniServiceService) {}

  loaded: boolean = false;
  tutors: Tutor[] = [];

  ngOnInit(): void {
    timer(this.service.pageLoad).subscribe((x) => this.getTutors());
  }

  getTutors() {
    this.service.getTutors().subscribe((tutors) => {
      this.tutors = tutors;
      this.loaded = true;
    });
  }
}
