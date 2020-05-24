import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { User } from './../../_Models/user';
import { Component, OnInit, Input } from '@angular/core';
import { AlerifyService } from 'src/app/_services/alerify.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
@Input () user: User;

  constructor(private authService: AuthService, private userService: UserService,
              private alertyfy: AlerifyService) { }

  ngOnInit() {
  }
sendLike(id: number) {
this.userService.sendLike(this.authService.decoddedToken.nameid, id).subscribe(date => {
    this.alertyfy.success('You have liked: ' + this.user.knownAs);
  }, error => {
    this.alertyfy.error(error);
  });
}
}
