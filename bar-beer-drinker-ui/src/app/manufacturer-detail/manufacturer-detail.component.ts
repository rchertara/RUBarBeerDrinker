import { Component, OnInit } from '@angular/core';
import {BeerLocation, BeersService} from '../beers.service';
import {ActivatedRoute} from '@angular/router';
import {BarsService} from '../bars.service';


@Component({
  selector: 'app-manufacturer-detail',
  templateUrl: './manufacturer-detail.component.html',
  styleUrls: ['./manufacturer-detail.component.css']
})
export class ManufacturerDetailComponent implements OnInit {

  beerLocations:BeerLocation[];
  manfName:string;

  constructor(
    private beerService: BeersService,
    private barService: BarsService,

    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.manfName = paramMap.get('manufacturer');


      this.barService.getStatesForManf(this.manfName).subscribe(
        data => {
          this.beerLocations = data;
        }
      );





    });
  }

  ngOnInit() {
  }

}
