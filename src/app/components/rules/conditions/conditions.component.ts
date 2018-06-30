import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../../models/Home';
import { Rule } from '../../../models/Rule';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { ServersService } from '../../../services/servers.service';
import { HomesService } from '../../../services/homes.service';
import { CamerasService } from '../../../services/cameras.service';
import { AddConditionComponent } from './add-condition/add-condition.component';
import { WarningDiagComponent } from '../../warning-diag/warning-diag.component';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.scss']
})
export class ConditionsComponent implements OnInit {
  @Input () home: Home;
  @Input () rule: Rule;
  tokenHeader;
  constructor(private homesService: HomesService,
    protected serversService: ServersService,
    protected homeService: HomeService,
    private dialog: MatDialog,
    private auth: AuthService) {
      this.tokenHeader = auth.tokenHeader;
     }

  ngOnInit() {
    this.homeService.getRuleConditions(this.tokenHeader, this.home._id, this.rule._id);
    this.serversService.getHomeServers(this.tokenHeader, this.home._id);
  }

  addCondition(serverId, beaconId, objectId, objectType) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.role = 'dialog';
    dialogConfig.height = '400px';
    dialogConfig.width = '300px';
    dialogConfig.data = {homeId: this.home._id, ruleId: this.rule._id, objectId: objectId,
      objectType: objectType, serverId: serverId, beaconId: beaconId};
    this.dialog.open(AddConditionComponent, dialogConfig);
  }

  deleteCondition(condition) {
    const dialogRef = this.dialog.open(WarningDiagComponent, {
      width: '250px',
      data : {message : 'Are you sure to remove ' + condition.name},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          console.log('The dialog was closed');
          this.homeService.removeConditionRule(this.tokenHeader, this.home._id, this.rule._id, condition._id );
      }
    });
  }
}
