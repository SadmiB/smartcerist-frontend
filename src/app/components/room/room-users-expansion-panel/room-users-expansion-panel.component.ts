import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from '../../../services/events.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-room-users-expansion-panel',
  templateUrl: './room-users-expansion-panel.component.html',
  styleUrls: ['./room-users-expansion-panel.component.scss']
})
export class RoomUsersExpansionPanelComponent implements OnInit {
  homeId = this.router.snapshot.params.homeId;
  roomId = this.router.snapshot.params.roomId;
  nonRoomUsers;
  tokenHeader;
  constructor(private usersService: UserService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private eventsService: EventsService,
    private auth: AuthService) {
      this.tokenHeader = auth.tokenHeader;
    }

  ngOnInit() {
    this.getUsersNonInRoom();
  }

  getUsersNonInRoom() {
    this.usersService.getUsersNonInRoom(this.tokenHeader, this.homeId, this.roomId)
    .subscribe(res => {
      this.nonRoomUsers = res;
      console.log(this.nonRoomUsers);
    }, error => {
      this.handleError(error, 'unable to get users for this room');
    });
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
