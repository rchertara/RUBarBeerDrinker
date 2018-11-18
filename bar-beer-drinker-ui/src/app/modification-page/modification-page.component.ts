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
  allBills:any[];
  allFreq:any[]
  allLikes:any[];
  allops:any[];
  allworks:any[];
  allsells:any[];
  allTrans:any[];



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
    this.transService.getBills().subscribe(
      data => {
        this.allBills= data;

      }
    );
    this.transService.getFreq().subscribe(
      data => {
        this.allFreq= data;

      }
    );
    this.transService.getLikes().subscribe(
      data => {
        this.allLikes= data;

      }
    );
    this.transService.getops().subscribe(
      data => {
        this.allops= data;

      }
    );
    this.transService.getworks().subscribe(
      data => {
        this.allworks= data;

      }
    );
    this.transService.getsells().subscribe(
      data => {
        this.allsells= data;

      }
    );
    this.transService.gettrans().subscribe(
      data => {
        this.allTrans= data;

      }
    );


  }

  ngOnInit() {
  }

}
