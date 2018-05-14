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

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar) { }

  getHomeServers(tokenHeader, homeId) {
    return this.httpClient.get<Server[]>(Consts.BASE_URL + '/' + homeId + '/servers', {headers: tokenHeader})
    .subscribe(res => {
      this.serverStore = res;
      this.serverSubject.next(this.serverStore);
    }
    , error => {
      this.handleError(error, 'Servers unreachable');
    });
  }

  getHomeStaticServers(tokenHeader, homeId) {
    return this.httpClient.get<Server[]>(Consts.BASE_URL + '/' + homeId + '/servers', {headers: tokenHeader});
  }

  getHomeServer(tokenHeader, serverId) {
    return this.httpClient.get(Consts.BASE_URL + '/servers/' + serverId, {headers: tokenHeader});
  }

  updateHomeServer(tokenHeader, serverId, server, homeId) {
    return this.httpClient.put(Consts.BASE_URL + '/servers/' + serverId, server, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.getHomeServers(tokenHeader, homeId);
     }, error => {
       this.handleError(error, 'Unable to add Server!');
     });
  }

  removeHomeServer(tokenHeader, homeId, serverId) {
    return this.httpClient.delete(Consts.BASE_URL + '/' + homeId + '/servers' + '/' + serverId, {headers : tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.getHomeServers(tokenHeader, homeId);
    }, error => {
      this.handleError(error, 'Unable to remove the server');
    });
  }

  addHomeServer(tokenHeader, homeId, server) {
    this.httpClient.post(Consts.BASE_URL  + '/' + homeId + '/servers', server, {headers: tokenHeader})
    .subscribe(res => {
     console.log(res);
     this.getHomeServers(tokenHeader, homeId);
    }, error => {
      this.handleError(error, 'Unable to add Server!');
    });
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});

  }

}
