import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { UsersComponent } from './components/users/users.component';
import { ServersComponent } from './components/servers/servers.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { HistoryComponent } from './components/history/history.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomesComponent } from './components/homes/homes.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/homes',  pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'homes', component: HomesComponent},
    {path: 'homes/:homeId/rooms', component: RoomsComponent},
    {path: 'homes/:homeId/users', component: UsersComponent},
    {path: 'homes/:homeId/rooms/:roomId/users', component: UsersComponent},
    {path: 'homes/:homeId/servers', component: ServersComponent},
    {path: 'rooms', component: RoomsComponent},
    {path: 'users', component: UsersComponent},
    {path: 'servers', component: ServersComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'settings', component: SettingsComponent}
  ]},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
