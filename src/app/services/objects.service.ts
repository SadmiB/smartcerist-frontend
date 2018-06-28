import { Injectable } from '@angular/core';
import { Consts } from '../models/Consts';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ObjectsService {

  constructor(private httpClient: HttpClient) { }

  BASE_URL = Consts.BASE_URL + '/api/';

  getServerByObjectId(objectId) {
    return this.httpClient.get(Consts.BASE_URL + '/objects/' + objectId);
  }


  getObjectMeasure(object) {
    console.log(object.path, object.type, object.ipv6);
    return this.httpClient.get(this.BASE_URL + object.ipv6 + '/' + object.path , {responseType: 'text'});
  }

  toggleObject(obj) {
    let val;
    if (obj.measure === '1') {
      val = '0';
    } else {
      val = '1';
    }
    return this.httpClient.put(this.BASE_URL + obj.ipv6 + '/' + obj.path, {'payload': val}, {responseType: 'text'});
  }

  ressourcesDiscovery(ip) {
    return this.httpClient.get(this.BASE_URL + ip + '/' + 'core');
  }

}
