import { Component, OnInit } from '@angular/core';
import {Transactions,Order, TransactionsService} from '../transactions.service';

import { ActivatedRoute } from '@angular/router';

import { SelectItem } from 'primeng/components/common/selectitem';
import {DrinkerDetailsComponent} from '../drinker-details/drinker-details.component';




@Component({
  selector: 'app-transactions-details',
  templateUrl: './transactions-details.component.html',
  styleUrls: ['./transactions-details.component.css']
})
export class TransactionsDetailsComponent implements OnInit {
  tid : string;
  drinker : string;
  flag : boolean;
  drinkertid :string;
  drinkerOrders : Order[];
  constructor(private transService:TransactionsService,
              private route: ActivatedRoute) {this.route.paramMap.subscribe((paramMap) => {

    this.tid=paramMap.get('tid');
    this.flag=paramMap.has('drinker');
    console.log(this.flag);



    this.transService.getDrinkerOrders(this.tid)
      .subscribe(
        data => {
          this.drinkerOrders = data;
        }
      );

  });}

  ngOnInit() {
  }

}
