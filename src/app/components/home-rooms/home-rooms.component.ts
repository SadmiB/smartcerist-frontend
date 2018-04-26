import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { SweetAlertService } from 'angular-sweetalert-service/js';

@Component({
  selector: 'app-home-rooms',
  templateUrl: './home-rooms.component.html',
  styleUrls: ['./home-rooms.component.scss']
})
export class HomeRoomsComponent implements OnInit {
  @Input() homeId;
  rooms;
  tokenHeader;

  constructor(private roomsService: RoomsService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private alertService:SweetAlertService) {
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
    this.roomsService.getRooms(this.tokenHeader,homeId).subscribe( res =>
      this.rooms = res
    , error => {
      this.handleError(error, 'Unable to retrieve rooms');
    });
  }

  removeRoom(roomId){
    const options = {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    };
    this.alertService.confirm(options)
    .then(() => {
    this.roomsService.removeRoom(this.tokenHeader, this.homeId, roomId).subscribe(res =>{ 
      res;
      this.alertService.success({
        title: 'Room deleted'
      });
    },error=>{
      this.handleError(error,'Unable to remove the room')
    })
  })
  .catch(() => console.log('canceled'));
  }
}
