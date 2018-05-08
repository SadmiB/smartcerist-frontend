import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HomesService } from '../../services/homes.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss']
})
export class ServersComponent implements OnInit {

  tokenHeader;

  constructor(private auth: AuthService,
    private homesService: HomesService,
    private snackBar: MatSnackBar) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.getConnectedUserHomes();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  getConnectedUserHomes() {
    this.homesService.getConnectedUserHomes(this.tokenHeader);
  }

}
