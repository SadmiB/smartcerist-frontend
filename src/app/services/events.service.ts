import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventsService {

  BASE_URL ='http://localhost:3000';

  constructor(private httpClient : HttpClient) { }
  
  getAllEvents(tokenHeader){
    return this.httpClient.get(this.BASE_URL + `/events`,{headers: tokenHeader});
  }

}
