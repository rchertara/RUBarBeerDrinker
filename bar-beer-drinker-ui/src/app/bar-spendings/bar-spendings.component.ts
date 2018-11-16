import { Component, OnInit } from '@angular/core';
import {BarsService} from '../bars.service';
import { ActivatedRoute } from '@angular/router';
import {TransactionsService} from '../transactions.service';


declare const Highcharts: any;
@Component({
  selector: 'app-bar-spendings',
  templateUrl: './bar-spendings.component.html',
  styleUrls: ['./bar-spendings.component.css']
})





export class BarSpendingsComponent implements OnInit {
  barName:string;
  thi

  constructor(private barService:BarsService,
              private transService:TransactionsService,
              private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap) => {

      this.barName=paramMap.get('barName');



    this.transService.getDrinkerPageQury3(this.barName)
      .subscribe(
        data => {
          console.log(data);

          const dates = [];
          const total = [];

          data.forEach(value=> {
            dates.push(value.Date);
            total.push(value.Total);
          });

          this.renderChart(total,dates );
        }
      );

  });}

  ngOnInit() {
  }

  renderChart(quantity: number[], name: string[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Drinker Spendings at this Bar'
      },
      xAxis: {
        categories: name,
        title: {
          text: ''
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Quantity'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: quantity
      }]
    });
  }

}
