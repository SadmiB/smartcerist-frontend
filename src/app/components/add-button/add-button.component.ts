import { Component, OnInit, Input } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { HomeFormComponent } from '../homes/home-form/home-form.component';
import { RoomFormComponent } from '../rooms/room-form/room-form.component';
import { ServerFormComponent } from '../servers/home-servers/server-form/server-form.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent implements OnInit {
  @Input() link;
  @Input() icon = 'add';
  @Input() type ;
  @Input() homeId;
  @Input() roomId;
  constructor(private dialog: MatDialog, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('hiii' + this.route.snapshot.url.toString());
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.role = 'dialog';
    switch (this.type) {
      case 'addHome':
        dialogConfig.height = '500px';
        dialogConfig.width = '350px';
        this.dialog.open(HomeFormComponent, dialogConfig);
      break;
      case 'addRoom':
        dialogConfig.height = '380px';
        dialogConfig.width = '300px';
        dialogConfig.data = {homeId: this.homeId};
        this.dialog.open(RoomFormComponent, dialogConfig);
      break;
      case 'addServer':
        dialogConfig.height = '350px';
        dialogConfig.width = '350px';
        dialogConfig.data = {homeId: this.homeId};
        this.dialog.open(ServerFormComponent, dialogConfig);
      break;
      case 'addUser':
        this.router.navigate([this.link]);
      break;

      default:
        break;
    }
}

}
