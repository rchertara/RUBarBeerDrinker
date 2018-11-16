import { Component, OnInit } from '@angular/core';
import { BeersService, BeerLocation, Drinker, Time } from '../beers.service';
import { BarsService } from '../bars.service';
import {Transactions,Order, TransactionsService} from '../transactions.service';

import { ActivatedRoute } from '@angular/router';

import { SelectItem } from 'primeng/components/common/selectitem';

declare const Highcharts: any;
@Component({
  selector: 'app-drinker-details',
  templateUrl: './drinker-details.component.html',
  styleUrls: ['./drinker-details.component.css']
})
export class DrinkerDetailsComponent implements OnInit {

  beerName: string;
  beerLocations: BeerLocation[];
  manufacturer: string;

  public drinkerName:string;


  peopleWhoDrink: Drinker[];
  peopleSpendings: Transactions[];
  drinkerOrders: Order[];

  timeDistro: Time [];

  filterOptions: SelectItem[];
  sortField: string;
  sortOrder: number;

  constructor(

    private transService:TransactionsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {

      this.drinkerName=paramMap.get('drinker');

      // this.barService.getFrequentCounts().subscribe(
      //   data => {
      //     console.log(data);
      //
      //     const bars = [];
      //     const counts = [];
      //
      //     data.forEach(bar => {
      //       bars.push(bar.bar);
      //       counts.push(bar.frequentCount);
      //     });
      //
      //     this.renderChart(bars, counts);
      //   }
      // );

      this.transService.getdrinkerPageGraph(this.drinkerName)
        .subscribe(
          data => {
            console.log(data);

            const names = [];
            const quantity = [];

            data.forEach(name=> {
              quantity.push(name.Quantity);
              names.push(name.name);
            });

            this.renderChart(quantity, names);
          }
        );
      this.transService.getSpendings(this.drinkerName)
        .subscribe(
          data => {
            this.peopleSpendings = data;
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
        text: 'Graph of Beers Ordered the most'
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
