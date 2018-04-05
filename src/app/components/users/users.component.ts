import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users ;
  user;
  tokenHeader;
  homeId="5ab36a8a8a83e61bbc8fc3e9";
  constructor(private userService : UserService,
    private auth: AuthService,
    private snackBar: MatSnackBar) {
    this.tokenHeader = auth.tokenHeader;
  } 

  ngOnInit() {
    this.getHomeUsers(this.homeId);
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  getHomeUsers(homeId) {
    this.userService.getUsers(this.tokenHeader,homeId)
    .subscribe( res => {
      this.users = res;
    }, error => {
      this.handleError(error, 'Unable to retrieve homes!');
    });  
  }

  getUser(userId){
    this.userService.getUser(this.tokenHeader,userId)
    .subscribe(res => {
      this.user=res;
    }, error => {
      this.handleError(error, 'Unable to retrieve User');
    });
  }
}
