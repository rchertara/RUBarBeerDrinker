import { Component, OnInit } from '@angular/core';
import {BeerLocation, BeersService} from '../beers.service';
import {ActivatedRoute} from '@angular/router';
import {SelectItem} from 'primeng/api';
import {BarsService} from '../bars.service';
import {ButtonModule} from 'primeng/button';


@Component({
  selector: 'app-bartender-page',
  templateUrl: './bartender-page.component.html',
  styleUrls: ['./bartender-page.component.css']
})
export class BartenderPageComponent implements OnInit {


  bartenderName:string;
  bar:string

  allBartenders:any[];
  dayOfTheWeek:SelectItem[];
  dayName:string
  bartenderShiftsOptions:SelectItem[];
  shiftName:string;

  bartenderOptions:SelectItem[];
  barOp:SelectItem[];

  bartenderShiftsForBar:any[];
  bartenderRankings:any[];

  button:ButtonModule;


  constructor(
    private beerService: BeersService,
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.bartenderName = paramMap.get('bartender');



      this.barService.getBars().subscribe(
        data => {
          this.barOp= data.map(data=> {
            return {
              label: data.BarName,
              value: data.BarName,
            };
          });
        },
        error => {
          alert('Could not retrieve a list of bars');
        }
      );
      // this.barService.getBartenders().subscribe(
      //   data => {
      //     this.bartenderOptions= data.map(name=> {
      //       return {
      //         label: name.BartenderName,
      //         value: name.BartenderName,
      //       };
      //     });
      //   },
      //   error => {
      //     alert('Could not retrieve a list of bartenders');
      //   }
      // );
      this.barService.getBartenderForABar(this.bar).subscribe(
        data => {
          this.bartenderOptions= data.map(name=> {
            return {
              label: name.BartenderName,
              value: name.BartenderName,
            };
          });
        },
        error => {
          alert('Could not retrieve a list of bartenders');
        }
      );
      this.barService.getBartenderShifts().subscribe(
        data => {
          this.bartenderShiftsOptions= data.map(name=> {
            return {
              label: name.Start+'|'+name.Close,
              value: name.Start+'|'+name.Close,
            };
          });
        },
        error => {
          alert('Could not retrieve a list of bartenders');
        }
      );

      // this.barService.getBartenders().subscribe(
      //   data => {
      //     this.allBartenders = data;
      //   }
      // );



      this.dayOfTheWeek=[
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


    });
  }

  ngOnInit() {
  }

  selectBar(selectedOption:string){
    this.bar=selectedOption;
    console.log(this.bar);
    this.barService.getBartenderForABar(this.bar).subscribe(
      data => {
        this.bartenderOptions= data.map(name=> {
          return {
            label: name.BartenderName,
            value: name.BartenderName,
          };
        });
      },)
  }



  selectBartender(selectedOption:string){
    this.bartenderName=selectedOption;
    console.log(this.bartenderName);
  }
  doBartenderPageQury1(){
    this.barService.getBartenderPageQury1(this.bartenderName,this.bar).subscribe(
      data => {
      this.bartenderShiftsForBar=data;
      })

  }
  selectDay(selectedOption:string){
    this.dayName=selectedOption;
    console.log(this.dayName);
  }

  selectBartenderShift(selectedOption:string){
    this.shiftName=selectedOption;
    console.log(this.shiftName);
  }

  doBartenderPageQury2(){
    console.log(this.bar);
    console.log(this.shiftName);
    console.log(this.dayName);

    this.barService.getBartenderPageQury2(this.bar,this.shiftName,this.dayName).subscribe(
      data => {
        this.bartenderRankings=data;
      })

  }
}
