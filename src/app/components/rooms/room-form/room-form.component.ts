import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RoomsService } from '../../../services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  form;
  tokenHeader;
  constructor(private auth:AuthService, private formBuilder: FormBuilder, private roomsServices:RoomsService,private route: ActivatedRoute, private router:Router) {
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
    this.roomsServices.addRoom(this.tokenHeader,homeId,this.form.value);
  }

  isValid(control) {
    return this.form.controls[control].isValid  && this.form.controls[control].touched;
  }

  redirect() {
    this.router.navigate([`/dashboard/homes/${this.route.snapshot.params.homeId}/rooms`]);
  }
}
