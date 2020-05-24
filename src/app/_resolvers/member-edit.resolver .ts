import { AuthService } from './../_services/auth.service';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';
import { User } from '../_Models/user';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlerifyService } from '../_services/alerify.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MemberEditResolver  implements Resolve<User> {

    constructor(private userService: UserService ,
                private router: Router,
                private alertifyService: AlerifyService,
                private authService: AuthService)  {

}
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
                 return this.userService.getUser(this.authService.decoddedToken.nameid).pipe(catchError(error => {
                     this.alertifyService.error('Problem in retrieving your data');
                     this.router.navigate(['/members']);
                     return of(null);
                 }));
    }

    }


