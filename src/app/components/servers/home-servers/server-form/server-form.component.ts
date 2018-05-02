import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServersService } from '../../../../services/servers.service';
import { SweetAlertService } from 'angular-sweetalert-service/js';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-server-form',
  templateUrl: './server-form.component.html',
  styleUrls: ['./server-form.component.scss']
})
export class ServerFormComponent implements OnInit {
  form;
  tokenHeader;
  constructor(private auth:AuthService, 
    private formBuilder: FormBuilder, 
    private serversServices:ServersService,
    private route: ActivatedRoute, 
    private router:Router,
    private snackBar:MatSnackBar,
    private alertService:SweetAlertService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      ipv6: ['', Validators.required],
    });
    this.tokenHeader=auth.tokenHeader;
   }

  ngOnInit() {
  }

  onSubmit() {
    const homeId = this.route.snapshot.params.homeId;
    try{
      this.serversServices.addHomeServer(this.tokenHeader,homeId,this.form.value); 
      const options = {
        title: 'Server Created',
        text: 'do you want to add another server ?',
        showCancelButton: true,
        cancelButtonText: 'No'
      };

      this.alertService.success(options)
      .then(() => {
      this.redirect('/dashboard/servers/form');
      }).catch(() => {
        console.log('canceled')
        this.redirect('/dashboard/servers');
      }); 
    } catch(error){
      this.handleError(error, "unable to add the server to the home")
    }
    
      

  }

  isValid(control) {
    return this.form.controls[control].isValid  && this.form.controls[control].touched;
  }

  redirect(link) {
    this.router.navigate([link]);
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
