import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NotificationsService {

  BASE_URL ='http://localhost:3000';

  constructor(private httpClient : HttpClient) { }
  
  getNotification(tokenHeader, serverId,beaconId,objectId){
    return this.httpClient.get(this.BASE_URL + `/${serverId}/${beaconId}/${objectId}/notifications`,{headers: tokenHeader});
  }

}
