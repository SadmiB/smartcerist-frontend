import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeId;
  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.homeId = this.router.snapshot.params.homeId;
  }

}
