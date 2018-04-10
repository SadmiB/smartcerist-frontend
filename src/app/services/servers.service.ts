import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ServersService {

  BASE_URL='http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getHomeServers(tokenHeader, homeId){
    return this.httpClient.get(this.BASE_URL + '/' + homeId + '/servers', {headers:tokenHeader});
  }

  addHomeServer(tokenHeader, homeId){
    return this.httpClient.post(this.BASE_URL + '/' + homeId + '/servers', {headers:tokenHeader});
  }

  getHomeServer(tokenHeader, homeId, serverId){
    return this.httpClient.get(this.BASE_URL + '/' + homeId + '/servers/' + serverId, {headers:tokenHeader});
  }

  updateHomeServer(tokenHeader, homeId, serverId){
    return this.httpClient.put(this.BASE_URL + '/' + homeId + '/servers/' + serverId, {headers:tokenHeader});
  }

  removeHomeServer(tokenHeader, homeId, serverId){
    return this.httpClient.delete(this.BASE_URL + '/' + homeId + '/servers'+ '/' + serverId, {headers:tokenHeader});
  }

}
