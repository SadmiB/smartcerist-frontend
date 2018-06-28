import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomesService } from '../../services/homes.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeId;
  ownerEmail;
  email;
  owner: boolean;
  constructor(private router: ActivatedRoute,
    private auth: AuthService,
    private homesService: HomesService) {
      this.homeId = this.router.snapshot.params.homeId;
      this.email = auth.email;
     }

  ngOnInit() {
    this.homeId = this.router.snapshot.params.homeId;
    this.ownerEmail = this.homesService.getHomeFromArray(this.homeId)[0].owner.email;
    this.owner = (this.ownerEmail === this.email);
    console.log('owner ' + this.owner);
  }

}
