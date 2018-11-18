import { Component, OnInit } from '@angular/core';

import { BarsService, Bar } from '../bars.service';
import {SelectItem} from 'primeng/api';
import {ButtonModule} from 'primeng/button';
import {BeersService} from '../beers.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  bars: Bar[];
  beers: any[]
  beerFromThisDay:any[];




  dayOptions:SelectItem[];
  beerOptions:SelectItem[];

  button:ButtonModule;

  day:string;
  beerBrand:string;

  constructor(
    public barService: BarsService,
    public beerService:BeersService
  ) {
    this.getBars();


    //publicDeals: Deal[] = [];
     this.beerOptions=[];


    this.beerService.getBeers().subscribe(
      data => {

        this.beerOptions= data.map(name=> {
          return {
            label: name.name,
            value: name.name,
          };
        });
      },
      error => {
        alert('Could not retrieve a list of bars');
      }
    );
    //TheArray.unshift(TheNewObject);



    const hate:SelectItem={'label':'N/A','value':'N/A'};
    this.beerOptions.unshift(hate);


    this.barService.getBarPageQuery5('null','null').subscribe( data => {

        this.beerFromThisDay=data;
      })



    this.dayOptions=[
      {
        'label':'N/A',
        'value':'N/A'
      },
      {
        'label':'Monday',
        'value':'Monday'
      },
      {
        'label':'Tuesday',
        'value':'Tuesday'
      },
      {
        'label':'Wednesday',
        'value':'Wednesday'
      },
      {
        'label':'Thursday',
        'value':'Thursday'
      },
      {
        'label':'Friday',
        'value':'Friday'
      },
      {
        'label':'Saturday',
        'value':'Saturday'
      },
      {
        'label':'Sunday',
        'value':'Sunday'
      },
    ]
  }

  ngOnInit() {
  }
  selectDay(selectedOption:string){
  this.day=selectedOption;
  console.log(this.day);
  }
  selectBeerBrand(selectedOption:string){
  this.beerBrand=selectedOption;
    console.log(this.beerBrand);
  }
  doBarPageQury5(){
    this.barService.getBarPageQuery5(this.beerBrand,this.day).subscribe( data => {

        this.beerFromThisDay=data;
    })
  }





  getBars() {
    this.barService.getBars().subscribe(
      data => {
        this.bars = data;
      },
      error => {
        alert('Could not retrieve a list of bars');
      }
    );
  }

}
