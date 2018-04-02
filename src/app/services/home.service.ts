import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:3000';

  getHomes(userId) {
    return this.httpClient.get( this.BASE_URL + '/' + userId + '/homes');
  }

}
