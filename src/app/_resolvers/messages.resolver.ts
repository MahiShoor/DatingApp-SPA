import { AuthService } from './../_services/auth.service';
import { Message } from './../_Models/message';
import { Observable, of } from 'rxjs';
import { UserService } from '../_services/user.service';

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlerifyService } from '../_services/alerify.service';
import { catchError } from 'rxjs/operators';


@Injectable()
export class MessagesResolver  implements Resolve<Message[]> {
pageNumber = 1;
pageSize = 5 ;
messageContainer = 'Unread';

    constructor(private userService: UserService ,
                private router: Router,
                private alertifyService: AlerifyService,
                private authService: AuthService)  {

}
    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
                 return this.userService.getMessages(this.authService.decoddedToken.nameid,
                    this.pageNumber, this.pageSize, this.messageContainer).pipe(catchError(error => {
                     this.alertifyService.error('Problem in retrieving messages');
                     this.router.navigate(['/home']);
                     return of(null);
                 }));
    }

    }


