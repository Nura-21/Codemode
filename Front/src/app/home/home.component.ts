import { Component, OnInit } from '@angular/core';
import { UniServiceService } from '../uni-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private service: UniServiceService) {}

  ngOnInit(): void {}

  get isLogged(): boolean {
    return this.service.logged;
  }

  toManager() {
    location.href = 'https://t.me/codemode';
  }
}
