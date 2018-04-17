import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() back: boolean;
  @Input() title: string;
  @Input() search: boolean;

  constructor(private auth: AuthService, private location: Location) { }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

}
