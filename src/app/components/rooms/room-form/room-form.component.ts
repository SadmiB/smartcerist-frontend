import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RoomsService } from '../../../services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service/js';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  form;
  tokenHeader;
  constructor(private auth:AuthService, 
    private formBuilder: FormBuilder, 
    private roomsServices:RoomsService,
    private route: ActivatedRoute, 
    private router:Router,
    private snackBar: MatSnackBar,
    private alertService:SweetAlertService) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.tokenHeader=auth.tokenHeader;
   }

  ngOnInit() {
  }

  onSubmit() {
    const homeId = this.route.snapshot.params.homeId;
    try {
      this.roomsServices.addRoom(this.tokenHeader, homeId, this.form.value);  
      const options = {
        title: 'Room Created',
        text: 'do you want to add another Room ?',
        showCancelButton: true,
        cancelButtonText: 'No'
      };

      this.alertService.success(options)
      .then(() => {
        const homeId = this.route.snapshot.params.homeId;
        this.redirect(`/dashboard/homes/${this.route.snapshot.params.homeId}/rooms/form`);
      }).catch(() => {
        console.log('canceled')
        this.redirect(`/dashboard/homes/${this.route.snapshot.params.homeId}/rooms`);
      });  
    } catch (error) {
      this.handleError(error,"Unable to add the room")
    }
    
  }

  onCancel(){
    this.redirect(`/dashboard/homes/${this.route.snapshot.params.homeId}/rooms`); 
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
