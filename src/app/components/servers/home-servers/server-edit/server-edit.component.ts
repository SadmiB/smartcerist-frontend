import { HomeFormComponent } from './../../../homes/home-form/home-form.component';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServersService } from '../../../../services/servers.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-server-edit',
  templateUrl: './server-edit.component.html',
  styleUrls: ['./server-edit.component.scss']
})
export class ServerEditComponent implements OnInit {
  form;
  tokenHeader;
  server;
  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private serversServices: ServersService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ServerEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      ipv6: ['', Validators.required],
      ipv4: ['', Validators.required],
    });
    this.tokenHeader = auth.tokenHeader;
    this.server = data.server;
   }

  ngOnInit() {
  }

  onSubmit() {
    const homeId = this.data.homeId;
    console.log('homeId:' + homeId);
    try {
      this.serversServices.updateHomeServer(this.tokenHeader, this.server._id, this.form.value, homeId);
      this.dialogRef.close();
    } catch (error) {
      this.handleError(error, 'unable to add the server to the home');
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
