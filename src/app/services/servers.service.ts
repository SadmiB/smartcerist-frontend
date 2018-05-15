import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Server } from '../models/Serser';

@Injectable()
export class ServersService {

  private serverStore: Server[];
  private serverSubject = new Subject();
  servers = this.serverSubject.asObservable();

  constructor(private httpClient: HttpClient, private snackBar:MatSnackBar) { }

  getHomeServers(tokenHeader, homeId) {
    return this.httpClient.get(Consts.BASE_URL + '/' + homeId + '/servers', {headers:tokenHeader});
  }

  getHomeServer(tokenHeader, homeId, serverId){
    return this.httpClient.get(Consts.BASE_URL + '/' + homeId + '/servers/' + serverId, {headers:tokenHeader});
  }

  updateHomeServer(tokenHeader, homeId, serverId){
    return this.httpClient.put(Consts.BASE_URL + '/' + homeId + '/servers/' + serverId, {headers:tokenHeader});
  }

  removeHomeServer(tokenHeader, homeId, serverId){
    return this.httpClient.delete(Consts.BASE_URL + '/' + homeId + '/servers'+ '/' + serverId, {headers:tokenHeader})
    .subscribe(res =>{ 
      res;      
    },error=>{
      this.handleError(error,'Unable to remove the server')
    });
  }
  addHomeServer(tokenHeader,homeId,server){
    this.httpClient.post(Consts.BASE_URL  + '/' + homeId + '/servers', server, {headers:tokenHeader})
    .subscribe(res => {
     console.log(res);
    }, error => {
      this.handleError(error, 'Unable to add Server!');
    });
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});

  }

}
