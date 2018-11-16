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






}
