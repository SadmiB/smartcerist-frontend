import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  homes;

  constructor(private homeService: HomeService) { 
    
  }

  ngOnInit() {
    this.getHomes();
  }

  getHomes() {
    this.homeService.getHomes('5ac1f194ac9f1636339b382b')
    .subscribe( res => {
      this.homes = res;
      console.log(this.homes);
    });
  }
}
