import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms;
  tokenHeader;

  constructor(private roomsService: RoomsService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    const homeId = this.route.snapshot.params.homeId;
    this.getRooms(homeId);
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }


  getRooms(homeId) {
    this.roomsService.getRooms(homeId, this.tokenHeader).subscribe( res =>
      this.rooms = res
    , error => {
      this.handleError(error, 'Unable to retrieve rooms');
    });
  }

}
