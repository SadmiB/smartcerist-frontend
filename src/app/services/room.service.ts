import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';
import { Subject } from 'rxjs/Subject';
import { Room } from '../models/Room';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class RoomService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  getRoom(homeId, roomId) {
    return this.httpClient.get<Room>(Consts.BASE_URL + '/user/' + homeId + '/rooms/' + roomId);
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

}
