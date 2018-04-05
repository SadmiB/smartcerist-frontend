import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';

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
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource ;


  ngOnInit() {
    console.log("this.users1");
    this.getHomeUsers(this.homeId);
    console.log("this.users2");
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  getHomeUsers(homeId) {
    this.userService.getHomeUsers(this.tokenHeader,homeId)
    .subscribe( res => {
      this.users = res;
      console.log("this.users");
      console.log(this.users);
    }, error => {
      this.handleError(error, 'Unable to retrieve users!');
    });  
    //this.dataSource = new MatTableDataSource(this.users);
  }

  getUser(userId){
    this.userService.getUser(this.tokenHeader,userId)
    .subscribe(res => {
      this.user=res;
    }, error => {
      this.handleError(error, 'Unable to retrieve User');
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface Element {
  firstName: string;
  lastName: string;
  email: string;
}

