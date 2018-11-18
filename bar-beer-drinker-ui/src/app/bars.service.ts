import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import {BeerLocation} from './beers.service';

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
  getBarPageQuery2(barName:string,day:string) {

    return this.http.get<any[]>('/api/bars/'+barName+'/'+day);
  }
  getBarPageQuery3a(barName:string) {

    return this.http.get<any[]>('/api/bars3a/'+barName);
  }
  getBarPageQuery3b(barName:string) {

    return this.http.get<any[]>('/api/bars3b/'+barName);
  }
  getBarPageQuery4(barName:string) {

    return this.http.get<any[]>('/api/bars4/'+barName);
  }
  getBarPageQuery5(beerName:string,day:string) {
    console.log(beerName);
    console.log(day);
    return this.http.get<any[]>('/api/bars5/'+beerName+'/'+day);
  }
  getBartenderPageQury1(bartenderName:string,bar:string) {
    console.log(bartenderName);
    console.log(bar);
    return this.http.get<any[]>('/api/bartender1/'+bar+'/'+bartenderName);
  }
  getBartenderPageQury2(bar:string,shift:string,day:string) {
    console.log(shift);
    console.log(bar);
    console.log(day);
    var shifts = shift.split("|", 2);
    return this.http.get<any[]>('/api/bartender2/'+bar+'/'+shifts[0]+'/'+shifts[1]+'/'+day);
  }




  getBars() {
    return this.http.get<any[]>('/api/bar');
  }

  getBar(bar: string) {
    return this.http.get<Bar>('/api/bar/' + bar);
  }
  getBartenders() {
    return this.http.get<any[]>('/api/bartender_page');
  }
  getBartenderShifts() {
    return this.http.get<any[]>('/api/bartender_pageShifts');
  }

  getMenu(bar: string) {
    return this.http.get<BarMenuItem[]>('/api/menu/' + bar);
  }

  getFrequentCounts() {
    return this.http.get<any[]>('/api/frequents-data');
  }

  getBeerManufacturers() { //
    return this.http.get<any[]>('/api/manufacturer_page');
  }
  getStatesForManf(manf:string) { //
    return this.http.get<BeerLocation[]>('/api/manufacturer_page/'+manf);
  }
  getStatesLikesManf(manf:string) { //
    return this.http.get<BeerLocation[]>('/api/manufacturer_pageLikesStates/'+manf);
  }


}
