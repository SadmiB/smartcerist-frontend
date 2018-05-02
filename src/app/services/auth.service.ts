import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/AuthResponse';
import { MatSnackBar } from '@angular/material';
import { Consts } from '../models/Consts';


@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  NAME_KEY = 'name';
  TOKEN_KEY = 'token';


  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
    const header = new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem(this.TOKEN_KEY)});
    return header;
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  signup(user) {
    delete user.confirmPassword;
    this.httpClient.post<AuthResponse>(Consts.BASE_URL + '/signup', user)
    .subscribe(res => {
     this.authenticate(res);
    }, error => {
      this.handleError(error, 'Unable to Sign up!');
    });
  }

  signin(loginData) {
    this.httpClient.post(Consts.BASE_URL + '/signin', loginData)
    .subscribe( res => {
      console.log(res);
      this.authenticate(res);
    }, error => {
      this.handleError(error, 'Unable to Sign in!');
    });
  }

  signout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/signin']);
  }

  authenticate(res) {
    const authResponse = res;
    if (!authResponse.token) {
      return;
    }
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.NAME_KEY, authResponse.firstName);
    this.router.navigate(['/dashboard/homes']);
  }

}
