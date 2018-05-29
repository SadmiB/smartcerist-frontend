import { ServersService } from './../../../services/servers.service';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-server-analytics',
  templateUrl: './server-analytics.component.html',
  styleUrls: ['./server-analytics.component.scss']
})
export class ServerAnalyticsComponent implements OnInit {

  @Input() homeId;
  servers;
  tokenHeader;
  constructor(private serversService: ServersService,
    private snackBar: MatSnackBar,
    private auth: AuthService ) {
      this.tokenHeader = auth.tokenHeader;
     }

  ngOnInit() {
    this.getHomeServers();
  }

  getHomeServers() {
    this.serversService.getHomeStaticServers(this.tokenHeader, this.homeId)
    .subscribe(res => {
      this.servers = res;
    }, error => {

    });
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});

  }
}
