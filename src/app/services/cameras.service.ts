import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';
import { MyServer } from '../models/MyServer';

@Injectable()
export class CamerasService {

  constructor(private httpClient: HttpClient) { }


  getServerByCameraId(cameraId) {
    console.log('get Server by camera Id');
    return this.httpClient.get<MyServer>(Consts.BASE_URL + '/cameras/' + cameraId);
  }

}
