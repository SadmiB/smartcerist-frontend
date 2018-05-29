import { Component, OnInit, Input } from '@angular/core';
import { MyObject } from '../../../models/MyObject';

@Component({
  selector: 'app-object-analytics',
  templateUrl: './object-analytics.component.html',
  styleUrls: ['./object-analytics.component.scss']
})
export class ObjectAnalyticsComponent implements OnInit {
  @Input() object: MyObject;
  measures = [];
  dates = [];
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartType: String = 'line';
  // public pieChartType: String = 'pie';
  // Pie
  // public pieChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  // public pieChartData: number[] = [300, 500, 100];
  public randomizeType(): void {
    this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
    // this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
  }
  public chartClicked(e: any): void {
    console.log(e);
  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  ngOnInit() {
    this.createData();
    console.log(this.measures);
    this.lineChartData = [
      this.measures,
    ];
    this.lineChartLabels = this.dates;
    console.log(this.lineChartData);
    console.log(this.lineChartLabels);
  }

  createData() {
    console.log('------------ creating arrays ----------------------');
    this.object.measures.forEach(measure => {
      this.measures.push(measure.value);
      const date = new Date(measure.date);
      this.dates.push(date.getDate() + '/' + date.getMonth() );
    });
  }
}
