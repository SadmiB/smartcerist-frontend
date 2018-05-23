import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';
import { MatSnackBar } from '@angular/material';
import { EventsService } from '../../services/events.service';
declare const $: any;
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  tokenHeader;
  objectNotifs;
  events;
  constructor(private auth: AuthService,
    protected notService: NotificationsService,
    private snackBar: MatSnackBar,
    protected eventsService: EventsService) {
    this.tokenHeader = auth.tokenHeader;
   }

  ngOnInit() {
    // this.getAllEvents();
    this.getNotifications();
    // console.log('auth.tokenHeader : ' + this.auth.tokenHeader);
    // console.log('this.tokenHeader : ' + this.tokenHeader);
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
  getNotifications() {
    this.notService.getNotifications(this.tokenHeader);
  }
  getAllEvents() {
    this.eventsService.getAllEvents();
  }
}
