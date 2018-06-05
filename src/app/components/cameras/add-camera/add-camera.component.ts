import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HomesService } from '../../../services/homes.service';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CamerasService } from '../../../services/cameras.service';


@Component({
  selector: 'app-add-camera',
  templateUrl: './add-camera.component.html',
  styleUrls: ['./add-camera.component.scss']
})
export class AddCameraComponent implements OnInit {
  form;
  tokenHeader;
  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private camerasServices: CamerasService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddCameraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      ipv4: ['', Validators.required],
      ipv6: ['', [Validators.required]],
      port: ['', Validators.required],
      mainStream: ['', Validators.required],
      subStream: ['', Validators.required],
    });
    this.tokenHeader = auth.tokenHeader;
   }

  ngOnInit() {
  }

  onSubmit() {
    try {
      const serverId = this.data.serverId;
      this.camerasServices.addCamera(this.tokenHeader, serverId, this.form.value);
      this.dialogRef.close();
    } catch (error) {
      this.handleError(error, 'Unable to add the home');
    }
}

onNoClick(): void {
  this.dialogRef.close();
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


