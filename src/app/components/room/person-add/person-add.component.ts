import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../../../models/User';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Permission } from '../../../models/Permission';
import { Consts } from '../../../models/Consts';
import { EventsService } from '../../../services/events.service';
@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.scss']
})
export class PersonAddComponent implements OnInit {
  @Input() type;
  tokenHeader;
  @Input() itemsObjects;
  permissions : String [] = []; 
  constructor(private usersService: UserService,
    private snackBar:MatSnackBar,
    private router: ActivatedRoute,
    private eventsService: EventsService,
    private auth:AuthService) {
      this.tokenHeader=auth.tokenHeader;
     }

  ngOnInit() {
    this.getUsersNonInRoom();
  }

  
  public addUserToRoom(tag){
    try {
      let user= new Permission() ;
      user.homeId = this.router.snapshot.params.homeId;
      user.roomId= this.router.snapshot.params.roomId;
      user.permission= this.type; 
      console.log(user);
      this.usersService.addUserToRoom(this.tokenHeader,tag._id,user);
      this.eventsService.joinSocketRoom(user.roomId);
      this.eventsService.joinSocketRoom(user.homeId);
      // this.getUsersNonInRoom(); 
      console.log("done");
      return of(tag);
    } catch (error) {
      this.handleError(error,"Unable to add the User")
    }
}

getUsersNonInRoom(){
  this.usersService.getUsersNonInRoom(this.tokenHeader, this.router.snapshot.params.homeId,this.router.snapshot.params.roomId)
  .subscribe(res => {
    this.itemsObjects=res;
  },error=>{
    this.handleError(error,"unable to get users for this room");
  });
}

public addAdminToRoom(tag){
  try {
    let user= new Permission() ;
    user.homeId = this.router.snapshot.params.homeId;
    user.roomId= this.router.snapshot.params.roomId;
    user.permission= "admin"; 
    console.log(user);
    this.usersService.addUserToRoom(this.tokenHeader,tag._id,user);
    // this.getUsersNonInRoom();
    this.eventsService.joinSocketRoom(user.roomId);
    this.eventsService.joinSocketRoom(user.homeId);
    console.log("done");
    return of(tag);
  } catch (error) {
    this.handleError(error,"Unable to add the Admin")
  }  
}

public removeUserFromRoom(tag){
  try {
    this.usersService.removeRoomUser(this.tokenHeader,this.router.snapshot.params.homeId,this.router.snapshot.params.roomId,tag._id);
    this.eventsService.leaveSocketRoom(this.router.snapshot.params.roomId);
    this.eventsService.leaveSocketRoom(this.router.snapshot.params.homeId);
    //this.getUsersNonInRoom();
  } catch (error) {
    this.handleError(error,"Unable to remove the user from the room")
  }
}

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }


}
