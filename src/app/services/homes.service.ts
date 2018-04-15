import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';

@Injectable()
export class HomesService {

  constructor(private httpClient: HttpClient) { }


  getHomes(tokenHeader) {
    return this.httpClient.get(Consts.BASE_URL + '/user/homes', {headers: tokenHeader});
  }

  deleteHome(homeId, tokenHeader) {
    console.log('serv delete home..');
    return this.httpClient.delete(Consts.BASE_URL + '/user/homes/' + homeId, {headers: tokenHeader});
  }
}
