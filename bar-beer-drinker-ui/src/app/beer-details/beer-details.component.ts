import { Component, OnInit } from '@angular/core';
import { BeersService, BeerLocation, Drinker, Time } from '../beers.service';
import { BarsService } from '../bars.service';

import { ActivatedRoute } from '@angular/router';

import { SelectItem } from 'primeng/components/common/selectitem';

declare const Highcharts: any;
@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  beerName: string;
  beerLocations: BeerLocation[];
  manufacturer: string;

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

      this.beerService.getBarsSelling(this.beerName).subscribe(
        data => {
          this.beerLocations = data;
        }
      );
      this.barService.getFrequentCounts().subscribe(
        data => {
          console.log(data);
          const bars = [];
          const counts = [];
          data.forEach(bar => {
            bars.push(bar.bar);
            counts.push(bar.frequentCount);
          });
        this.renderChart(bars, counts);
        }
      );


      this.beerService.getdrinkerForBeer(this.beerName)
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

      this.filterOptions = [
        {
          'label': 'Low price first',
          'value': 'low price'
        },
        {
          'label': 'High price first',
          'value': 'high price'
        },
        {
          'label': 'Most frequented first',
          'value': 'high customer'
        },
        {
          'label': 'Least frequented first',
          'value': 'low customer'
        }
      ];
    });
  }

  ngOnInit() {
  }

  sortBy(selectedOption: string) {
    if (selectedOption === 'low price') {
      this.beerLocations.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (selectedOption === 'high price') {
      this.beerLocations.sort((a, b) => {
        return b.price - a.price;
      });
    } else if (selectedOption === 'low customer') {
      this.beerLocations.sort((a, b) => {
        return a.customers - b.customers;
      });
    } else if (selectedOption === 'high customer') {
      this.beerLocations.sort((a, b) => {
        return b.customers - a.customers;
      });
    }
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
