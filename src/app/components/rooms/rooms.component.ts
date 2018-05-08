import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  tokenHeader;
  homeId;

  constructor(private roomsService: RoomsService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.homeId = this.router.snapshot.params.homeId;
    this.getRooms(this.homeId);
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }


  getRooms(homeId) {
    this.roomsService.getRooms(this.tokenHeader, homeId);
  }

  removeRoom(roomId) {
    this.roomsService.removeRoom(this.tokenHeader, this.homeId, roomId);

  }
}
