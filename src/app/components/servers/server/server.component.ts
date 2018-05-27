import { RoomsService } from './../../../services/rooms.service';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../../services/servers.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HomesService } from '../../../services/homes.service';
import { Home } from '../../../models/Home';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  tokenHeader;
  serverId;
  server;
  home: Home;
  constructor(private serversService: ServersService,
    private homesService: HomesService,
    private roomsService: RoomsService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
      this.tokenHeader = auth.tokenHeader;
      this.serverId = this.route.snapshot.params.serverId;
    }

  ngOnInit() {
    this.getHome();
    this.getServer();
  }

  getServer() {
    this.serversService.getHomeServer(this.tokenHeader, this.serverId)
    .subscribe(res => {
      console.log(res);
      this.server = res;
    }, error => {
      this.handleError(error, 'Unable to get the server');
    });
  }

  getHome () {
    console.log(this.route.snapshot.params.homeId);
    this.home = this.homesService.getHomeFromArray(this.route.snapshot.params.homeId)[0];
    console.log(this.home);
  }

  objectNonAffected(objectId) {
    let result = true;
    this.home.rooms.forEach(room => {
      if (room.objects.includes(objectId)) {
        result = false;
      }
    });
    return result;
  }

  addObjectToRoom(roomId, objectId) {
    this.roomsService.addObjectToRoom(this.tokenHeader, this.route.snapshot.params.homeId, roomId, objectId );
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});

  }
}
