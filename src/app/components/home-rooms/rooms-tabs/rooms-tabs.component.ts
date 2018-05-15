import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../../services/rooms.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { HomesService } from '../../../services/homes.service';

@Component({
  selector: 'app-rooms-tabs',
  templateUrl: './rooms-tabs.component.html',
  styleUrls: ['./rooms-tabs.component.scss']
})
export class RoomsTabsComponent implements OnInit {
  tokenHeader;

  constructor(private auth: AuthService,
    protected homesService: HomesService,
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
