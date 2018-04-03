import { Component, OnInit } from '@angular/core';
import { HomesService } from '../../services/homes.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {

  homes;
  tokenHeader;

  constructor(private homeService: HomesService,
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
    this.homeService.getHomes(this.tokenHeader)
    .subscribe( res => {
      this.homes = res;
    }, error => {
      this.handleError(error, 'Unable to retrieve homes!');
    });
  }

  showRooms() {
    console.log('showing rooms..');
  }

}
