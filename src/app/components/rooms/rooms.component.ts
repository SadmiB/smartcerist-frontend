import { Component, OnInit } from '@angular/core';
import { RoomsService } from '../../services/rooms.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { HomesService } from '../../services/homes.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  tokenHeader;
  connectedUserHomes;

  constructor(private auth: AuthService,
    private homesService: HomesService,
    private snackBar: MatSnackBar) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.getConnectedUserHomes();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  getConnectedUserHomes(){
    this.homesService.getConnectedUserHomes(this.tokenHeader)
    .subscribe((res:any)=>{
      this.connectedUserHomes=res;
    },error => {
      this.handleError(error,'Unable to retrieve homes ids')
    })
  }

}
