import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consts } from '../models/Consts';

@Injectable()
export class ObjectService {

  constructor(private http: HttpClient) { }

  updateThreshold(object) {
    console.log('updateThreshold...', object);
    return this.http.put(Consts.BASE_URL + `/${object.server_id}/${object.beacon_id}/objects/${object._id}`, object);
  }

}
