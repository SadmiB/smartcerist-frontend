import { EventsService } from './../../services/events.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification-alert',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss']
})
export class NotificationAlertComponent implements OnInit {
  @Input() eventId;
  @Input() category;
  @Input() date ;
  @Input() type ;
  @Input() message ;
  constructor(protected eventsService: EventsService) { }

  ngOnInit() {
  }

  removeEvent(eventId) {
    this.eventsService.removeEvent(eventId);
  }

}
