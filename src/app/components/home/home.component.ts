import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomesService } from '../../services/homes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeId;
  permission;
  constructor(private router: ActivatedRoute,
    private homesService: HomesService) {
      this.homeId = this.router.snapshot.params.homeId;
     }

  ngOnInit() {
    this.homeId = this.router.snapshot.params.homeId;
    this.permission = this.homesService.getHomeFromArray(this.homeId)[0].permission;
  }

}
