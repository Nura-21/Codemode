import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UniServiceService } from '../uni-service.service';
import { Tutor } from '../models';
import { timer } from 'rxjs';

@Component({
  selector: 'app-tutor-detail',
  templateUrl: './tutor-detail.component.html',
  styleUrls: ['./tutor-detail.component.scss'],
})
export class TutorDetailComponent implements OnInit {
  tutor!: Tutor;
  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: UniServiceService
  ) {}

  ngOnInit(): void {
    timer(this.service.pageLoad).subscribe((x) => this.getTutor());
  }

  getTutor() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id') || '0';
      this.loaded = false;
      this.service.getTutor(+id).subscribe((tutor) => {
        this.tutor = tutor;
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
