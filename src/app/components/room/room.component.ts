import { Component, OnInit, Input } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { RoomService } from '../../services/room.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { IotObject } from '../../models/IotObject';
import { UpperCasePipe } from '@angular/common';
import { ObjectsService } from '../../services/objects.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  objects = [];
  room;

  /*

  responseLed: string;
  responseLigth: string;
  responsePresence: string;

   */

  constructor(private roomService: RoomService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private objectsService: ObjectsService) {

  }

  ngOnInit() {
    const roomId = this.router.snapshot.params.roomId;
    const homeId = this.router.snapshot.params.homeId;
    this.getRoom(homeId, roomId);

    this.objects.forEach(object => {
      this.getObjectMesure(object);
    });

    // const canvas = document.getElementById('canvas');
    // const  client = new WebSocket('ws://10.0.88.57:9999');
    // const  player = new jsmpeg(client, { canvas: canvas });
  }



  async getObjectMesure(object) {
    console.log('getObjectMesure...');
    await this.objectsService.getObjectMesure(object)
    .subscribe(res => {
      object.mesure = res;
      object.status = 'CONNECTED';
    }, error => {
      object.status = 'DISSSCONNECTED';
      this.handleError(error, `Unable to get ${object.name} value`);
    });
  }


  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

  async getObjects(objectsIds) {
    console.log('getObjects...');
    await objectsIds.forEach(objectId => {
      console.log('getObjects...', objectId);
      this.roomService.getServerByObjectId(objectId)
        .subscribe(res => {
          const server = res;
          console.log('getObjects server: ', server);
          const object = this.getObject(server, objectId);
          this.objects.push(object);
          console.log('this.objects:' , this.objects);
        }, error => {
          this.handleError(error, 'Unable to get objects');
      });
    });
  }


  getObject(server, objectId) {
    console.log('getObject server: ', server);
    const theOject = new IotObject();
    server.beacons[0].objects.some(object => {
        if (object._id === objectId) {
          theOject.id = object._id;
          theOject.name = object.name;
          theOject.path = object.path;
          theOject.type = object.type.toUpperCase();
          return true;
        }
      });
      theOject.server_ipv6 = server.ipv6;
      theOject.server_lipv6 = server.lipv6;
      theOject.server_ipv4 = server.ipv4;
      theOject.server_lipv4 = server.lipv4;
      theOject.ipv6 = server.beacons[0].ipv6;
      console.log('obj: ', theOject);
      return theOject;
  }


  async getRoom(homeId, roomId) {
    await this.roomService.getRoom(homeId, roomId)
      .subscribe(res => {
        this.room = res;
        this.getObjects(this.room.objects);
      }, error => {
        this.handleError(error, 'Unable to get room');
      });
  }
}
