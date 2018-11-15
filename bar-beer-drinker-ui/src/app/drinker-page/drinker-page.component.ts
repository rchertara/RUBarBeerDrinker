import { Component, OnInit } from '@angular/core';

import {TransactionsService, Transactions} from '../transactions.service';


declare const Highcharts: any;

declare const Highcharts2: any;

@Component({
  selector: 'app-drinker-page',
  templateUrl: './drinker-page.component.html',
  styleUrls: ['./drinker-page.component.css']
})
export class DrinkerPageComponent implements OnInit {

  transactions: Transactions[];
  //manufacturerOptions: SelectItem[];

 // originalBeersList: any[];

  constructor(private TransactionService: TransactionsService) {

    this.TransactionService.getTransactions().subscribe(
      data => {
        this.transactions = data;

      }
    );

    // this.TransactionService.getSpendings().subscribe(
    //   data => {
    //     console.log(data);
    //     const bars = [];
    //     const counts = [];
    //     data.forEach(bar => {
    //       bars.push(bar.Quantity);
    //       counts.push(bar.total);
    //     });
    //     this.renderChart(bars, counts);
    //   }
    // );

  }

  ngOnInit() {
  }

  // filterBeers(manufacturer: string) {
  //   this.beers = this.originalBeersList;
  //   if (manufacturer) {
  //     this.beers = this.originalBeersList.filter(beer => beer.manf === manufacturer);
  //   }
  // }

}


