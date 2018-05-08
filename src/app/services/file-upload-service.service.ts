import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Consts } from '../models/Consts';

@Injectable()
export class FileUploadServiceService {

  constructor(private httpClient: HttpClient,
    private snackBar:MatSnackBar) { }

  postFile(tokenHeader, image) {
    this.httpClient.post<any>(Consts.BASE_URL + `/images`, image, {headers:tokenHeader})
    .subscribe(res => {
     res;
    }, error => {
      this.handleError(error, 'Unable to upload the picture!');
    });
}
private handleError(error, message) {
  console.error(error);
  this.snackBar.open(message, 'close', {duration: 3000});
}
}
