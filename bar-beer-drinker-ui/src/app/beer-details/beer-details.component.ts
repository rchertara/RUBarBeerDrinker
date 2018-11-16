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



      this.beerService.getdrinkerForBeer(this.beerName)
        .subscribe(
          data => {
            this.peopleWhoDrink = data;
          }
        );

      this.beerService.getTimeForBeer(this.beerName)
        .subscribe(
          data => {
            this.timeDistro = data;
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





}
