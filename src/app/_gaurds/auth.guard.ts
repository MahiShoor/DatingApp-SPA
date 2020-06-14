import { AuthService } from './../_services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlerifyService } from '../_services/alerify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private authService: AuthService ,
              private router: Router ,
              private alertify: AlerifyService) {
  }
  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data.roles as Array<string> ;
    if (roles) {
const match = this.authService.roleMatch(roles);
if (match) {
  return true;
} else {
  this.router.navigate(['members']);
  this.alertify.error('You are not authorized to acccess this area');
}
}
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertify.error('You shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
