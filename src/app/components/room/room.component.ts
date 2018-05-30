import { Permission } from './../../models/Permission';
import { Component, OnInit, Input } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { RoomService } from '../../services/room.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { IotObject } from '../../models/IotObject';
import { UpperCasePipe } from '@angular/common';
import { CamerasService } from '../../services/cameras.service';
import { RoomsService } from '../../services/rooms.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  objectsIds: string[] = [];
  camerasIds: string[] = [];
  room;
  roomId;
  homeId;
  permission;
  tokenHeader;
  constructor(private roomService: RoomService,
    private auth: AuthService,
    private roomsService: RoomsService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute) {
      this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.roomId = this.router.snapshot.params.roomId;
    this.homeId = this.router.snapshot.params.homeId;
    this.getRoom(this.homeId, this.roomId);
  }

  getUserPermission() {
    this.roomsService.getConnectedUserRoomPermission(this.tokenHeader, this.roomId)
    .subscribe((res: Permission) => {
      this.permission = res;
    }, error => {
      this.handleError(error, 'Enable to get the permission for this room');
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

  getRoom(homeId, roomId) {
    this.roomService.getRoom(homeId, roomId)
    .subscribe(res => {
      this.objectsIds = res.objects;
      this.camerasIds = res.cameras;
    }, error => {
      this.handleError(error, 'Unable to get room');
    });
  }

}
