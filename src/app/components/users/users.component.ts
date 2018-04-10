import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatPaginator, MatSort } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users : MatTableDataSource<any> ;
  //user;
  tokenHeader;
  homeId;
  constructor(private userService : UserService,
    private auth: AuthService,
    private route : ActivatedRoute,
    private snackBar: MatSnackBar) {
    this.tokenHeader = auth.tokenHeader;
  } 
  displayedColumns = ['firstName', 'lastName', 'email'];
  dataSource ;
  selection = new SelectionModel<Element>(true,[]);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.homeId = this.route.snapshot.params.homeId;
    this.getUsersHome(this.homeId);
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  getUsersHome(homeId) {
    this.userService.getHomeUsers(this.tokenHeader,homeId)
    .subscribe( (res:any) => {
      this.dataSource = new MatTableDataSource(res);
    }, error => {
      this.handleError(error, 'Unable to retrieve users!');
    });  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

/*  getUser(userId){
    this.userService.getUser(this.tokenHeader,userId)
    .subscribe(res => {
      this.user=res;
    }, error => {
      this.handleError(error, 'Unable to retrieve User');
    });
  }*/
  isAllSelected(){
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
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

}

export interface Element {
  firstName: string;
  lastName: string;
  email: string;
}

