import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-warning-diag',
  templateUrl: './warning-diag.component.html',
  styleUrls: ['./warning-diag.component.scss']
})
export class WarningDiagComponent implements OnInit {
  message;
  constructor(
    public dialogRef: MatDialogRef<WarningDiagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.message = data.message;
    }

    ngOnInit() {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
