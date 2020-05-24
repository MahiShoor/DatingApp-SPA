import { Observable, of } from 'rxjs';
import { UserService } from './../_services/user.service';
import { User } from './../_Models/user';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlerifyService } from '../_services/alerify.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MemberDetailResolver  implements Resolve<User> {

    constructor(private userService: UserService ,
                private router: Router,
                private alertifyService: AlerifyService)  {

}
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
                 return this.userService.getUser(route.params.id).pipe(catchError(error => {
                     this.alertifyService.error('Problem in retrieving data');
                     this.router.navigate(['/members']);
                     return of(null);
                 }));
    }

    }


