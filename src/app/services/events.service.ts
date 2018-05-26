import { Consts } from './../models/Consts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EventObj } from '../models/EventObj';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class EventsService {
  private socket;
  private eventStore: EventObj[];
  private eventSubject = new Subject();
  events = this.eventSubject.asObservable();

  private roomIdStore: String[] = [];
  private roomIdSubject = new Subject();
  roomsIds = this.roomIdSubject.asObservable();

  eventsNumbers: Number = 0;

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) {
    this.socket = io(Consts.BASE_URL);
  }

  getAllEvents() {
    return this.httpClient
      .get<EventObj[]>(Consts.BASE_URL + `/events`)
      .subscribe(
        res => {
          this.eventStore = res;
          this.eventsNumbers = this.eventStore.length;
          this.eventSubject.next(this.eventStore);
          console.log('le nombre d\'events');
          console.log(this.eventsNumbers);
        },
        error => {
          this.handleError(error, 'unable to get events');
        }
      );
  }

  addEvent(_event) {
    console.log('---------------------------------------------------------');
    return this.httpClient
      .post<EventObj>(Consts.BASE_URL + `/events`, _event)
      .subscribe(
        res => {
          this.socket.emit('add-room', _event.socketId);
          console.log(res);
          this.getAllEvents();
        },
        error => {
          this.handleError(error, 'Unable to add the Event');
        }
      );
  }

  removeEvent(eventId) {
    return this.httpClient
      .delete(Consts.BASE_URL + `/events/${eventId}`)
      .subscribe(
        res => {
          console.log(res);
          this.getAllEvents();
        },
        error => {
          this.handleError(error, 'Unable to add the Event');
        }
      );
  }

  getConnectedUserRoomsIds(tokenHeader, homeId) {
    return this.httpClient
      .get<String[]>(Consts.BASE_URL + `/user/${homeId}/roomsIds`, {
        headers: tokenHeader
      })
      .subscribe(
        res => {
          res.forEach(roomId => {
            this.socket.emit('join', { room: roomId });
          });
          this.roomIdStore = this.roomIdStore.concat(res);
          this.roomIdSubject.next(this.roomIdStore);
          console.log(this.roomIdStore);
        },
        error => {
          this.handleError(error, 'unable to get user rooms Ids');
        }
      );
  }

  getSocketRooms(tokenHeader) {
    // return this.httpClient.get<String[]>(Consts.BASE_URL + '/user/homesId', {headers: tokenHeader})
    // .subscribe(res => {
    //   console.log(res);
    //   this.roomIdStore=res;
    //   this.roomIdSubject.next(this.roomIdStore);
    //   this.roomIdStore.forEach(homeId => {
    //     this.socket.emit('join', {room:homeId});
    //     this.getConnectedUserRoomsIds(tokenHeader,homeId);
    //   });
    //   console.log(this.roomIdStore);
    // },error => {
    //   this.handleError(error, "unable to get user homes Ids")
    // });
    return this.httpClient
      .get<String[]>(Consts.BASE_URL + '/user/socketRooms', {
        headers: tokenHeader
      })
      .subscribe(
        res => {
          console.log(res);
          this.roomIdStore = res;
          this.roomIdSubject.next(this.roomIdStore);
          this.joinUserSocketRooms();
          // this.getAllEvents();
        },
        error => {
          this.handleError(error, 'Unable to get the socket\'s rooms');
        }
      );
  }

  joinSocketRoom(room) {
    this.socket.emit('join', { room: room });
  }

  leaveSocketRoom(room) {
    this.socket.emit('leave', { room: room });
  }

  public sendMessage(message) {
    this.socket.emit('room', {room: 'room', message: message});
    // this.socket.emit('remove-room', message);
  }
  private joinUserSocketRooms() {
    this.roomIdStore.forEach(socketId => {
      console.log('joining: ' + socketId);
      this.socket.emit('join', { room: socketId });
    });
  }
  // public getMessages = () => {
  //   return Observable.create(observer => {
  //     this.socket.on('add-room', message => {
  //       observer.next(message);
  //       console.log(message);
  //       this.getAllEvents();
  //     });
  //     this.socket.on('remove-room', message => {
  //       this.getAllEvents();
  //     });
  //   });
  // }

  public getEvents = () => {
    return Observable.create(observer => {
      this.socket.on('remove-room', message => {
        console.log(message);
        this.snackBar.open(message.toString(), 'close', {
          duration: 5000,
          extraClasses: ['info']
        });
      });
      this.socket.on('room', message => {
        console.log(message);
        this.snackBar.open(message.toString(), 'close', {
          duration: 5000,
          extraClasses: ['danger']
        });
      });
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {
      duration: 5000,
      extraClasses: ['blue-snackbar']
    });
  }
}
