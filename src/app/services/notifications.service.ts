import { Consts } from './../models/Consts';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { MyNotification } from '../models/MyNotification';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotificationsService {

  BASE_URL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }
  private notificationStore: MyNotification[] = [];
  private notificationSubject = new Subject();
  notifications = this.notificationSubject.asObservable();
  private allNotificationsStore: MyNotification[] = [];
  private allNotificationsSubject = new Subject();
  allNotifications = this.allNotificationsSubject.asObservable();
  notifsNumber = 0;

  getNotifications(tokenHeader) {
    return this.httpClient.get<MyNotification[]>(Consts.BASE_URL + `/user/notifications/all`, {headers: tokenHeader})
    .subscribe(res => {
      this.allNotificationsStore = res;
      this.allNotificationsSubject.next(this.allNotificationsStore);
      this.setAllNotificationsTrue(tokenHeader);
    }, error => {
      this.handleError(error, 'Unable to get notifications');
    });
  }

  getNotificationsBtn(tokenHeader) {
    return this.httpClient.get<MyNotification[]>(Consts.BASE_URL + `/user/notifications`, {headers: tokenHeader})
    .subscribe(res => {
      this.notificationStore = res;
      this.notificationSubject.next(this.notificationStore);
      this.notifsNumber = this.notificationStore.length;
    }, error => {
      this.handleError(error, 'Unable to get notifications');
    });
  }
  setAllNotificationsTrue(tokenHeader) {
    const seen = true;
    return this.httpClient.put<MyNotification[]>(Consts.BASE_URL + `/user/notifications`, seen, {headers: tokenHeader})
    .subscribe(res => {
      this.notifsNumber = 0;
    }, error => {
      this.handleError(error, 'Unable to get notifications');
    });
  }

  setNotificationSeen(tokenHeader, notificationId) {
    const seen = true;
    return this.httpClient.put<MyNotification[]>(Consts.BASE_URL + `/user/notifications/${notificationId}`, seen, {headers: tokenHeader});
  }

  removeNotification(tokenHeader, notificationId) {
    return this.httpClient.delete<MyNotification[]>(Consts.BASE_URL + `/user/notifications/${notificationId}`, {headers: tokenHeader})
    .subscribe(res => {
      this.allNotificationsStore = res;
      this.allNotificationsSubject.next(this.allNotificationsStore);
    }, error => {
      this.handleError(error, 'Uable to remove the notification');
    });
  }

  private handleError(error, message) {
    console.log(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

}
