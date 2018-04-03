import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homes;
  tokenHeader;

  constructor(private homeService: HomeService, private auth: AuthService) {
    this.tokenHeader = auth.tokenHeader;
  }

  ngOnInit() {
    this.getHomes();
  }

  getHomes() {
    this.homeService.getHomes(this.tokenHeader)
    .subscribe( res => {
      this.homes = res;
      console.log(this.homes);
    });
  }
}
