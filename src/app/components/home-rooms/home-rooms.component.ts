import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { SweetAlertService } from 'angular-sweetalert-service/js';
import { Room } from '../../models/Room';
import { Home } from '../../models/Home';
import { HomesService } from '../../services/homes.service';

@Component({
  selector: 'app-home-rooms',
  templateUrl: './home-rooms.component.html',
  styleUrls: ['./home-rooms.component.scss']
})
export class HomeRoomsComponent implements OnInit {
  home:Home;
  @Input() homeId;
  tokenHeader;

  constructor(private roomsService: RoomsService,
    private auth: AuthService,
    private homesService: HomesService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router,
    private alertService:SweetAlertService) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.getRooms();
    console.log(this.home)
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }


  getRooms() {
    //this.roomsService.getRooms(this.tokenHeader,homeId);
    this.home = this.homesService.getHomeFromArray(this.homeId)[0];
  }

  removeRoom(roomId){
    const options = {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
    };
    this.alertService.confirm(options)
    .then(() => {
    this.roomsService.removeRoom(this.tokenHeader, this.homeId, roomId);
    this.redirect('/dashboard/rooms')
    this.alertService.success({
      title: 'Room deleted',
    });
  })
  .catch(() => console.log('canceled'));
  }

  redirect(link) {
    this.router.navigate([link]);
  }
}
