import { map } from 'rxjs/operators';
import { RolesModelComponent } from './../roles-model/roles-model.component';
import {BsModalService} from 'ngx-bootstrap/modal/bs-modal.service';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_Models/user';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
users: User[];
bsModalRef: BsModalRef;

  constructor(private adminService: AdminService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.getUsersWithRoles();
  }
getUsersWithRoles() {
  this.adminService.getUsersWithRoles().subscribe((users: User[]) => {
    this.users = users;
  }, error => {
    console.log(error);
  });

}
editRolesModel(user: User) {
  const initialState = {
 user,
 roles: this.getRolesArray(user)
  };
  this.bsModalRef = this.modalService.show(RolesModelComponent, {initialState});
  this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
    const rolesToUpdate =  {
roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
    };
    // console.log(rolesToUpdate);
    if (rolesToUpdate) {
      this.adminService.updateUserRoles(user , rolesToUpdate).subscribe(() => {
        user.roles = [...rolesToUpdate.roleNames];
      }, error => {
        console.log(error);

      });
    }
  });
}

private getRolesArray(user) {
  const roles = [];
  const userRoles = user.roles;
  const availableRoles: any[] = [
    {name: 'Admin', value: 'Admin'},
    {name: 'Moderator', value: 'Moderator'},
    {name: 'Member', value: 'Member'},
    {name: 'VIP', value: 'VIP  '},

  ];
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0 ; i < availableRoles.length; i++) {
    let isMatch = false;
    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < userRoles.length ; j++) {
if (availableRoles[i].name === userRoles[j].name) {
isMatch = true;
availableRoles[i].checked = true;
roles.push(availableRoles[i]);
break;
}
    }
    if (!isMatch) {
      availableRoles[i].checked = false;
      roles.push(availableRoles[i]);
    }
}
  return roles;

}

}

