import { ActivatedRoute } from '@angular/router';
import { UserService } from './../_services/user.service';
import { AuthService } from './../_services/auth.service';
import { Pagination, PaginatedResult } from 'src/app/_Models/pagination';
import { User } from 'src/app/_Models/user';
import { Component, OnInit } from '@angular/core';
import { AlerifyService } from '../_services/alerify.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
users: User[];
pagination: Pagination;
likesParam: string;

  constructor(private authService: AuthService,  private userService: UserService,
              private route: ActivatedRoute, private alertify: AlerifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
       this.users = data.users.result;
       this.pagination = data.users.pagination;

    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    this.likesParam = 'Likers';
  }
  loadUsers() {
    // tslint:disable-next-line: no-unused-expression
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam).subscribe(
      (res: PaginatedResult<User[]>) => {
    this.users = res.result;
    this.pagination = res.pagination;
    },
    error => {
    this.alertify.error(error);
    });
      }

}
