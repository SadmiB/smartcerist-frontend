import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-notif-icon-btn',
  templateUrl: './notif-icon-btn.component.html',
  styleUrls: ['./notif-icon-btn.component.scss']
})
export class NotifIconBtnComponent implements OnInit {
  number= 0;
  icon="notifications";
  events;
  tokenHeader;
  constructor(private eventsService: EventsService,
    private auth:AuthService,
    private snackBar: MatSnackBar) {
      this.tokenHeader=auth.tokenHeader;
     }

  ngOnInit() {
    this.eventsService.getAllEvents();
    this.eventsService.getSocketRooms(this.tokenHeader);
    this.eventsService.getEvents()
      .throttleTime(1000)
      .subscribe();
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }
}
