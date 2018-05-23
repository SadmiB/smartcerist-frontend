import { EventsService } from './../../services/events.service';
import { Component, OnInit, Input } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent implements OnInit {
  @Input() notifId;
  @Input() category;
  @Input() date ;
  @Input() type ;
  @Input() resume ;
  @Input() message ;
  tokenHeader;
  constructor(private auth: AuthService,
    protected notifsService: NotificationsService) {
      this.tokenHeader = auth.tokenHeader;
    }

  ngOnInit() {
  }

  removeEvent(eventId) {
    this.notifsService.removeNotification(this.tokenHeader, eventId);
  }

}
