import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavComponent } from '../../components/nav/nav.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

  signin() {
    this.auth.signin(this.loginData);
  }

}
