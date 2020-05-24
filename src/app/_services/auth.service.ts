

import { environment } from './../../environments/environment';

import {BehaviorSubject} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_Models/user';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = environment.apiUrl + 'auth/';

jwtHelper = new JwtHelperService();
decoddedToken: any;
currentUser: User;
photoUrl = new BehaviorSubject<string>('../../assets/user.png');
currentPhotoUrl = this.photoUrl.asObservable();


  constructor(private http: HttpClient) { }
changeMemberPhoto(photoUrl: string) {
this.photoUrl.next(photoUrl);
}

login(model: any) {
  // server is going to send Jwt token upon successful login in response as obseervaable 
  // we need to make use of rxjs operator in order to use them we need to make use of pipies
return this.http.post(this.baseUrl + 'login', model)
.pipe(
  map((response: any) => {
    const user = response;
    if (user) {
      localStorage.setItem('token', user.token);
      localStorage.setItem('user', JSON.stringify(user.user));
      this.decoddedToken = this.jwtHelper.decodeToken(user.token);
      this.currentUser = user.user;
      this.changeMemberPhoto(this.currentUser.photoUrl);
      // console.log(this.decoddedToken);
    }
  })
);
}

register(user: User) {
 return  this.http.post(this.baseUrl + 'register', user );
}

loggedIn() {
  const token = localStorage.getItem('token');
  return !this.jwtHelper.isTokenExpired(token);
}

}
