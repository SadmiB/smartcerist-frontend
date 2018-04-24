import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material';
import { Consts } from '../models/Consts';

@Injectable()
export class RoomsService {


  tokenHeader;
  rooms;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {}


  getRooms( tokenHeader,homeId) {
    return this.httpClient.get(Consts.BASE_URL + `/user/${homeId}/rooms`, {headers: tokenHeader});
  }

  getUserRoomPermission(homeId,roomId,userId, tokenHeader) {
    return this.httpClient.get(Consts.BASE_URL + `/${homeId}/${roomId}/permission/${userId}`, {headers: tokenHeader});
  }

  addRoom(tokenHeader,homeId,room){
    this.httpClient.post<any>(Consts.BASE_URL + `/user/${homeId}/rooms`, room, {headers:tokenHeader})
    .subscribe(res => {
     res;
    }, error => {
      this.handleError(error, 'Unable to add home!');
    });
  }

  removeRoom(tokenHeader,homeId,roomId){
    return this.httpClient.delete(Consts.BASE_URL + `/user/${homeId}/rooms/${roomId}` , {headers:tokenHeader});
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
