import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from '../models/User';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Consts } from '../models/Consts';
import { Room } from '../models/Room';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient,
    private snackBar:MatSnackBar) { }

  private userStore : User[];
  private userSubject = new Subject();
  users = this.userSubject.asObservable();
  
  private allUserStore : User[];
  private allUserSubject = new Subject();
  allUser = this.allUserSubject.asObservable();

  getAllUsers(tokenHeader) {
    return this.httpClient.get<User[]>(Consts.BASE_URL +'/users', {headers: tokenHeader});
  }

  getUsersNonInRoom(tokenHeader,homeId,roomId) {
    return this.httpClient.get<User[]>(Consts.BASE_URL +`/${homeId}/${roomId}/nonUsers`, {headers: tokenHeader});
  }

  getHomeUsers(tokenHeader, homeId) {
    return this.httpClient.get<User[]>(Consts.BASE_URL + '/' + homeId + '/users', {headers: tokenHeader})
    .subscribe(res => {
      this.userStore=res;
      console.log(res);
      this.userSubject.next(this.userStore);
    },error=>{
      this.handleError(error,"unable to get users");
    });
  }

  getRoomUsers(tokenHeader, homeId, roomId) {
    return this.httpClient.get<User[]>(Consts.BASE_URL + '/' + homeId + '/' + roomId + '/users', {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.userStore=res;
      this.userSubject.next(this.userStore);
    },error=>{
      this.handleError(error,"unable to get users");
    });
  }

  getRoomTabUsers(tokenHeader, homeId, roomId) {
    return this.httpClient.get<User[]>(Consts.BASE_URL + '/' + homeId + '/' + roomId + '/users', {headers: tokenHeader});
  }

  getUserById(tokenHeader,userId){
    return this.httpClient.get(Consts.BASE_URL + '/users/' + userId , {headers:tokenHeader});
  }
  

  getUserProfile(tokenHeader){
    return this.httpClient.get(Consts.BASE_URL + '/users/user' , {headers:tokenHeader});
  }
  
  updateUser(tokenHeader,userId){
    return this.httpClient.put(Consts.BASE_URL + '/users/' + userId , {headers:tokenHeader});
  }

  updateUserProfile(tokenHeader,user){
      this.httpClient.put<User>(Consts.BASE_URL + '/users/user', user , {headers:tokenHeader})
      .subscribe(res => {
       res;
      }, error => {
        this.handleError(error, 'Unable to update user profile!');
      });
  }
  
  removeUser(tokenHeader,userId){
    return this.httpClient.delete(Consts.BASE_URL + '/users/' + userId , {headers:tokenHeader});
  }

  removeRoomUser(tokenHeader,homeId,roomId,userId){
    return this.httpClient.delete(Consts.BASE_URL + `/${homeId}/${roomId}/users/${userId}`, {headers:tokenHeader})
    .subscribe((res : User) => {
      res;
    }, error => {
      this.handleError(error, "unable to remove the user from ther room")
    })
  }

  removeUserAccount(tokenHeader){
    return this.httpClient.delete(Consts.BASE_URL + '/users/user' , {headers:tokenHeader});
  }

  addUser(tokenHeader,userId){
    return this.httpClient.post<User>(Consts.BASE_URL + '/users', {headers:tokenHeader})
    // .subscribe(res => {
    //   console.log(res);
    //   this.userStore.push(res);
    //   this.userSubject.next(this.userStore);
    // }, error => {
    //   this.handleError(error, 'Unable to add user!');
    // });
}  

addUserToRoom(tokenHeader,userId,user){
  console.log("i'm here");
  return this.httpClient.put(Consts.BASE_URL + `/rooms/room/users/${userId}`,user , {headers:tokenHeader})
  .subscribe(res => {
    res;
  },error => {
    this.handleError(error,"Unable to add the User to the Room")
  });
}  



  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
