import { Component, OnInit } from '@angular/core';

import { BarsService, BarMenuItem } from '../bars.service';
import {Manf} from '../beers.service';

@Component({
  selector: 'app-manufacturer-page',
  templateUrl: './manufacturer-page.component.html',
  styleUrls: ['./manufacturer-page.component.css']
})

export class ManufacturerPageComponent implements OnInit {

  allManfs: Manf[];

  constructor(public barService: BarsService) {

    this.barService.getBeerManufacturers()
      .subscribe(
        data => {
          this.allManfs = data;
        }
      );


  }

  ngOnInit() {
  }


}
