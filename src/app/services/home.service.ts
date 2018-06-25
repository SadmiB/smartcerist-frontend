import { Home } from './../models/Home';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { Rule } from '../models/Rule';
import { Consts } from '../models/Consts';
import { MyAction } from '../models/MyAction';
import { Condition } from '../models/Condition';
import { HomesService } from './homes.service';

@Injectable()
export class HomeService {

  constructor(private httpClient: HttpClient, private snackBar: MatSnackBar, private homesService: HomesService) { }

  private ruleStore: Rule[] = [];
  private ruleSubject = new Subject();
  rules = this.ruleSubject.asObservable();

  private actionStore: MyAction[] = [];
  private actionSubject = new Subject();
  actions = this.actionSubject.asObservable();

  private conditionStore: Condition[] = [];
  private conditionSubject = new Subject();
  conditions = this.conditionSubject.asObservable();

  getRules(tokenHeader, homeId) {
    this.httpClient.get<Rule[]>(Consts.BASE_URL + `/homes/${homeId}/rules`, {headers: tokenHeader})
    .subscribe(res => {
      console.log('home rules');
      console.log(res);
      this.ruleStore = res;
      this.ruleSubject.next(this.ruleStore);
    }, error => {
      this.handleError(error, 'Unable to add the rule!');
    });
  }

  addRule(tokenHeader, homeId, rule) {
    this.httpClient.post<Rule>(Consts.BASE_URL + `/homes/${homeId}/rules`, rule, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.getRules(tokenHeader, homeId);
    }, error => {
      this.handleError(error, 'Unable to add the rule!');
    });
  }

  addRuleAction(tokenHeader, homeId, ruleId, objectType, serverId, beaconId, objectId, action) {
    action.type = objectType;
    action.object = objectId;
    action.server = serverId;
    action.beacon = beaconId;
    this.httpClient.post<MyAction>(Consts.BASE_URL + `/homes/${homeId}/rules/${ruleId}/actions`, action, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.getRuleActions(tokenHeader, homeId, ruleId);
    }, error => {
      this.handleError(error, 'Unable to add the action!');
    });
  }
  addRuleCondition(tokenHeader, homeId, ruleId, objectType, serverId, beaconId, objectId, condition) {
    condition.type = objectType;
    condition.object = objectId;
    condition.server = serverId;
    condition.beacon = beaconId;
    this.httpClient.post<Condition>(Consts.BASE_URL + `/homes/${homeId}/rules/${ruleId}/conditions`, condition, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.getRuleConditions(tokenHeader, homeId, ruleId);
    }, error => {
      this.handleError(error, 'Unable to add the action!');
    });
  }

  addRuleTimeOutCondition(tokenHeader, homeId, ruleId, objectType, condition) {
    condition.type = objectType;
    this.httpClient.post<Condition>(Consts.BASE_URL + `/homes/${homeId}/rules/${ruleId}/conditions`, condition, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.getRuleConditions(tokenHeader, homeId, ruleId);
    }, error => {
      this.handleError(error, 'Unable to add the action!');
    });
  }

  getRuleActions(tokenHeader, homeId, ruleId) {
    this.httpClient.get<MyAction[]>(Consts.BASE_URL + `/homes/${homeId}/rules/${ruleId}/actions`, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.actionStore = res;
      this.actionSubject.next(this.actionStore);
    }, error => {
      this.handleError(error, 'Unable to add the action!');
    });
  }

  getRuleConditions(tokenHeader, homeId, ruleId) {
    this.httpClient.get<Condition[]>(Consts.BASE_URL + `/homes/${homeId}/rules/${ruleId}/conditions`, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
      this.conditionStore = res;
      this.conditionSubject.next(this.conditionStore);
    }, error => {
      this.handleError(error, 'Unable to add the action!');
    });
  }

  updateRule(tokenHeader, homeId, ruleId, rule) {
    this.httpClient.put<Rule>(Consts.BASE_URL + `/homes/${homeId}/rules/${ruleId}`, rule, {headers: tokenHeader})
    .subscribe(res => {
      console.log(res);
    }, error => {
      this.handleError(error, 'Unable to add room!');
    });
  }

  removeRule(tokenHeader, homeId, ruleId) {
    return this.httpClient.delete(Consts.BASE_URL + `/homes/${homeId}/rules/${ruleId}` , {headers: tokenHeader})
    .subscribe(res => {
      this.getRules(tokenHeader, homeId);
    }, error => {
      this.handleError(error, 'unable to remove the room');
    });
  }

  removeActionRule(tokenHeader, homeId, ruleId, actionId) {
    return this.httpClient.delete(Consts.BASE_URL + `/homes/${homeId}/rules/${ruleId}/actions/${actionId}` , {headers: tokenHeader})
    .subscribe(res => {
      this.getRuleActions(tokenHeader, homeId, ruleId);
    }, error => {
      this.handleError(error, 'unable to remove the action');
    });
  }

  removeConditionRule(tokenHeader, homeId, ruleId, conditionId) {
    return this.httpClient.delete(Consts.BASE_URL + `/homes/${homeId}/rules/${ruleId}/conditions/${conditionId}` , {headers: tokenHeader})
    .subscribe(res => {
      this.getRuleConditions(tokenHeader, homeId, ruleId);
    }, error => {
      this.handleError(error, 'unable to remove the condition');
    });
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  showSnackBar(classType, message) {
    const config = new MatSnackBarConfig();
    config.panelClass = [classType];
    config.duration = 3000;
    config.direction = 'ltr';
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    this.snackBar.open(message, 'close', config);
  }
}
