import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HomesService } from '../../../services/homes.service';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../../services/rooms.service';

@Component({
  selector: 'app-users-by-room',
  templateUrl: './users-by-room.component.html',
  styleUrls: ['./users-by-room.component.scss']
})
export class UsersByRoomComponent implements OnInit {
  @Input() homeId;
  rooms;
  tokenHeader;

  constructor(private roomsService: RoomsService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.getRooms(this.homeId);
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
