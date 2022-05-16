import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UniServiceService } from '../uni-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  logged: any;

  constructor(public service: UniServiceService, public router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('access');
    if (token != null) {
      this.service.setTrue();
    } else {
      this.service.setFalse();
    }
  }

  get isLogged(): boolean {
    return this.service.logged;
  }

  logout() {
    this.service.setFalse();
    this.service.logout();
  }
}
