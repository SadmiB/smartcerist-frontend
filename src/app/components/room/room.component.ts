import { Component, OnInit, Input } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { RoomService } from '../../services/room.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { IotObject } from '../../models/IotObject';
import { UpperCasePipe } from '@angular/common';
import { ObjectsService } from '../../services/objects.service';
import { CamerasService } from '../../services/cameras.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  objects: IotObject[] = [];
  cameras = [];
  room;
  roomId;
  homeId;
  constructor(private roomService: RoomService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private objectsService: ObjectsService,
    private camerasService: CamerasService) {

    }

    ngOnInit() {
      this.roomId = this.router.snapshot.params.roomId;
      this.homeId = this.router.snapshot.params.homeId;
      this.getRoom(this.homeId, this.roomId);
    }

  getCameraStream(camera) {
    camera.canvas = document.getElementById('canvas' + camera._id);
    camera.client = new WebSocket(`ws://${camera.server_ip4}:${camera.port}`);
    camera.player = new jsmpeg(camera.client, { canvas: camera.canvas });
  }

  putLed(obj) {
    let val;
    this.getObjectMeasure(obj);
    if (obj.measure === '1') {
      val = '0';
    } else {
      val = '1';
    }
    console.log('putLed..', val);
    this.objectsService.putLed(val)
    .subscribe(res => {
      this.getObjectMeasure(obj);
    }, error => {
      this.handleError(error, 'Unable to toggle led');
    });
  }

  async getObjectMeasure(object) {
    console.log('getObjectMeasure...');
      await this.objectsService.getObjectMeasure(object)
    .subscribe(res => {
      object.measure = res;
      object.status = 'Connected';
    }, error => {
      object.status = 'Disconnected';
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
      this.objectsService.getServerByObjectId(objectId)
        .subscribe(res => {
          const server = res;
          console.log('getObjects server: ', server);
          const object = this.getObject(server, objectId);
          this.objects.push(object);
          console.log('this.objects:' , this.objects);
          this.getObjectMeasure(object);
        }, error => {
          this.handleError(error, 'Unable to get objects');
      });
    });
  }

  async getCameras(camerasIds) {
    await camerasIds.forEach(cameraId => {
      this.camerasService.getServerByCameraId(cameraId)
      .subscribe(res => {
            const server = res;
            const camera = server.cameras[0];
            camera.server_ip4 = server.ipv4;
            camera.server_ip6 = server.ipv6;
            this.cameras.push(camera);
            this.getCameraStream(camera);
        }, error => {
        this.handleError(error, 'Unable to get cameras');
      });
    });
  }

  getObject(server, objectId) {
    console.log('getObject server: ', server);
    const theOject = new IotObject();
    server.beacons[0].objects.some(object => {
        if (object._id === objectId) {
          theOject._id = object._id;
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
        // this.getCameras(this.room.cameras);
      }, error => {
        this.handleError(error, 'Unable to get room');
      });
  }
}
