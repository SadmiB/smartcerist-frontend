import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { Room } from '../../models/Room';
import { Home } from '../../models/Home';
import { HomesService } from '../../services/homes.service';

@Component({
  selector: 'app-home-rooms',
  templateUrl: './home-rooms.component.html',
  styleUrls: ['./home-rooms.component.scss']
})
export class HomeRoomsComponent implements OnInit {
  home: Home;
  @Input() homeId;
  tokenHeader;

  constructor(private roomsService: RoomsService,
    private auth: AuthService,
    private homesService: HomesService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.getRooms();
    console.log(this.home);
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }


  getRooms() {
    // this.roomsService.getRooms(this.tokenHeader,homeId);
    this.home = this.homesService.getHomeFromArray(this.homeId)[0];
  }

  removeRoom(roomId) {
    this.roomsService.removeRoom(this.tokenHeader, this.homeId, roomId);
    this.redirect('/dashboard/rooms');
  }

  redirect(link) {
    this.router.navigate([link]);
  }
}
