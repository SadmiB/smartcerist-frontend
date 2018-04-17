import { Component, OnInit, Input } from '@angular/core';
import { RoomsService } from '../../../../../services/rooms.service';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-permissions',
  templateUrl: './user-permissions.component.html',
  styleUrls: ['./user-permissions.component.scss']
})
export class UserPermissionsComponent implements OnInit {
  @Input() homeId;
  @Input() roomId;
  @Input() userId; 
  tokenHeader;
  userPermissions;
  constructor(private roomService:RoomsService,
    private auth:AuthService,
    private snackBar:MatSnackBar) {
      this.tokenHeader = auth.tokenHeader;
     }

  ngOnInit() {
    this.getUserRoomPermission()
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
  getUserRoomPermission(){
    this.roomService.getUserRoomPermission(this.homeId,this.roomId,this.userId,this.tokenHeader)
    .subscribe(res=> {
      this.userPermissions=res;
    },error => {
      this.handleError(error,'Unable to retrieve user permissions for this room');
    })
  }

}
