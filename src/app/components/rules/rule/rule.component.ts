import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HomesService } from '../../../services/homes.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.scss']
})
export class RuleComponent implements OnInit {
  homeId;
  ruleId;
  home;
  rule;
  constructor(private route: ActivatedRoute,
    private homesService: HomesService) { }

  ngOnInit() {
    this.homeId = this.route.snapshot.params.homeId;
    this.ruleId = this.route.snapshot.params.ruleId;
    console.log(this.homeId);
    console.log(this.ruleId);
    this.home = this.homesService.getHomeFromArray(this.homeId)[0];
    this.rule = this.homesService.getRuleFromHome(this.homeId, this.ruleId)[0];
    console.log(this.rule);
  }

}
