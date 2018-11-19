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
  barName: string;
  constructor(private barService: BarsService,
              private transService: TransactionsService,
              private route: ActivatedRoute) {
    this.route.paramMap.subscribe((paramMap) => {

      this.barName = paramMap.get('barName');


      this.transService.getDrinkerPageQury3(this.barName)
        .subscribe(
          data => {
            console.log(data);

            const dates = [];
            const total = [];

            data.forEach(value => {
              dates.push(value.Date);
              total.push(value.Total);
            });

            this.renderChart(total, dates);
          }
        );
      this.transService.getDrinkerPageQury3Weeks(this.barName)
        .subscribe(
          data => {
            console.log(data);

            const dates = [];
            const total = [];

            data.forEach(value => {
              dates.push(value.Week);
              total.push(value.Total);
            });

            this.renderChart2(total, dates);
          }
        );
      this.transService.getDrinkerPageQury3Months(this.barName)
        .subscribe(
          data => {
            console.log(data);

            const dates = [];
            const total = [];

            data.forEach(value => {
              dates.push(value.Month);
              total.push(value.Total);
            });

            this.renderChart3(total, dates);
          }
        );

    });
  }

  ngOnInit() {
  }

  renderChart(quantity: number[], name: string[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Drinker Spendings at this Bar by Date'
      },
      xAxis: {
        categories: name,
        title: {
          text: 'Date'
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

  renderChart2(quantity: number[], name: string[]) {
    Highcharts.chart('bargraph2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Drinker Spendings at this Bar by Week'
      },
      xAxis: {
        categories: name,
        title: {
          text: 'Number of weeks passed since Jan 1st'
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

  renderChart3(quantity: number[], name: string[]) {
    Highcharts.chart('bargraph3', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Drinker Spendings at this Bar by Month'
      },
      xAxis: {
        categories: name,
        title: {
          text: 'Month Number (i.e Jan=1 Feb=2 ..etc)'
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
