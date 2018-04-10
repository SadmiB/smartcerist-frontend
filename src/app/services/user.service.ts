import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable()
export class UserService {
  
  BASE_URL ='http://localhost:3000';

  constructor(private httpClient : HttpClient) { }

  getHomeUsers(tokenHeader, homeId){
    return this.httpClient.get(this.BASE_URL + '/' + homeId +'/users',{headers: tokenHeader});
  }

  getRoomUsers(tokenHeader, homeId, roomId){
    return this.httpClient.get(this.BASE_URL + '/' + homeId + '/' + roomId + '/users',{headers: tokenHeader});
  }

  getUser(tokenHeader,userId){
    return this.httpClient.get(this.BASE_URL + '/users/'+ userId , {headers:tokenHeader});
  }
}
