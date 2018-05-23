import { MatSnackBar } from '@angular/material';
import { EventsService } from '../../services/events.service';
import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/throttleTime';
import { AuthService } from '../../services/auth.service';
import { HomesService } from '../../services/homes.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  tokenHeader;

  constructor(private auth: AuthService,
    private snackBar: MatSnackBar,
    protected homesService: HomesService) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.homesService.getOwnerHomes(this.tokenHeader);
  }
}
