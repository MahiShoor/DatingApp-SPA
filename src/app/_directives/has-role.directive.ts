import { Directive, Input, ViewContainerRef, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
@Input() appHasRole: string[];

isVisible = false;
  constructor(private viewContainerRef: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private authService: AuthService
     ) { }

ngOnInit() {
  const userRoles = this.authService.decoddedToken.role  as Array<string>;
  // if there are no role cleasr the viewCotainerRef
  if (!userRoles) {
    this.viewContainerRef.clear();

  }
// if user hase particular role needed the render
  if (this.authService.roleMatch(this.appHasRole)) {
if (!this.isVisible) {
  this.isVisible = true;
  this.viewContainerRef.createEmbeddedView(this.templateRef);

} else {
  this.isVisible = false;
  this.viewContainerRef.clear();
}
  }
}

}
