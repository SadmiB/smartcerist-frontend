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

  getUserById(tokenHeader,userId){
    return this.httpClient.get(this.BASE_URL + '/users/' + userId , {headers:tokenHeader});
  }

  getUserProfile(tokenHeader){
    return this.httpClient.get(this.BASE_URL + '/users/user' , {headers:tokenHeader});
  }
  
  updateUser(tokenHeader,userId){
    return this.httpClient.put(this.BASE_URL + '/users/' + userId , {headers:tokenHeader});
  }

  updateUserProfile(tokenHeader){
    return this.httpClient.put(this.BASE_URL + '/users/user' , {headers:tokenHeader});
  }
  
  removeUser(tokenHeader,userId){
    return this.httpClient.delete(this.BASE_URL + '/users/' + userId , {headers:tokenHeader});
  }

  removeRoomUser(tokenHeader,homeId,roomId,userId){
    return this.httpClient.delete(this.BASE_URL + `/${homeId}/${roomId}/users/${userId}`, {headers:tokenHeader});
  }

  removeUserAccount(tokenHeader){
    return this.httpClient.delete(this.BASE_URL + '/users/user' , {headers:tokenHeader});
  }

  addUser(tokenHeader,userId){
    return this.httpClient.post(this.BASE_URL + '/users', {headers:tokenHeader});
  }

  
}
