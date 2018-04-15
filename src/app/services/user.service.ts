import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Consts } from '../models/Consts';

@Injectable()
export class UserService {


  constructor(private httpClient: HttpClient) { }

  getHomeUsers(tokenHeader, homeId) {
    return this.httpClient.get(Consts.BASE_URL + '/' + homeId + '/users', {headers: tokenHeader});
  }

  getRoomUsers(tokenHeader, homeId, roomId) {
    return this.httpClient.get(Consts.BASE_URL + '/' + homeId + '/' + roomId + '/users', {headers: tokenHeader});
  }

  getUser(tokenHeader, userId) {
    return this.httpClient.get(Consts.BASE_URL + '/users/' + userId , {headers: tokenHeader});
  }
}
