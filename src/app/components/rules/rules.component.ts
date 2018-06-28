import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServersService } from '../../services/servers.service';
import { AuthService } from '../../services/auth.service';
import { Server } from '../../models/Serser';
import { Home } from '../../models/Home';
import { HomesService } from '../../services/homes.service';
import { MatDialog } from '@angular/material';
import { WarningDiagComponent } from '../warning-diag/warning-diag.component';
import { HomeService } from '../../services/home.service';
import { Rule } from '../../models/Rule';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {
  @Input () homeId;
  @Input() owner;
  home: Home;
  rules;
  tokenHeader;
  constructor(private auth: AuthService,
    private homesService: HomesService,
    private dialog: MatDialog,
    protected homeService: HomeService,
    protected serversService: ServersService ) {
      this.tokenHeader = auth.tokenHeader;
     }

  ngOnInit() {
    this.homeService.getRules(this.tokenHeader, this.homeId);
  }

  editRule(ruleId) {

  }

  deleteRule(rule) {
    const dialogRef = this.dialog.open(WarningDiagComponent, {
      width: '250px',
      data : {message : 'Are you sure to remove ' + rule.name},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          console.log('The dialog was closed');
          this.homeService.removeRule(this.tokenHeader, this.homeId, rule._id);
      }
    });
  }
  changeRuleState(rule) {
    const newRule: Rule = rule;
    newRule.state = !rule.state;
    console.log('rule.state');
    console.log(rule.state);
    this.homeService.updateRule(this.tokenHeader, this.homeId, rule._id, newRule);
  }
}
