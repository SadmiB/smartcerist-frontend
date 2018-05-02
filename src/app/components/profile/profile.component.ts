import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  tokenHeader;
  form;
  userProfile;
  selectedGender ;
  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private auth : AuthService,
              private snackBar: MatSnackBar  ) { 
    this.tokenHeader = auth.tokenHeader;
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, emailValid()]],
      phone:[''],
      city:[''],
      country:[''],
      postCode:[''],
      gender:['']
    });
  }

  ngOnInit() {
    this.getUser();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  isValid(control) {
    return this.form.controls[control].isValid  && this.form.controls[control].touched;
  }

  getUser(){
    this.userService.getUserProfile(this.tokenHeader)
    .subscribe(res => {
      this.userProfile=res;
      this.selectedGender = this.userProfile.gender;
    }, error => {
      this.handleError(error, 'Unable to retrieve User');
    });
  }

  updateProfile(){
    this.userService.updateUserProfile(this.tokenHeader,this.form.value)
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


