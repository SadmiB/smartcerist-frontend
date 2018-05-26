import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { NotificationsService } from '../../services/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notif-icon-btn',
  templateUrl: './notif-icon-btn.component.html',
  styleUrls: ['./notif-icon-btn.component.scss']
})
export class NotifIconBtnComponent implements OnInit {
  number = 0;
  icon = 'notifications';
  events;
  tokenHeader;
  constructor(protected eventsService: EventsService,
    protected notifsService: NotificationsService,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar) {
      this.tokenHeader = auth.tokenHeader;
     }

  ngOnInit() {
    // this.eventsService.getAllEvents();
    this.notifsService.getNotificationsBtn(this.tokenHeader);
    this.eventsService.getSocketRooms(this.tokenHeader);
    this.eventsService.getEvents()
      .throttleTime(1000)
      .subscribe();
  }
  private handleError(error, message) {
    console.error(error);
    this.snackBar.open(message, 'close', {duration: 3000});
  }

  removeNotifications() {
    this.notifsService.notifsNumber = 0;
  }

  getLink(notif) {
    this.notifsService.setNotificationSeen(this.tokenHeader, notif._id)
    .subscribe(res => {
      console.log('******************************');
      console.log(res);
      switch (notif.type.toString()) {
        case 'add_user_room':
          this.router.navigate(['/dashboard/homes/' + notif.homeId + '/rooms/' + notif.roomId]);
          break;
        case 'delete_user_room':
          this.router.navigate(['/dashboard/homes/' + notif.homeId]);
          break;
        case 'edit_user_permissions':
          this.router.navigate(['/dashboard/homes/' + notif.homeId + '/rooms/' + notif.roomId + '/users']);
          break;
        default:
        console.log('ça ne convient pas');
          break;
      }
    }, error => {
      this.handleError(error, 'Unable to get notifications');
    });
  }
}
