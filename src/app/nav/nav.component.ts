import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AlerifyService } from '../_services/alerify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(public authService: AuthService, private alertify: AlerifyService) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(
      next => {
      this.alertify.success('logged in successfully');
      }, error => {
    this.alertify.error(error); }
    );

  }

  loggedIn() {
  return this.authService.loggedIn();
  }
logout() {
  localStorage.removeItem('token');
  this.alertify.message('logged out');
}

}
