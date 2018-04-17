<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, Input } from '@angular/core';
>>>>>>> ae33fc5dde3084793413457e756b214a9ed58c67
import { forEach } from '@angular/router/src/utils/collection';
import { RoomService } from '../../services/room.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { IotObject } from '../../models/IotObject';
import { UpperCasePipe } from '@angular/common';

<<<<<<< HEAD
=======

>>>>>>> ae33fc5dde3084793413457e756b214a9ed58c67
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  objects;
  room;

<<<<<<< HEAD
=======
  /*** */

  responseLed: string;
  responseLigth: string;
  responsePresence: string;

  /** */

>>>>>>> ae33fc5dde3084793413457e756b214a9ed58c67
  constructor(private roomService: RoomService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute) {

  }

  ngOnInit() {
<<<<<<< HEAD
    const roomId = this.router.snapshot.params.roomId;
    const homeId = this.router.snapshot.params.homeId;
    this.getRoom(homeId, roomId, this.getObjects);
  }

=======
    // const roomId = this.router.snapshot.params.roomId;
    // const homeId = this.router.snapshot.params.homeId;
    // this.getRoom(homeId, roomId, this.getObjects);

    this.getLed();
    this.getLigth();
    // this.getPresence();

    const canvas = document.getElementById('canvas');
    const  client = new WebSocket('ws://10.0.88.57:9999');
    const  player = new jsmpeg(client, { canvas: canvas });
  }


  /********** */
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

  /********* */


>>>>>>> ae33fc5dde3084793413457e756b214a9ed58c67
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
