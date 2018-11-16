import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Bar {
  barName: string;
  barLicense: string;
  State: string;
}

export interface BarMenuItem {
  beer: string;
  manf: string;
  price: string;
  likes: string;
}

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
    public http: HttpClient
  ) { }



  getBarPageQuery1(barName:string) {
    return this.http.get<any[]>('/api/bars/'+barName);
  }

  getBars() {
    return this.http.get<Bar[]>('/api/bar');
  }

  getBar(bar: string) {
    return this.http.get<Bar>('/api/bar/' + bar);
  }

  getMenu(bar: string) {
    return this.http.get<BarMenuItem[]>('/api/menu/' + bar);
  }

  getFrequentCounts() {
    return this.http.get<any[]>('/api/frequents-data');
  }

  getBeerManufacturers() { //
    return this.http.get<any[]>('/api/manufacture');
  }
}
