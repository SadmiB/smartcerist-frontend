import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-users',
  templateUrl: './home-users.component.html',
  styleUrls: ['./home-users.component.scss']
})
export class HomeUsersComponent implements OnInit {
  @Input() homeId: String;
  tokenHeader;
  displayedColumns = ['select', 'email', 'firstName', 'lastName', 'manage'];
  dataSource ;
  selection = new SelectionModel<Element>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private userService: UserService,
    private snackBar: MatSnackBar,
    private auth: AuthService) {
      this.tokenHeader = auth.tokenHeader;
    }

  ngOnInit() {
    this.getUsersHome();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  getUsersHome() {
    this.userService.getHomeUsers(this.tokenHeader, this.homeId);
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.userService.users;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getUsersRoom(homeId, roomId) {
    this.userService.getRoomUsers(this.tokenHeader, homeId, roomId);
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.userService.users;
    // this.dataSource.forEach(element => {
    //   element.permission=this.getUserRoomPermission(homeId,roomId,element._id);
    // });
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  updateUserPermission() {}
  /** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected == numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteUser(userId) {
    this.userService.removeUser(this.tokenHeader, userId)
    .subscribe(res => {
      console.log(res);
      } , error => {
        this.handleError(error, 'Unable to remove User');
      });
  }
  editUser(userId) {}
}
export interface Element {
  firstName: string;
  lastName: string;
  email: string;
}
