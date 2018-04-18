import { Injectable } from '@angular/core';
import { Consts } from '../models/Consts';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ObjectsService {

  constructor(private httpClient: HttpClient) { }


  getLed() {
    console.log('getLed...');
    return this.httpClient.get(Consts.BASE_URL + '/api/lights/led3', {responseType: 'text'});
  }

  putLed(value: string) {
    console.log(`serv putLed...${value}`);
    return this.httpClient.put(Consts.BASE_URL + '/api/lights/led3', {'payload': value}, {responseType: 'text'});
  }

  // ligth
  getLigth() {
    console.log('getLight...');
      return this.httpClient.get(Consts.BASE_URL + '/api/lights/adc', {responseType: 'text'});
  }

  getPresence() {
    console.log('getPresence...');
    return this.httpClient.get(Consts.BASE_URL + '/api/lights/presence', {responseType: 'text'});
  }

}
