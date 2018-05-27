import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ServersService } from '../../../services/servers.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit {

  tokenHeader;
  serverId;
  server;
  constructor(private serversService: ServersService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
      this.tokenHeader = auth.tokenHeader;
      this.serverId = this.route.snapshot.params.serverId;
    }

  ngOnInit() {
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

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});

  }
}
