import { Component, OnInit, Input } from '@angular/core';
import { ServersService } from '../../../services/servers.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';


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
    private router: Router) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.getServers();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }


  getServers() {
    this.serversService.getHomeServers(this.tokenHeader, this.homeId).subscribe( res => {
        this.servers = res;
      }
    , error => {
      this.handleError(error, 'Unable to retrieve rooms');
    });
  }

  removeServer(serverId) {
    try {
      this.serversService.removeHomeServer(this.tokenHeader, this.homeId, serverId);
    } catch (error) {
      this.handleError(error, 'Unable to remove the server');
    }
  }
  redirect(link) {
    this.router.navigate([link]);
  }
}
