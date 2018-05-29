import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Consts } from '../models/Consts';
import { Room } from '../models/Room';
import { Subject } from 'rxjs/Subject';
import { EventsService } from './events.service';
import { EventObj } from '../models/EventObj';

@Injectable()
export class RoomsService {

  private roomStore: Room[] = [];
  private roomSubject = new Subject();
  rooms = this.roomSubject.asObservable();

  constructor(private httpClient: HttpClient,
    private eventsService: EventsService,
    private snackBar: MatSnackBar) {}


  getRooms( tokenHeader, homeId) {
    return this.httpClient.get<Room[]>(Consts.BASE_URL + `/user/${homeId}/rooms`, {headers: tokenHeader})
    .subscribe(res => {
      this.roomStore = res;
      console.log(res);
      this.roomSubject.next(this.roomStore);
    }, error => {
      this.handleError(error, 'unable to get rooms');
    });
  }

  getUserRoomPermission(tokenHeader, roomId, userId) {
    return this.httpClient.get(Consts.BASE_URL + `/rooms/${roomId}/users/permission/${userId}`, {headers: tokenHeader});
  }
  getConnectedUserRoomPermission(tokenHeader, roomId) {
    return this.httpClient.get(Consts.BASE_URL + `/rooms/${roomId}/permission/user`, {headers: tokenHeader});
  }

  addRoom(tokenHeader, homeId, room) {
    this.httpClient.post<Room>(Consts.BASE_URL + `/user/${homeId}/rooms`, room, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.showSnackBar('success', 'The room is added');
      this.getRooms(tokenHeader, homeId);
    }, error => {
      this.handleError(error, 'Unable to add room!');
    });
  }

  updateRoom(tokenHeader, homeId, roomId, room) {
    this.httpClient.put<Room>(Consts.BASE_URL + `/user/${homeId}/rooms/${roomId}`, room, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.showSnackBar('info', 'The room is updated');
      this.getRooms(tokenHeader, homeId);
    }, error => {
      this.handleError(error, 'Unable to add room!');
    });
  }

  removeRoom(tokenHeader, homeId, roomId) {
    return this.httpClient.delete(Consts.BASE_URL + `/user/${homeId}/rooms/${roomId}` , {headers: tokenHeader})
    .subscribe(res => {
      this.showSnackBar('warning', 'The room is removed');
      this.getRooms(tokenHeader, homeId);
    }, error => {
      this.handleError(error, 'unable to remove the room');
    });
  }

  addObjectToRoom(tokenHeader, homeId, roomId, objectId) {
    return this.httpClient.post(Consts.BASE_URL + `/${homeId}/rooms/${roomId}/objects/${objectId}`, objectId, {headers: tokenHeader})
    .subscribe(res =>  {
      console.log(res);
    },
      error => {
        this.handleError(error, 'Unable to add the object to the room');
      });
  }

  removeObjectFromRoom(tokenHeader, homeId, roomId, objectId) {
    return this.httpClient.delete(Consts.BASE_URL + `/${homeId}/rooms/${roomId}/objects/${objectId}` , {headers: tokenHeader})
    .subscribe( res => res,
    error => {
      this.handleError(error, 'Unalbe to remove the object');
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  showSnackBar(classType, message) {
    const config = new MatSnackBarConfig();
    config.extraClasses = [classType];
    config.duration = 3000;
    config.direction = 'ltr';
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'close', config);
  }
}
