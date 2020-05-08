import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
baseUrl = 'http://localhost:5000/api/auth/';
  constructor(private http: HttpClient) { }

login(model: any) {
  // server is going to send Jwt token upon successful login in response as obseervaable 
  // we need to make use of rxjs operator in order to use them we need to make use of pipies
return this.http.post(this.baseUrl + 'login', model)
.pipe(
  map((response: any) => {
    const user = response;
    if (user) {
      localStorage.setItem('token', user.token);
    }
  })
);
}

register(model: any){
 return  this.http.post(this.baseUrl + 'register', model );
}

}
