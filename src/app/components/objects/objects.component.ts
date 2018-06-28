import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ObjectsService } from '../../services/objects.service';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { IotObject } from '../../models/IotObject';
import { ObjectSettingsComponent } from './object-settings/object-settings.component';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.scss']
})
export class ObjectsComponent implements OnInit, OnChanges {

  @Input() objectsIds: string[] = [];
  objects: IotObject[] = [];
  constructor(
    private objectsService: ObjectsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['objectsIds'] && this.objectsIds) {
      this.getObjects(this.objectsIds);
    }
  }

  showDialog(obj) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.role = 'dialog';
    dialogConfig.height = '320px';
    dialogConfig.width = '320px';
    dialogConfig.data = {object: obj};
    this.dialog.open(ObjectSettingsComponent, dialogConfig);
  }

  toggleObject(obj) {

    this.objectsService.getObjectMeasure(obj)
    .subscribe( res => {
      obj.measure = res;
      this.objectsService.toggleObject(obj)
      .subscribe(resp => {
        obj.measure = resp;
      }, error => {
        this.handleError(error, 'Unable to toggle led');
      });
    });
  }

  getObjectMeasure(object) {
    console.log('getObjectMeasure...');
    this.objectsService.getObjectMeasure(object)
    .subscribe(res => {
      object.measure = res;
    }, error => {
      object.measure = 'Disconnected';
      this.handleError(error, `Unable to get ${object.name} value`);
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

  getObjects(objectsIds) {
    console.log('getObjects...');
    objectsIds.forEach(objectId => {
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

  getObject(server, objectId) {
    console.log('getObject server: ', server);
    const theOject = new IotObject();
    server.beacons[0].objects.some(object => {
        if (object._id === objectId) {
          theOject._id = object._id;
          theOject.name = object.name;
          theOject.path = object.path;
          theOject.type = object.type.toUpperCase();
          theOject.min_threshold = object.min_threshold;
          theOject.max_threshold = object.max_threshold;
          return true;
        }
      });
      theOject.server_ipv6 = server.ipv6;
      theOject.server_lipv6 = server.lipv6;
      theOject.server_ipv4 = server.ipv4;
      theOject.server_lipv4 = server.lipv4;
      theOject.ipv6 = server.beacons[0].ipv6;
      theOject.server_id = server._id;
      theOject.beacon_id = server.beacons[0]._id;
      console.log('obj: ', theOject);
      return theOject;
  }
}
