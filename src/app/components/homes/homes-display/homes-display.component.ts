import { Component, OnInit } from '@angular/core';
import { HomesService } from '../../../services/homes.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { MatDialog, MatSnackBar, MatDialogConfig } from '@angular/material';
import { WarningDiagComponent } from '../../warning-diag/warning-diag.component';
import { User } from '../../../models/User';
import { HomeEditComponent } from '../home-edit/home-edit.component';

@Component({
  selector: 'app-homes-display',
  templateUrl: './homes-display.component.html',
  styleUrls: ['./homes-display.component.scss']
})
export class HomesDisplayComponent implements OnInit {

  tokenHeader;
  userEmail;
  constructor(protected homeService: HomesService,
    private userService: UserService,
    protected auth: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.tokenHeader = auth.tokenHeader;
    this.userEmail = auth.email;
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

  getUserById(userId) {
    this.userService.getUserById(this.tokenHeader, userId)
    .subscribe((res: User) => {
      console.log(res.firstName);
      return res.firstName;
    }, error => {
      this.handleError(error, 'Unable to get the user');
    })
    ;
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


