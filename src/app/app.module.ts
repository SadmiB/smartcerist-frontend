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
import { RoomsService } from './services/rooms.service';
import { HomeComponent } from './components/home/home.component';
import { ServersService } from './services/servers.service';
import { ProfileComponent } from './components/profile/profile.component';
import { FilePickerComponent } from './components/file-picker/file-picker.component';
import { FileHelpersModule } from 'ngx-file-helpers';
import { NotifIconBtnComponent } from './components/notif-icon-btn/notif-icon-btn.component';
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

import { FileUploadServiceService } from './services/file-upload-service.service';
import { ChartsModule } from 'ng2-charts';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';
import { ProfilePictureComponent } from './components/profile/profile-picture/profile-picture.component';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { AddButtonComponent } from './components/add-button/add-button.component';
import { HomeFormComponent } from './components/homes/home-form/home-form.component';
import { RoomFormComponent } from './components/rooms/room-form/room-form.component';
import { FileUploadModule } from 'ng2-file-upload';
import { HomeServersComponent } from './components/servers/home-servers/home-servers.component';
import { ServerFormComponent } from './components/servers/home-servers/server-form/server-form.component';
import { PersonAddComponent } from './components/room/person-add/person-add.component';
import { TagInputModule } from 'ngx-chips';
import { RoomUsersExpansionPanelComponent } from './components/room/room-users-expansion-panel/room-users-expansion-panel.component';
import { NotificationAlertComponent } from './components/notification-alert/notification-alert.component';
import { NotificationToastComponent } from './components/notification-toast/notification-toast.component';
import { NotificationDetailsComponent } from './components/notifications/notification-details/notification-details.component';
import { HomeEditComponent } from './components/homes/home-edit/home-edit.component';
import { RoomEditComponent } from './components/rooms/room-edit/room-edit.component';
import { ServerEditComponent } from './components/servers/home-servers/server-edit/server-edit.component';
import { CamerasService } from './services/cameras.service';
import { ObjectsComponent } from './components/objects/objects.component';
import { CamerasComponent } from './components/cameras/cameras.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { PersonEditComponent } from './components/room/person-edit/person-edit.component';
import { WarningDiagComponent } from './components/warning-diag/warning-diag.component';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };





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
    RoomUsersComponent,
    HomeRoomsComponent,
    UserPermissionsComponent,
    UsersByRoomComponent,
    RoomComponent,
    RoomsTabsComponent,
    ProfilePictureComponent,
    AddButtonComponent,
    HomeFormComponent,
    RoomFormComponent,
    HomeServersComponent,
    ServerFormComponent,
    PersonAddComponent,
    RoomUsersExpansionPanelComponent,
    NotificationAlertComponent,
    NotificationToastComponent,
    NotificationDetailsComponent,
    HomeEditComponent,
    RoomEditComponent,
    ServerEditComponent,
    ObjectsComponent,
    CamerasComponent,
    PasswordChangeComponent,
    PersonEditComponent,
    WarningDiagComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FileHelpersModule,
    ChartsModule,
    SnotifyModule,
    FancyImageUploaderModule,
    SocketIoModule.forRoot(config),
    FileUploadModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ AuthService, HomesService, RoomsService, RoomService, ObjectsService, UserService, ServersService, NotificationsService,
    EventsService, { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService, FileUploadServiceService, CamerasService],
  entryComponents: [
      HomeEditComponent,
      RoomEditComponent,
      ServerEditComponent,
      PersonEditComponent,
      WarningDiagComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
