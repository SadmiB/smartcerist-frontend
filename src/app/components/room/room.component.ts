import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { RoomService } from '../../services/room.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { IotObject } from '../../models/IotObject';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  objects;
  room;

  constructor(private roomService: RoomService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute) {

  }

  ngOnInit() {
    const roomId = this.router.snapshot.params.roomId;
    const homeId = this.router.snapshot.params.homeId;
    this.getRoom(homeId, roomId, this.getObjects);
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

  getObjects(objectsIds) {
    objectsIds.forEach(objectId => {
      this.roomService.getServerByObjectId(objectId)
        .subscribe(res => {
          const obj = this.getObject(res, objectId);
          this.objects.push(obj);
        }, error => {
          this.handleError(error, 'Unable to get objects');
        });
    });
  }


  getObject(server, objectId) {
    console.log(server);
    const theOject = new IotObject();
    server.beacons.objects.some(_object => {
        if (_object._id === objectId) {
          theOject.id = _object.id;
          theOject.name = _object.name;
          theOject.path = _object.path;
          theOject.type = _object.type.toUpperCase();
          return true;
        }
      });
      theOject.server_ipv6 = server.ipv6;
      theOject.server_lipv6 = server.lipv6;
      theOject.server_ipv4 = server.ipv4;
      theOject.server_lipv4 = server.lipv4;
      theOject.ipv6 = server.beacons[0].ipv6;
      console.log('obj2:', theOject);
      return theOject;
  }


  getRoom(homeId, roomId, callback) {
    this.roomService.getRoom(homeId, roomId)
      .subscribe(res => {
        this.room = res;
        callback(this.room.objects);
      }, error => {
        this.handleError(error, 'Unable to get room');
      });
  }

}
