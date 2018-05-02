import { Component, OnInit } from '@angular/core';
import { HomesService } from '../../services/homes.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { SweetAlertService } from 'angular-sweetalert-service/js';
import { Home } from '../../models/Home';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {

  tokenHeader;

  constructor(private homeService: HomesService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private alertService:SweetAlertService) {
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
    this.homeService.getConnectedUserHomes(this.tokenHeader);
  }

  deleteHome(homeId) {
    console.log('comp delete home..');
    const options = {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    };
    this.alertService.confirm(options)
    .then(() => {
        this.homeService.deleteHome(homeId, this.tokenHeader);
    
          this.alertService.success({
            title: 'Home deleted'
          });
        })    
    .catch(() => console.log('canceled'));
    }

}
