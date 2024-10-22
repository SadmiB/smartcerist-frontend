import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';
import { Home } from '../models/Home';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Rule } from '../models/Rule';

@Injectable()
export class HomesService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }
  private homeStore: Home[] = [];
  private homeSubject = new Subject();
  homes = this.homeSubject.asObservable();
  homesNumber = 0;

  private homeOwnerStore: Home[] = [];
  private homeOwnerSubject = new Subject();
  homesOwner = this.homeOwnerSubject.asObservable();

  getHomes(tokenHeader) {
    return this.httpClient.get<Home[]>(Consts.BASE_URL + '/user/homes', {headers: tokenHeader})
    .subscribe(res => {
      this.homeStore = res;
      this.homeSubject.next(this.homeStore);
      this.homesNumber = this.homeStore.length;
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
      this.showSnackBar('warning', 'The home is removed');
      this.getHomes(tokenHeader);
    }, error => {
      this.handleError(error, 'unable to remove the home');
    });
  }

  getHomeFromArray (homeId) {
    return this.homeStore.filter(home => home._id === homeId);
  }

  getRuleFromHome(homeId, ruleId) {
    const home = this.homeStore.filter(homeDes => homeDes._id === homeId)[0];
    return home.rules.filter(rule => rule._id === ruleId);
  }

  getConnectedUserHomesId (tokenHeader) {
    return this.httpClient.get(Consts.BASE_URL + '/user/homesId', {headers: tokenHeader});
  }

  addHome (tokenHeader, home) {
    this.httpClient.post<Home>(Consts.BASE_URL + '/user/homes', home, {headers: tokenHeader})
    .subscribe(res => {
      this.showSnackBar('success', 'The home is added');
      this.getHomes(tokenHeader);
    }, error => {
      this.handleError(error, 'Unable to add home!');
    });
  }


  updateHome(tokenHeader, homeId, home) {
    this.httpClient.put<Home>(Consts.BASE_URL + `/user/homes/${homeId}`, home, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.showSnackBar('info', 'The home is updated');
      this.getHomes(tokenHeader);
    }, error => {
      this.handleError(error, 'Unable to add home!');
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  showSnackBar(classType, message) {
    const config = new MatSnackBarConfig();
    config.panelClass = [classType];
    config.duration = 3000;
    config.direction = 'ltr';
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'close', config);
  }
}
