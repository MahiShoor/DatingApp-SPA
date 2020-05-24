import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../_services/auth.service';
import { UserService } from './../_services/user.service';
import { Pagination, PaginatedResult } from './../_Models/pagination';
import { Message } from './../_Models/message';
import { Component, OnInit } from '@angular/core';
import { AlerifyService } from '../_services/alerify.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
messages: Message[];
pagination: Pagination;
messageContainer = 'Unread';

  constructor(private userService: UserService,
              private authService: AuthService,
              private alertify: AlerifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.messages = data.messages.result;
      this.pagination = data.messages.pagination;
    });
  }
loadMessages() {
  this.userService.getMessages(this.authService.decoddedToken.nameid, this.pagination.currentPage,
     this.pagination.itemsPerPage, this.messageContainer).
     subscribe((res: PaginatedResult<Message[]>) => {
       this.messages = res.result;
       this.pagination = res.pagination;
     }, error => {
       this.alertify.error(error);
     });
}
deleteMessage(id: number) {
  this.alertify.confirm('Are you sure you want to delete message', () => {
    this.userService.deleteMessage(id, this.authService.decoddedToken.nameid)
    .subscribe(() => {
      this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
      this.alertify.success('Message successfully delete');
    }, error => {
      this.alertify.error('Failed to delete message');
    });
  });

}
pageChanged(event: any ): void {
this.pagination.currentPage = event.page;
this.loadMessages();
}

}
