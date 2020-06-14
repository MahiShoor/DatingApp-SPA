import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';
import { User } from '../_Models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return  this.http.get(this.baseUrl + 'admin/userWithRoles');
  }
  updateUserRoles(user: User, roles: {}) {
return this.http.post(this.baseUrl + 'admin/editRoles/' + user.userName, roles);
  }

getPhotosForApproval() {
 return this.http.get(this.baseUrl + 'admin/photosForModeration');

}
approvedPhoto(photoId) {
 return this.http.post(this.baseUrl + 'admin/approvedPhoto' + photoId, {});
}
rejectPhoto(photoId) {
return this.http.post(this.baseUrl + 'admin/rejectPhoto' + photoId, {});

}

}
