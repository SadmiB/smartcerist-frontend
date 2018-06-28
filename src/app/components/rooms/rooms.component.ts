import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { RoomEditComponent } from './room-edit/room-edit.component';
import { WarningDiagComponent } from '../warning-diag/warning-diag.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  tokenHeader;
  @Input() homeId;
  @Input() owner;

  constructor(protected roomsService: RoomsService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: ActivatedRoute) {
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
    this.roomsService.getRooms(this.tokenHeader, homeId);
  }

  removeRoom(roomId, roomName) {
    const dialogRef = this.dialog.open(WarningDiagComponent, {
      width: '250px',
      data : {message : 'Are you sure to remove ' + roomName},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          console.log('The dialog was closed');
          this.roomsService.removeRoom(this.tokenHeader, this.homeId, roomId);
      }
    });
  }

  editRoom(homeCmpId, roomCmp) {
    console.log('editHome');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.role = 'dialog';
    dialogConfig.height = '380px';
    dialogConfig.width = '300px';
    dialogConfig.data = {homeId: homeCmpId, room: roomCmp};
    this.dialog.open(RoomEditComponent, dialogConfig);
  }
}
