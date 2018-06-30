import { HomesService } from './../../../services/homes.service';
import { Component, OnInit, Input } from '@angular/core';
import { ServersService } from '../../../services/servers.service';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { MyObject } from '../../../models/MyObject';
import { Home } from '../../../models/Home';
import { Rule } from '../../../models/Rule';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddActionComponent } from './add-action/add-action.component';
import { WarningDiagComponent } from '../../warning-diag/warning-diag.component';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input () home: Home;
  @Input () rule: Rule;
  tokenHeader;
  constructor(private homesService: HomesService,
    protected serversService: ServersService,
    private homeService: HomeService,
    private dialog: MatDialog,
    private auth: AuthService) {
      this.tokenHeader = auth.tokenHeader;
     }

  ngOnInit() {
    this.homeService.getRuleActions(this.tokenHeader, this.home._id, this.rule._id);
    this.serversService.getHomeServers(this.tokenHeader, this.home._id);
  }

  addAction(serverId, beaconId, objectId, objectType) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.role = 'dialog';
    dialogConfig.height = '350px';
    dialogConfig.width = '300px';
    dialogConfig.data = {homeId: this.home._id, ruleId: this.rule._id, objectType: objectType,
      objectId: objectId, serverId: serverId, beaconId: beaconId};
    this.dialog.open(AddActionComponent, dialogConfig);
  }

  deleteAction(action) {
    const dialogRef = this.dialog.open(WarningDiagComponent, {
      width: '250px',
      data : {message : 'Are you sure to remove ' + action.name},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          console.log('The dialog was closed');
          this.homeService.removeActionRule(this.tokenHeader, this.home._id, this.rule._id, action._id );
      }
    });
  }
}
