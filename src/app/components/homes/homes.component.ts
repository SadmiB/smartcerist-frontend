import { HomeFormComponent } from './home-form/home-form.component';
import { Component, OnInit } from '@angular/core';
import { HomesService } from '../../services/homes.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { Home } from '../../models/Home';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {

  tokenHeader;

  constructor(protected homeService: HomesService,
    private auth: AuthService,
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
    this.homeService.getConnectedUserHomes(this.tokenHeader);
  }

  deleteHome(homeId) {
    this.homeService.deleteHome(homeId, this.tokenHeader);
  }

}
