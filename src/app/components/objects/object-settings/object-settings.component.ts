import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ObjectService } from '../../../services/object.service';
import { IotObject } from '../../../models/IotObject';

@Component({
  selector: 'app-object-settings',
  templateUrl: './object-settings.component.html',
  styleUrls: ['./object-settings.component.scss']
})
export class ObjectSettingsComponent implements OnInit {

  form: FormGroup;
  min_threshold: Number;
  max_threshold: Number;
  object: IotObject;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ObjectSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private objectService: ObjectService,
    private snackBar: MatSnackBar) {
      this.min_threshold = data.object.min_threshold;
      this.max_threshold = data.object.max_threshold;
      this.object = data.object;

  }


  ngOnInit() {
    this.form = this.fb.group({
      min_threshold: [this.min_threshold, []],
      max_threshold: [this.max_threshold, []]
    });
  }

  save() {
    this.object.min_threshold = this.form.value.min_threshold;
    this.object.max_threshold = this.form.value.max_threshold;
    this.objectService.updateThreshold(this.object)
    .subscribe(res => {
      this.dialogRef.close();
    }, error => {
      this.handleError(error, 'Unable to set object');
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

  cancel() {
    this.dialogRef.close();
  }

}
