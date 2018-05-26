import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';
import { Home } from '../models/Home';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class HomesService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }
  private homeStore: Home[] = [];
  private homeSubject = new Subject();
  homes = this.homeSubject.asObservable();

  private homeOwnerStore: Home[] = [];
  private homeOwnerSubject = new Subject();
  homesOwner = this.homeOwnerSubject.asObservable();

  getHomes(tokenHeader) {
    return this.httpClient.get<Home[]>(Consts.BASE_URL + '/user/homes', {headers: tokenHeader})
    .subscribe(res => {
      this.homeStore = res;
      this.homeSubject.next(this.homeStore);
    }, error => {
      this.handleError(error, 'unable to get homes');
    });
  }

  getOwnerHomes(tokenHeader) {
    return this.httpClient.get<Home[]>(Consts.BASE_URL + '/owner/homes', {headers: tokenHeader})
    .subscribe(res => {
      this.homeOwnerStore = res;
      this.homeOwnerSubject.next(this.homeOwnerStore);
      console.log(res);
    }, error => {
      this.handleError(error, 'unable to get homes');
    });
  }

  deleteHome(tokenHeader, homeId) {
    console.log('serv delete home..');
    this.httpClient.delete<Home>(Consts.BASE_URL + '/user/homes/' + homeId, {headers: tokenHeader})
    .subscribe((res: Home) => {
      this.getHomes(tokenHeader);
    }, error => {
      this.handleError(error, 'unable to remove the home');
    });
  }

  getHomeFromArray (homeId) {
    return this.homeStore.filter(home => home._id === homeId);
  }

  getConnectedUserHomesId (tokenHeader) {
    return this.httpClient.get(Consts.BASE_URL + '/user/homesId', {headers: tokenHeader});
  }

  addHome (tokenHeader, home) {
    this.httpClient.post<Home>(Consts.BASE_URL + '/user/homes', home, {headers: tokenHeader})
    .subscribe(res => {
      this.getHomes(tokenHeader);
    }, error => {
      this.handleError(error, 'Unable to add home!');
    });
  }

  updateHome(tokenHeader, homeId, home) {
    this.httpClient.put<Home>(Consts.BASE_URL + `/user/homes/${homeId}`, home, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.getHomes(tokenHeader);
    }, error => {
      this.handleError(error, 'Unable to add home!');
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
