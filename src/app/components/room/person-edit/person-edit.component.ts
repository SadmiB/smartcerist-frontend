import { Permission } from './../../../models/Permission';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  form;
  tokenHeader;
  user;
  roomId;
  homeId;
  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private usersServices: UserService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PersonEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      permission: ['', Validators.required],
    });
    this.tokenHeader = auth.tokenHeader;
    this.user = data.user;
    this.roomId = data.roomId;
    this.homeId = data.homeId;
   }

  ngOnInit() {
    console.log(this.data.homeId);
  }

  onSubmit() {
    try {
      this.usersServices.updateUserRoomPermission(this.tokenHeader, this.homeId, this.roomId, this.user._id, this.form.value);
      this.dialogRef.close();
    } catch (error) {
      this.handleError(error, 'Unable to edit the room');
    }

  }


  isValid(control) {
    return this.form.controls[control].isValid  && this.form.controls[control].touched;
  }


  close() {
    this.dialogRef.close();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
