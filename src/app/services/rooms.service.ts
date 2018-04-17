import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';
import { Consts } from '../models/Consts';

@Injectable()
export class RoomsService {


  tokenHeader;
  rooms;

  constructor(private httpClient: HttpClient) {}


  getRooms(homeId, tokenHeader) {
    return this.httpClient.get(Consts.BASE_URL + `/user/${homeId}/rooms`, {headers: tokenHeader});
  }

  getUserRoomPermission(homeId,roomId,userId, tokenHeader) {
    return this.httpClient.get(Consts.BASE_URL + `/${homeId}/${roomId}/permission/${userId}`, {headers: tokenHeader});
  }
}
