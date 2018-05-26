import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-room-users',
  templateUrl: './room-users.component.html',
  styleUrls: ['./room-users.component.scss']
})
export class RoomUsersComponent implements OnInit {
  @Input() roomId: String;
  @Input() homeId: String;
  tokenHeader;
  displayedColumns = ['email', 'firstName', 'lastName', 'permission'];
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
    this.getUsersRoom();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  getUsersRoom() {
    this.userService.getRoomTabUsers(this.tokenHeader, this.homeId, this.roomId)
    .subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, error => {
      this.handleError(error, 'Unable to get the users');
    });
  }



  updateUserPermission() {}
  /** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
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
    this.userService.removeRoomUser(this.tokenHeader, this.homeId, this.roomId, userId);
  }

  editUser(userId) {
  }

}
export interface Element {
  firstName: string;
  lastName: string;
  email: string;
  permission: string;
  manage: string;
}

