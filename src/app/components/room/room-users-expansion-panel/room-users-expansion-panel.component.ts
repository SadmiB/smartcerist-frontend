import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { AuthService } from '../../../services/auth.service';
import { PersonEditComponent } from '../person-edit/person-edit.component';
import { RoomsService } from '../../../services/rooms.service';
import { Permission } from '../../../models/Permission';

@Component({
  selector: 'app-room-users-expansion-panel',
  templateUrl: './room-users-expansion-panel.component.html',
  styleUrls: ['./room-users-expansion-panel.component.scss']
})
export class RoomUsersExpansionPanelComponent implements OnInit {
  homeId = this.router.snapshot.params.homeId;
  roomId = this.router.snapshot.params.roomId;
  nonRoomUsers;
  tokenHeader;
  // permission = 'owner';
  permission;

  constructor(protected usersService: UserService,
    private roomsService: RoomsService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private eventsService: EventsService,
    private dialog: MatDialog,
    private auth: AuthService) {
      this.tokenHeader = auth.tokenHeader;
    }

  ngOnInit() {
    this.getUsersNonInRoom();
    this.getConnectedUserPermission();
    this.getUsers();
  }

  getUsersNonInRoom() {
    this.usersService.getUsersNonInRoom(this.tokenHeader, this.homeId, this.roomId)
    .subscribe(res => {
      this.nonRoomUsers = res;
      console.log(this.nonRoomUsers);
    }, error => {
      this.handleError(error, 'unable to get users for this room');
    });
  }

  getUsers() {
    this.usersService.getRoomUsers(this.tokenHeader, this.homeId, this.roomId);
  }

  deleteUser(userId) {
    this.usersService.removeRoomUser(this.tokenHeader, this.homeId, this.roomId, userId);
  }

  getConnectedUserPermission() {
    this.roomsService.getConnectedUserRoomPermission(this.tokenHeader, this.roomId)
    .subscribe((res: string) => {
      this.permission = res;
      console.log('hiiiiiiiiiiiiii' + this.permission);
    }, error => {
      this.handleError(error, 'Enable to get the permission for this room');
    });
  }

  editUser(user) {
    console.log('editHome');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.role = 'dialog';
    dialogConfig.height = '380px';
    dialogConfig.width = '300px';
    dialogConfig.data = {homeId: this.homeId, roomId: this.roomId, user: user};
    this.dialog.open(PersonEditComponent, dialogConfig);
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
