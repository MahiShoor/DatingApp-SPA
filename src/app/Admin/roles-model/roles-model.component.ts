import { User } from 'src/app/_Models/user';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-roles-model',
  templateUrl: './roles-model.component.html',
  styleUrls: ['./roles-model.component.css']
})
export class RolesModelComponent implements OnInit {
@Output() updateSelectedRoles = new EventEmitter();
  user: User;
roles: any[];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
  }
updateRoles() {
  this.updateSelectedRoles.emit(this.roles);
  this.bsModalRef.hide();
}
}
