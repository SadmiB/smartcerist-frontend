import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';

@Injectable()
export class ServersService {

  BASE_URL='http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getHomeServers(tokenHeader, homeId){
    return this.httpClient.get(Consts.BASE_URL + '/' + homeId + '/servers', {headers:tokenHeader});
  }

  addHomeServer(tokenHeader, homeId){
    return this.httpClient.post(Consts.BASE_URL + '/' + homeId + '/servers', {headers:tokenHeader});
  }

  getHomeServer(tokenHeader, homeId, serverId){
    return this.httpClient.get(Consts.BASE_URL + '/' + homeId + '/servers/' + serverId, {headers:tokenHeader});
  }

  updateHomeServer(tokenHeader, homeId, serverId){
    return this.httpClient.put(Consts.BASE_URL + '/' + homeId + '/servers/' + serverId, {headers:tokenHeader});
  }

  removeHomeServer(tokenHeader, homeId, serverId){
    return this.httpClient.delete(Consts.BASE_URL + '/' + homeId + '/servers'+ '/' + serverId, {headers:tokenHeader});
  }

}
