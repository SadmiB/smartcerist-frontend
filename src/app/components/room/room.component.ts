import { HomesService } from './../../services/homes.service';
import { Permission } from './../../models/Permission';
import { Component, OnInit, Input } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { RoomService } from '../../services/room.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { IotObject } from '../../models/IotObject';
import { UpperCasePipe } from '@angular/common';
import { CamerasService } from '../../services/cameras.service';
import { RoomsService } from '../../services/rooms.service';
import { AuthService } from '../../services/auth.service';
import { WarningDiagComponent } from '../warning-diag/warning-diag.component';
import { ServersService } from '../../services/servers.service';


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
  nonAffectedObject = [];
  home;
  servers ;
  constructor(private roomService: RoomService,
        private auth: AuthService,
        private roomsService: RoomsService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private route: Router,
        private router: ActivatedRoute,
        protected serversService: ServersService,
        private homesService: HomesService,
        private camerasService: CamerasService) {
      this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.roomId = this.router.snapshot.params.roomId;
    this.homeId = this.router.snapshot.params.homeId;
    this.home = this.homesService.getConnectedUserHomesId(this.homeId);
    this.getRoom(this.homeId, this.roomId);
    this.serversService.getHomeServers(this.tokenHeader, this.homeId);
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

  removeObject(object) {
    const dialogRef = this.dialog.open(WarningDiagComponent, {
      width: '250px',
      data : {message : 'Are you sure to remove ' + object.name},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          console.log('The dialog was closed');
          this.roomsService.removeObjectFromRoom(this.tokenHeader, this.homeId, this.roomId, object._id);
          this.route.navigate([`/dashboard/homes/${this.homeId}/rooms/${this.roomId}`]);
      }
    });
  }

  objectNonAffected(objectId) {
    let result = true;
    this.home.rooms.forEach(room => {
      if (room.objects.includes(objectId)) {
        result = false;
      }
    });
    return result;
  }

  addObjectToRoom(objectId) {
    this.roomsService.addObjectToRoom(this.tokenHeader, this.homeId, this.roomId, objectId );
  }

  cameraNonAffected(cameraId) {
    let result = true;
    this.home.rooms.forEach(room => {
      if (room.cameras.includes(cameraId)) {
        result = false;
      }
    });
    return result;
  }

  addCameraToRoom(cameraId) {
    this.camerasService.addCameraToRoom(this.tokenHeader, this.homeId, this.roomId, cameraId );
}

}
