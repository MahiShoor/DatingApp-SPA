import { PaginatedResult } from './../../_Models/pagination';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../_services/user.service';

import { Component, OnInit } from '@angular/core';
import { User } from '../../_Models/user';
import { AlerifyService } from '../../_services/alerify.service';
import { Pagination } from 'src/app/_Models/pagination';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {
users: User[];
pagination: Pagination;
user: User = JSON.parse(localStorage.getItem('user'));
genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
userParams: any = {};

  constructor(private userService: UserService, private alrtify: AlerifyService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.data.subscribe(data => {
      this.users = data.users.result;
      this.pagination = data.users.pagination;
    });

    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
// tslint:disable-next-line: no-unused-expression
this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams).subscribe(
  (res: PaginatedResult<User[]>) => {
this.users = res.result;
this.pagination = res.pagination;
},
error => {
this.alrtify.error(error);
});
  }

}
