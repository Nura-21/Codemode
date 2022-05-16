import { Component, OnInit } from '@angular/core';
import { UniServiceService } from '../uni-service.service';
import { Info } from '../models';
import { timer } from 'rxjs';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  info: Info[] = [];
  appear!: Info;
  i = 0;
  loaded: boolean = false;

  constructor(private service: UniServiceService) {}

  ngOnInit(): void {
    timer(this.service.slideLoad).subscribe((x) => this.getInfo());
  }

  getInfo() {
    this.service.getInfo().subscribe((comments) => {
      this.info = comments;
      this.loaded = true;
    });
  }

  sliderNext() {
    this.loaded = false;
    this.i = (this.i + 1) % this.info.length;
    timer(this.service.slideLoad).subscribe((x) => (this.loaded = true));
  }

  sliderPrev() {
    this.loaded = false;
    if (this.i == 0) {
      this.i = this.info.length - 1;
    }
    this.i = this.i - 1;
    timer(this.service.slideLoad).subscribe((x) => (this.loaded = true));
  }
}
