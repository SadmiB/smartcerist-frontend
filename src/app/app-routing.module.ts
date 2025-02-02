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
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoomComponent } from './components/room/room.component';
import { UsersByRoomComponent } from './components/users/users-by-room/users-by-room.component';
import { RoomsTabsComponent } from './components/home-rooms/rooms-tabs/rooms-tabs.component';
import { HomeFormComponent } from './components/homes/home-form/home-form.component';
import { RoomFormComponent } from './components/rooms/room-form/room-form.component';
import { ServerFormComponent } from './components/servers/home-servers/server-form/server-form.component';
import { RoomUsersExpansionPanelComponent } from './components/room/room-users-expansion-panel/room-users-expansion-panel.component';
import { NotificationDetailsComponent } from './components/notifications/notification-details/notification-details.component';
import { ServerComponent } from './components/servers/server/server.component';
import { RulesComponent } from './components/rules/rules.component';
import { RuleComponent } from './components/rules/rule/rule.component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard/homes',  pathMatch: 'full'},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'homes', component: HomesComponent},
    {path: 'homes/form', component: HomeFormComponent},
    {path: 'homes/:homeId', component: HomeComponent},
    {path: 'homes/:homeId/rooms', component: RoomsComponent},
    {path: 'homes/:homeId/rooms/form', component: RoomFormComponent},
    {path: 'homes/:homeId/rooms/:roomId', component: RoomComponent},
    {path: 'homes/:homeId/users', component: UsersComponent},
    {path: 'homes/:homeId/rooms/:roomId/users', component: RoomUsersExpansionPanelComponent},
    {path: 'homes/:homeId/servers', component: ServersComponent},
    {path: 'homes/:homeId/servers/:serverId', component: ServerComponent},
    {path: 'homes/:homeId/servers/form', component: ServerFormComponent},
    {path: 'homes/:homeId/rules/:ruleId', component: RuleComponent},
    {path: 'users', component: UsersComponent},
    {path: 'rooms', component: RoomsTabsComponent},
    {path: 'roomsUsers', component: UsersByRoomComponent},
    {path: 'servers', component: ServersComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'notifications/:notificationId', component: NotificationDetailsComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'analytics', component: AnalyticsComponent},
    {path: 'profile', component: ProfileComponent},
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
