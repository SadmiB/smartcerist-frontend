import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class RoomsService {

  BASE_URL = 'http://localhost:3000';
  tokenHeader;
  rooms;

  constructor(private httpClient: HttpClient) {}


  getRooms(homeId, tokenHeader) {
    return this.httpClient.get(this.BASE_URL + `/user/${homeId}/rooms`, {headers: tokenHeader});
  }

  getUserRoomPermission(homeId,roomId,userId, tokenHeader) {
    return this.httpClient.get(this.BASE_URL + `/${homeId}/${roomId}/permission/${userId}`, {headers: tokenHeader});
  }
}
