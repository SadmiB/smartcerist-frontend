import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HomesService {

  constructor(private httpClient: HttpClient, private snackBar:MatSnackBar) { }


  getHomes(tokenHeader) {
    return this.httpClient.get(Consts.BASE_URL + '/user/homes', {headers: tokenHeader});
  }

  deleteHome(homeId, tokenHeader) {
    console.log('serv delete home..');
    return this.httpClient.delete(Consts.BASE_URL + '/user/homes/' + homeId, {headers: tokenHeader});
  }

  getConnectedUserHomesId (tokenHeader){
    return this.httpClient.get(Consts.BASE_URL + '/user/homesId', {headers: tokenHeader});
  }

  getConnectedUserHomes (tokenHeader){
    return this.httpClient.get(Consts.BASE_URL + '/user/homes', {headers: tokenHeader});
  }

  addHome(tokenHeader,home){
    this.httpClient.post<any>(Consts.BASE_URL + '/user/homes', home, {headers:tokenHeader})
    .subscribe(res => {
     res;
    }, error => {
      this.handleError(error, 'Unable to add home!');
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
