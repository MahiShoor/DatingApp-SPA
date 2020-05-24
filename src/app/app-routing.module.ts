import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PreventUnsavedChanges } from './_gaurds/prevent-unsaved-changes.guard';
import { MemberEditResolver } from './_resolvers/member-edit.resolver ';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';

import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './_gaurds/auth.guard';
import { MembersListComponent } from './members/members-list/members-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberListResolver } from './_resolvers/member-list.resolver ';
import { NgxGalleryModule } from 'ngx-gallery';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { FormsModule } from '@angular/forms';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';



const routes: Routes = [
  { path: '', component: HomeComponent},
  {
     path: '', // 'dummmy' then localhost:4200/dummymemebers
      runGuardsAndResolvers: 'always',
canActivate: [AuthGuard],
children : [
  { path: 'members', component: MembersListComponent, resolve: {users: MemberListResolver}},
  { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver}},
  { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
  { path: 'messages', component: MessagesComponent, resolve: {messages : MessagesResolver}},
  { path: 'list', component: ListsComponent, resolve: {users: ListsResolver}}
]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  declarations: [
    MembersListComponent,
    MemberCardComponent,
    ListsComponent,
    MessagesComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent,
  ],

  imports: [RouterModule.forRoot(routes),
    TabsModule.forRoot(),
    NgxGalleryModule,
    BrowserModule,
    FormsModule,
    FileUploadModule,
    PaginationModule.forRoot(),
    ButtonsModule.forRoot(),
     
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
