import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthResponse } from '../models/AuthResponse';
import { MatSnackBar } from '@angular/material';
import { Consts } from '../models/Consts';
import { Error } from '../models/error';


@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) { }

  EMAIL_KEY = 'email';
  TOKEN_KEY = 'token';


  get email() {
    return localStorage.getItem(this.EMAIL_KEY);
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
    this.httpClient.post<Error>(Consts.BASE_URL + '/signin', loginData)
    .subscribe( res => {
      console.log(res);
      if (res.status === 401) {
          this.handleError(res.status, res.message);
      } else {
        this.authenticate(res);
      }
    }, error => {
      this.handleError(error, 'Unable to Sign in!');
    });
  }

  changePassword(tokenHeader, password) {
    delete password.confirmPassword;
    this.httpClient.put<Error>(Consts.BASE_URL + '/changePwd', password, {headers : tokenHeader} )
    .subscribe(res => {
      console.log(res);
      if (res.status === 401) {
        this.handleError(401, res.message);
      }
    }, error => {
      this.handleError(error, 'Unable to change the password');
    });
  }

  signout() {
    localStorage.removeItem(this.EMAIL_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/signin']);
  }

  authenticate(res) {
    const authResponse = res;
    if (!authResponse.token) {
      return;
    }
    localStorage.setItem(this.TOKEN_KEY, authResponse.token);
    localStorage.setItem(this.EMAIL_KEY, authResponse.email);
    this.router.navigate(['/dashboard/homes']);
  }

}
