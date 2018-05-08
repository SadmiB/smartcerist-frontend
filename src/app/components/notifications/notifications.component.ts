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
    private notService: NotificationsService,
    private snackBar: MatSnackBar,
    protected eventsService: EventsService) {
    this.tokenHeader = auth.tokenHeader;
   }

  ngOnInit() {
    this.getAllEvents();
  }

  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
  getObjectNotification(serverId, beaconId, objectId) {
    this.notService.getNotification(this.tokenHeader, serverId, beaconId, objectId)
    .subscribe( (res: any) => {
      this.objectNotifs = res;
    }, error => {
      this.handleError(error, 'Unable to retrieve this object notifications!');
    });
  }
  getAllEvents() {
    this.eventsService.getAllEvents();
  }

  btnClick(position) {
    let from = 'top';
    let align = 'right';
    let type = 'info';
    switch (position) {
      case 'top-left':
        align = 'left';
        type = 'rose';
        break;
      case 'top-center':
        align = 'center';
        type = 'success';
        break;
      case 'bottom-left':
        align = 'left';
        from = 'bottom';
        type = 'primary';
        break;
      case 'bottom-center':
        align = 'center';
        from = 'bottom';
        type = 'warning';
        break;
      case 'bottom-right':
        from = 'bottom';
        type = 'danger';
        break;
    }
    $.notify({
      message: 'Welcome to <b>MATERIAL DASHBOARD</b> - a beautiful dashboard for every web developer.',
    }, {
      placement: {from, align},
      offset: {x: 20, y: 35},
      type,
      template: `<div class="alert alert-{0} alert-with-icon col-md-4">
          <i class="material-icons alert-icon">notifications</i>
          <button class="close" type="button" data-dismiss="alert" aria-label="Close"><i class="material-icons">close</i></button>
          <span>{2}</span>
        </div>`
    });
  }

}
