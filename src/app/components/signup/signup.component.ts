import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

    if (auth.isAuthenticated) {
      this.router.navigate(['/dashboard/homes']);
    }

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, emailValid()]],
      gender: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: matchingFields('password', 'confirmPassword')});
   }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.signup(this.form.value);
  }

  isValid(control) {
    return this.form.controls[control].isValid  && this.form.controls[control].touched;
  }

}

function matchingFields(field1, field2) {
  return form => {
    if (form.controls[field1].value !== form.controls[field2].value) {
        return {mismatchedFields: true };
      }
  };
}

function emailValid() {
  return control => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(control.value) ? null : {invalidEmail: true};
  };
}
