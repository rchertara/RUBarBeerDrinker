import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface BeerLocation {
  bar: string;
  price: number;
  customers: number;
}
export interface Drinker {
  Name: string;
}
export interface Time {
  time: string;
  quantity: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(private http: HttpClient) { }

  getBeers() {
    return this.http.get<any[]>('/api/beer');
  }

  getBarsSelling(beer: string) {
    return this.http.get<BeerLocation[]>(`/api/bars-selling/${beer}`);
  }

  getDrinkers(beer?: string): any {
    if (beer) {
      return this.http.get<string>(`/api/beer-D/${beer}`);
    }
    return this.http.get<string[]>('/api/beer-C');
  }

  getdrinkerForBeer(beer?: string): any { //
    if (beer) {
      return this.http.get<Drinker>(`/api/beers/${beer}`);
    }
    return this.http.get<Drinker[]>('/api/beers/');
  }

//  getdrinkerSpending(name?: string): any { //
//   if (name) {
//     return this.http.get<Drinker>(`/api/drinker-page/${name}`);
//   }
//   return this.http.get<Drinker[]>('/api/drinker_page');
//  }


  getTime(beer?: string): any { //
    if (beer) {
      return this.http.get<Drinker>(`/api/beer/${beer}`);
    }
    return this.http.get<Drinker[]>('/api/beer');
  }

}
