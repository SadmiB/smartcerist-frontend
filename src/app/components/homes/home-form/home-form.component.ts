import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HomesService } from '../../../services/homes.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service/js';

@Component({
  selector: 'app-home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss']
})
export class HomeFormComponent implements OnInit {
  form;
  tokenHeader;
  constructor(private auth:AuthService, 
    private formBuilder: FormBuilder, 
    private homesServices:HomesService,
    private router: Router,
    private alertService:SweetAlertService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, emailValid()]],
      phone: ['', Validators.required],
      country: ['', Validators.required]
    });
    this.tokenHeader=auth.tokenHeader;
   }

  ngOnInit() {
  }

  onSubmit() {
    const options = {
      title: 'Are you sure?',
      text: "You want to add a new Home!",
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Create'
    };

    this.alertService.confirm(options)
    .then(() => {
    this.homesServices.addHome(this.tokenHeader,this.form.value);
    this.redirect();
  }).catch(() => console.log('canceled'));
}

  isValid(control) {
    return this.form.controls[control].isValid  && this.form.controls[control].touched;
  }

  redirect() {
    this.router.navigate(['/dashboard/homes']);
  }
}

function emailValid() {
  return control => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(control.value) ? null : {invalidEmail: true};
  };
}
