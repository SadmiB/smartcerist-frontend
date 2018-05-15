import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';
import { RoomsService } from '../../services/rooms.service';
import { HomesService } from '../../services/homes.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  tokenHeader;
  homesId;
  connectedUserHomes;


  constructor(private userService: UserService,
    private auth: AuthService,
    private roomService: RoomsService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    protected homesService: HomesService) {
    this.tokenHeader = auth.tokenHeader;
  }
  ngOnInit() {
    // this.getUsersRoom(this.route.snapshot.params.homeId,this.route.snapshot.params.roomId);
    // this.getUsersHome(this.route.snapshot.params.homeId);
    this.getConnectedUserHomes();
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  getConnectedUserHomes() {
    this.homesService.getConnectedUserHomes(this.tokenHeader);
  }


getUser(userId) {
    this.userService.getUserById(this.tokenHeader, userId)
    .subscribe(res => {
      console.log(res);
    }, error => {
      this.handleError(error, 'Unable to retrieve User');
    });
  }


}



