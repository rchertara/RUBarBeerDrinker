import { Component, OnInit } from '@angular/core';
import {BeerLocation, BeersService} from '../beers.service';
import {ActivatedRoute} from '@angular/router';
import {BarsService} from '../bars.service';


@Component({
  selector: 'app-bartender-page',
  templateUrl: './bartender-page.component.html',
  styleUrls: ['./bartender-page.component.css']
})
export class BartenderPageComponent implements OnInit {


  bartenderName:string;
  allBartenders:any[];

  constructor(
    private beerService: BeersService,
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.bartenderName = paramMap.get('bartender');


      this.barService.getBartenders().subscribe(
        data => {
          this.allBartenders = data;
        }
      );






    });
  }

  ngOnInit() {
  }
}
