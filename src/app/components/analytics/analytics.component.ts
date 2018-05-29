import { ServersService } from './../../services/servers.service';
import { Component, OnInit } from '@angular/core';
import { HomesService } from '../../services/homes.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {
  // lineChart
  // public lineChartData: Array<any> = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 90]
  // ];
  // public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  // public lineChartType: String = 'line';
  // public pieChartType: String = 'pie';
  // // Pie
  // public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  // public pieChartData: number[] = [300, 500, 100];
  // public randomizeType(): void {
  //   this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
  //   this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  // }
  // public chartClicked(e: any): void {
  //   console.log(e);
  // }
  // public chartHovered(e: any): void {
  //   console.log(e);
  // }
  tokenHeader;
  constructor(private auth: AuthService,
    private serversService: ServersService,
    protected homesService: HomesService) {
      this.tokenHeader = auth.tokenHeader;
    }

  ngOnInit() {
    this.homesService.getOwnerHomes(this.tokenHeader);
  }

}
