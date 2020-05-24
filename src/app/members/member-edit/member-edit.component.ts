import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';

import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_Models/user';
import { ActivatedRoute } from '@angular/router';
import { AlerifyService } from 'src/app/_services/alerify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
user: User;
photoUrl: string;
@ViewChild('editForm', {static: false}) editForm: NgForm;
@HostListener('window:beforeunload', ['$event'])

unloadNotification($event: any) {
if (this.editForm.dirty) {

  $event.returnValue =  true;
}
}
  constructor(private route: ActivatedRoute, private alertify: AlerifyService,
              private userService: UserService ,
              private authService: AuthService
     ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
  updateUser() {
    this.userService.updateUser(this.authService.decoddedToken.nameid, this.user).subscribe( next => {
      this.alertify.success('Profile updated successfully');
      this.editForm.reset(this.user);
    }, error => {
  this.alertify.error(error);
    });
    // console.log(this.user);
    // this.alertify.success('Profile updated successfully');

  }

  updateMainPhoto(photoUrl) {
this.user.photoUrl = photoUrl;

  }

}
