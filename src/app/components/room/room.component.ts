import { Component, OnInit, Input } from '@angular/core';
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

  objects = [];
  room;

  /*
  responseLed: string;
  responseLigth: string;
  responsePresence: string;
   */

  constructor(private roomService: RoomService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute) {

  }

  ngOnInit() {
    const roomId = this.router.snapshot.params.roomId;
    const homeId = this.router.snapshot.params.homeId;
    this.getRoom(homeId, roomId);

    // this.getLed();
    // this.getLigth();
    // this.getPresence();
    // const canvas = document.getElementById('canvas');
    // const  client = new WebSocket('ws://10.0.88.57:9999');
    // const  player = new jsmpeg(client, { canvas: canvas });
  }


  /**
  // led
  getLed() {
    this.roomService.getLed()
    .subscribe(res => this.responseLed = res);
    console.log('getLed led=' + this.responseLed);
  }
  putLed(val): void {
    if ( val === '1') {
      val = '0';
    } else {
      val = '1';
    }
    this.roomService.putLed(val)
    .subscribe(_ => this.getLed());
    console.log(`comp putLed called...${val}`);
  }
  // ligth
  getLigth() {
    this.roomService.getLigth()
    .subscribe(res => this.responseLigth = res);
    // if (this.responseLed === '1') {
    //   if (Number(this.responseLigth) > 500) {
    //     this.putLed('0');
    //     console.log('set light to 0');
    //   }
    // } else if (this.responseLed === '0') {
    //     if (Number(this.responseLigth) < 500) {
    //       this.putLed('1');
    //       console.log('set light to 1');
    //     }
    // }
  }
  // presence
  getPresence() {
    this.roomService.getPresence()
    .subscribe(res => this.responsePresence = res);
  }
  */


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