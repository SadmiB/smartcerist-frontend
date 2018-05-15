import { Server } from './../../../models/Serser';
import { Component, OnInit, Input } from '@angular/core';
import { ServersService } from '../../../services/servers.service';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar, MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerEditComponent } from './server-edit/server-edit.component';


@Component({
  selector: 'app-home-servers',
  templateUrl: './home-servers.component.html',
  styleUrls: ['./home-servers.component.scss']
})
export class HomeServersComponent implements OnInit {

  @Input() homeId;
  @Input() type;
  servers: Server[] = [];
  tokenHeader;

  constructor(protected serversService: ServersService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    if (this.type === 'static') {
      this.getStaticServers();
    } else {
      this.getServers();
    }
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }


  getServers() {
    try {
      this.serversService.getHomeServers(this.tokenHeader, this.homeId);
    } catch (error) {
      this.handleError(error, 'Servers unreachable');
    }
  }

  getStaticServers() {
      this.serversService.getHomeStaticServers(this.tokenHeader, this.homeId)
      .subscribe(res => { this.servers = res; }
      , error => {
        this.handleError(error, 'Servers unreachable');
      });
  }

  removeServer(serverId) {
    try {
      this.serversService.removeHomeServer(this.tokenHeader, this.homeId, serverId);
    } catch (error) {
      this.handleError(error, 'Unable to remove the server');
    }
  }

  editServer(serverCmp) {
    console.log('je vais pas ouvrir');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.role = 'dialog';
    dialogConfig.height = '350px';
    dialogConfig.width = '300px';
    dialogConfig.data = {homeId: this.homeId, server: serverCmp};
    this.dialog.open(ServerEditComponent, dialogConfig);
  }

  redirect(link) {
    this.router.navigate([link]);
  }
}
