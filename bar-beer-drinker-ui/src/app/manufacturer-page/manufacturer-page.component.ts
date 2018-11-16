import { Component, OnInit } from '@angular/core';

import { BarsService, BarMenuItem } from '../bars.service';

@Component({
  selector: 'app-manufacturer-page',
  templateUrl: './manufacturer-page.component.html',
  styleUrls: ['./manufacturer-page.component.css']
})
export class ManufacturerPageComponent implements OnInit {

  manf: BarMenuItem[];

  constructor(public beerService: BarsService) {
    this.get_manufacturer();
  }

  ngOnInit() {
  }

  get_manufacturer() {
    this.beerService.getBeerManufacturers().subscribe(
      data => {
        this.manf = data;
      },
      error => {
        alert('Could not retrieve manufacturers');
      }
    );
  }
}
