import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  form;
  tokenHeader;
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {

    this.form = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {validator: matchingFields('password', 'confirmPassword')});

    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.auth.changePassword(this.tokenHeader, this.form.value);
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
