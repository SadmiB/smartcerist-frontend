import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NavComponent } from './components/nav/nav.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomesService } from './services/homes.service';
import { HomesComponent } from './components/homes/homes.component';
import { UsersComponent } from './components/users/users.component';
import { ServersComponent } from './components/servers/servers.component';
import { RoomsComponent } from './components/rooms/rooms.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { HeaderComponent } from './components/header/header.component';
import { HistoryComponent } from './components/history/history.component';
import { UserService } from './services/user.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { RoomsService } from './services/rooms.service';
import { HomeComponent } from './components/home/home.component';
import { ServersService } from './services/servers.service';
import { ProfileComponent } from './components/profile/profile.component';
import { SweetAlertService } from 'angular-sweetalert-service';
import { FilePickerComponent } from './components/file-picker/file-picker.component';
import { FileHelpersModule } from 'ngx-file-helpers';
import { MatMenuModule } from '@angular/material/menu';
import { NotifIconBtnComponent } from './components/notif-icon-btn/notif-icon-btn.component';
import { HomeUsersComponent } from './components/home-users/home-users.component';
import { HomeRoomsComponent } from './components/home-rooms/home-rooms.component';
import { UserPermissionsComponent } from './components/users/users-by-room/room-users/user-permissions/user-permissions.component';
import { RoomUsersComponent } from './components/users/users-by-room/room-users/room-users.component';
import { RoomComponent } from './components/room/room.component';
import { RoomService } from './services/room.service';
import { UsersByRoomComponent } from './components/users/users-by-room/users-by-room.component';
import { NotificationsService } from './services/notifications.service';
import { EventsService } from './services/events.service';
import { RoomsTabsComponent } from './components/home-rooms/rooms-tabs/rooms-tabs.component';
import { ObjectsService } from './services/objects.service';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignupComponent,
    SigninComponent,
    NavComponent,
    HomesComponent,
    UsersComponent,
    ServersComponent,
    RoomsComponent,
    NotificationsComponent,
    SettingsComponent,
    AnalyticsComponent,
    HeaderComponent,
    HistoryComponent,
    HomeComponent,
    ProfileComponent,
    FilePickerComponent,
    NotifIconBtnComponent,
    HomeUsersComponent,
    RoomUsersComponent,
    HomeRoomsComponent,
    UserPermissionsComponent,
    UsersByRoomComponent,
    RoomComponent,
    RoomsTabsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatPaginatorModule,
    FileHelpersModule,
    MatMenuModule,
  ],

  providers: [AuthService, HomesService,RoomsService,RoomService, ObjectsService, UserService, ServersService,SweetAlertService, NotificationsService,EventsService],

  bootstrap: [AppComponent]
})
export class AppModule { }
