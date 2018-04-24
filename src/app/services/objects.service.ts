import { Injectable } from '@angular/core';
import { Consts } from '../models/Consts';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ObjectsService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = 'http://localhost:3000/api';

  getObjectMesure(object) {
    return this.httpClient.get(this.BASE_URL + '/lights/' + object.type.toLowerCase() , {responseType: 'text'});
  }

  putLed(val) {
    return this.httpClient.put(this.BASE_URL + '/lights/led', {'payload': val} , {responseType: 'text'} );
  }

}
