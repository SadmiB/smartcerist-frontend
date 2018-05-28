import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';
import { MyServer } from '../models/MyServer';
import { Camera } from '../models/Camera';

@Injectable()
export class CamerasService {

  constructor(private httpClient: HttpClient,
    private snackBar: MatSnackBar) { }


  getServerByCameraId(cameraId) {
    console.log('get Server by camera Id');
    return this.httpClient.get<MyServer>(Consts.BASE_URL + '/cameras/' + cameraId);
  }

  addCamera(tokenHeader, serverId, camera) {
    return this.httpClient.post<Camera>(Consts.BASE_URL + `/${serverId}/cameras/`, camera, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
    }, error => {
      this.handleError(error, 'Unable to add the camera');
    })
    ;
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
