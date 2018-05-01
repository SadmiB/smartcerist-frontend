import { Injectable } from '@angular/core';
import { Consts } from '../models/Consts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ObjectsService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = Consts.BASE_URL + '/api';

  getObjectMesure(object) {
    console.log(object.path, object.type);
    return this.httpClient.get(this.BASE_URL + object.path , {responseType: 'text'});
  }

  putLed(val) {
    return this.httpClient.put(this.BASE_URL + '/lights/led3', {'payload': val} , {responseType: 'text'} );
  }

}
