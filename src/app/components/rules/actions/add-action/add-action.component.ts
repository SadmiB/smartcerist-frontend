import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HomesService } from '../../../../services/homes.service';
import { HomeService } from '../../../../services/home.service';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.scss']
})
export class AddActionComponent implements OnInit {

  form;
  tokenHeader;
  homeId;
  ruleId;
  objectId;
  serverId;
  beaconId;
  objectType;
  choix: string;
  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private homeServices: HomeService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      action: ['', Validators.required],
    });
    this.tokenHeader = auth.tokenHeader;
    this.objectId = data.objectId;
    this.homeId = data.homeId;
    this.ruleId = data.ruleId;
    this.beaconId = data.beaconId;
    this.serverId = data.serverId;
    this.objectType = data.objectType;
   }

  ngOnInit() {
    console.log(this.data.homeId);
  }

  onSubmit() {
    try {
      this.homeServices.addRuleAction(this.tokenHeader, this.homeId, this.ruleId, this.objectType, this.serverId,
        this.beaconId, this.objectId, this.form.value);
      this.dialogRef.close();
    } catch (error) {
      this.handleError(error, 'Unable to add the action');
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
