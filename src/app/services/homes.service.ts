import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomesService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:3000';

  getHomes(tokenHeader) {
    return this.httpClient.get(this.BASE_URL + '/user/homes', {headers: tokenHeader});
  }

  deleteHome(homeId, tokenHeader) {
    console.log('serv delete home..');
    return this.httpClient.delete(this.BASE_URL + '/user/homes/' + homeId, {headers: tokenHeader});
  }

}
