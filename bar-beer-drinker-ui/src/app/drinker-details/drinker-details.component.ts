import { Component, OnInit } from '@angular/core';
import { BeersService, BeerLocation, Drinker, Time } from '../beers.service';
import { BarsService } from '../bars.service';

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

  drinkerName:string


  peopleWhoDrink: Drinker[];

  timeDistro: Time [];

  filterOptions: SelectItem[];
  sortField: string;
  sortOrder: number;

  constructor(
    private beerService: BeersService,
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.beerName = paramMap.get('beer');
      this.drinkerName=paramMap.get('name')

      this.beerService.getBarsSelling(this.beerName).subscribe(
        data => {
          this.beerLocations = data;
        }
      );

      this.beerService.getTime(this.beerName)
        .subscribe(
          data => {
            this.manufacturer = data;
          }
        );

        this.beerService.getDrinkers(this.beerName)
        .subscribe(
          data => {
            this.peopleWhoDrink = data;
          }
        );
        this.beerService.getdrinkerSpedning(this.drinkerName)
          .subscribe(
            data => {
              this.peopleWhoDrink = data;
            }
          );

    });
  }

  ngOnInit() {
  }


  renderChart(bars: string[], counts: number[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Frequenting count at bars'
      },
      xAxis: {
        categories: bars,
        title: {
          text: 'Bar'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number of customers'
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
        data: counts
      }]
    });
  }



}
