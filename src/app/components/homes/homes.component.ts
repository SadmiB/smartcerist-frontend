import { Component, OnInit } from '@angular/core';
import { HomesService } from '../../services/homes.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { Home } from '../../models/Home';
import { HomeEditComponent } from './home-edit/home-edit.component';
import { WarningDiagComponent } from '../warning-diag/warning-diag.component';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {

  tokenHeader;
  constructor(protected homeService: HomesService,
    protected auth: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.getHomes();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  getHomes() {
    this.homeService.getHomes(this.tokenHeader);
  }

  deleteHome(homeId, homeName) {
    const dialogRef = this.dialog.open(WarningDiagComponent, {
      width: '300px',
      data : {message : 'Are you sure to remove ' + homeName},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          console.log('The dialog was closed');
          this.homeService.deleteHome(this.tokenHeader, homeId);
      }
    });
  }

  editHome(homeCmp) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.role = 'dialog';
    dialogConfig.height = '550px';
    dialogConfig.width = '350px';
    dialogConfig.data = {home: homeCmp};
    this.dialog.open(HomeEditComponent, dialogConfig);
  }

}
