
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { AuthGuard } from './_gaurds/auth.guard';
import { UserService } from './_services/user.service';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListResolver } from './_resolvers/member-list.resolver ';
import { MemberEditResolver } from './_resolvers/member-edit.resolver ';
import { PreventUnsavedChanges } from './_gaurds/prevent-unsaved-changes.guard';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { HasRoleDirective } from './_directives/has-role.directive';


export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      HasRoleDirective,
    ],
   imports: [
       AppRoutingModule,
      HttpClientModule,
      FormsModule,
       BrowserAnimationsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      JwtModule.forRoot({
         config : {
            tokenGetter: tokenGetter,
           
         }
      }),
            BsDropdownModule.forRoot(),
            BsDatepickerModule.forRoot(),
        
   ],
   providers: [
      AuthService,
      AuthGuard,
      PreventUnsavedChanges,
      JwtHelperService,
      UserService,
      ErrorInterceptorProvider,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      ListsResolver,
      MessagesResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
