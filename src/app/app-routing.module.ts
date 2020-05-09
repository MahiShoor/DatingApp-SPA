import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MembersListComponent } from './members-list/members-list.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './_gaurds/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent},
  {
     path: '', // 'dummmy' then localhost:4200/dummymemebers
      runGuardsAndResolvers: 'always',
canActivate: [AuthGuard],
children : [
  { path: 'members', component: MembersListComponent, canActivate: [AuthGuard]},
  { path: 'messages', component: MessagesComponent},
  { path: 'list', component: ListsComponent}
]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'},

];

@NgModule({
  declarations: [

    MembersListComponent,
    ListsComponent,
    MessagesComponent,
 
  ],

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
