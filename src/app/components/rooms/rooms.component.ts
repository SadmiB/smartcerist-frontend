import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { SweetAlertService } from 'angular-sweetalert-service/js';

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
    private router: ActivatedRoute,
    private alertService:SweetAlertService) {
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
    this.roomsService.getRooms(this.tokenHeader,homeId);
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
    this.alertService.success({
      title: 'Room deleted',
    });
  })
  .catch(() => console.log('canceled'));
  }

}