import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-rule-forme',
  templateUrl: './rule-forme.component.html',
  styleUrls: ['./rule-forme.component.scss']
})
export class RuleFormeComponent implements OnInit {

  form;
  tokenHeader;
  constructor(private auth: AuthService,
    private homeService: HomeService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RuleFormeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.tokenHeader = auth.tokenHeader;
   }

  ngOnInit() {
  }

  onSubmit() {
    const homeId = this.data.homeId;
    try {
      this.homeService.addRule(this.tokenHeader, homeId, this.form.value);
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
