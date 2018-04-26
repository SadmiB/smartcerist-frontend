import { Component, OnInit, Input } from '@angular/core';
import { ServersService } from '../../../services/servers.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service/js';

@Component({
  selector: 'app-home-servers',
  templateUrl: './home-servers.component.html',
  styleUrls: ['./home-servers.component.scss']
})
export class HomeServersComponent implements OnInit {

  @Input() homeId;
  servers;
  tokenHeader;

  constructor(private serversService: ServersService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private alertService:SweetAlertService) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.getServers(this.homeId);
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }


  getServers(homeId) {
    this.serversService.getHomeServers(this.tokenHeader,homeId).subscribe( res =>
      this.servers = res
    , error => {
      this.handleError(error, 'Unable to retrieve rooms');
    });
  }

  removeServer(serverId){
    const options = {
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    };
    this.alertService.confirm(options)
    .then(() => {
    this.serversService.removeHomeServer(this.tokenHeader, this.homeId, serverId).subscribe(res =>{ 
      res;
      this.alertService.success({
        title: 'Room deleted'
      });
    },error=>{
      this.handleError(error,'Unable to remove the room')
    })
  })
  .catch(() => console.log('canceled'));
  }

}
