import { Component, OnInit } from '@angular/core';

import {TransactionsService} from '../transactions.service';

@Component({
  selector: 'app-drinker-page',
  templateUrl: './drinker-page.component.html',
  styleUrls: ['./drinker-page.component.css']
})
export class DrinkerPageComponent implements OnInit {

  transactions: any[];
  //manufacturerOptions: SelectItem[];

 // originalBeersList: any[];

  constructor(private TransactionService: TransactionsService) {
    this.TransactionService.getTransactions().subscribe(
      data => {
        this.transactions=data;

      }
    );

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
