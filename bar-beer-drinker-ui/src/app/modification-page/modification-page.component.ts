import { Component, OnInit } from '@angular/core';
import {BeerLocation, BeersService} from '../beers.service';
import {ActivatedRoute} from '@angular/router';
import {SelectItem} from 'primeng/api';
import {BarsService} from '../bars.service';
import {ButtonModule} from 'primeng/button';
import {TransactionsService} from '../transactions.service';

@Component({
  selector: 'app-modification-page',
  templateUrl: './modification-page.component.html',
  styleUrls: ['./modification-page.component.css']
})
export class ModificationPageComponent implements OnInit {

  allBars:any[];
  allDrinkers:any[];
  allItems:any[];
  allBartenders:any[];



  allBeers:any[];

  constructor(private beerService: BeersService,
              private barService: BarsService,
              private transService:TransactionsService,
              private route: ActivatedRoute) {


    this.barService.getBars().subscribe(
      data => {
        this.allBars=data;
      },
      error => {
        alert('Could not retrieve a list of bars');
      }
    );
    this.transService.getTransactions().subscribe(
      data => {
        this.allDrinkers = data;

      }
    );
    this.transService.getItems().subscribe(
      data => {
        this.allItems = data;

      }
    );
    this.barService.getBartenders().subscribe(
      data => {
        this.allBartenders = data;

      }
    );


  }

  ngOnInit() {
  }

}
