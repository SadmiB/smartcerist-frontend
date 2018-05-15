import { HomeFormComponent } from './../../homes/home-form/home-form.component';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { RoomsService } from '../../../services/rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss']
})
export class RoomEditComponent implements OnInit {
  form;
  tokenHeader;
  room;
  homeId;
  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private roomsServices: RoomsService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<HomeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.tokenHeader = auth.tokenHeader;
    console.log('data.room : ' + data.room);
    this.room = data.room;
    this.homeId = data.homeId;
   }

  ngOnInit() {
    console.log(this.data.homeId);
  }

  onSubmit() {
    try {
      this.roomsServices.updateRoom(this.tokenHeader, this.homeId, this.room._id, this.form.value);
      this.dialogRef.close();
    } catch (error) {
      this.handleError(error, 'Unable to edit the room');
    }

  }

  onCancel() {
    this.redirect(`/dashboard/homes/${this.route.snapshot.params.homeId}/rooms`);
  }

  isValid(control) {
    return this.form.controls[control].isValid  && this.form.controls[control].touched;
  }

  redirect(link) {
    this.router.navigate([link]);
  }

  close() {
    this.dialogRef.close();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
