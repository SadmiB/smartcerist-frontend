import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IotObject } from '../../models/IotObject';
import { CamerasService } from '../../services/cameras.service';
import { Camera } from '../../models/Camera';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.component.html',
  styleUrls: ['./cameras.component.scss']
})
export class CamerasComponent implements OnInit, OnChanges {

  @Input() camerasIds: string[];

  cameras: Camera[] = [];

  constructor(private camerasService: CamerasService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  ngOnChanges(change: SimpleChanges) {
    if (change['camerasIds'] && this.camerasIds) {
      this.getCameras(this.camerasIds);
    }
  }


  getCameraStream(camera) {
    const canvas = document.getElementById('canvas');
    const client = new WebSocket('ws://localhost:9999');
    const player = new jsmpeg(client, { canvas: canvas });
  }

  getCameras(camerasIds) {
    camerasIds.forEach(cameraId => {
      this.camerasService.getServerByCameraId(cameraId)
      .subscribe(res => {
            const server = res;
            const camera = server.cameras[0];
            camera.server_ip4 = server.ipv4;
            camera.server_ip6 = server.ipv6;
            this.cameras.push(camera);
            console.log('cameras:', camera);
            this.getCameraStream('camera');
      }, error => {
            this.handleError(error, 'Unable to get cameras');
      });
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

}
