import { MemberDetailComponent } from './../member-detail/member-detail.component';
import { AuthService } from './../../_services/auth.service';
import { UserService } from './../../_services/user.service';
import { Message } from './../../_Models/message';
import { Component, OnInit, Input } from '@angular/core';
import { AlerifyService } from 'src/app/_services/alerify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
@Input() recipientId: number;
messages: Message[];
newMessage: any = {};
  constructor(private userService: UserService,
              private authService: AuthService,
              private alertify: AlerifyService) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    const currentUserId = +this.authService.decoddedToken.nameid;
    this.userService.getMessageThread(this.authService.decoddedToken.nameid, this.recipientId)
    .pipe(
      tap(messages => {
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < messages.length; i++){
          if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
            this.userService.markMessageAsRead(currentUserId, messages[i].id);
           }
        }
      })
    )
    .subscribe(messages => {
      this.messages = messages;

    }, error => {
      this.alertify.error(error);
    });
  }


  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decoddedToken.nameid, this.newMessage)
    .subscribe((message: Message ) => {

      this.messages.unshift(message);
      this.newMessage.content = '';
    }, error => {
       this.alertify.error(error);
    });
  }

}
