import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';

@Injectable()
export class RoomService {

  constructor(private httpClient: HttpClient) { }

  getServerByObjectId(objectId) {
    return this.httpClient.get(Consts.BASE_URL + '/objects/' + objectId);
  }

  getRoom(homeId, roomId) {
    return this.httpClient.get(Consts.BASE_URL + '/user/' + homeId + '/rooms/' + roomId);
  }
}