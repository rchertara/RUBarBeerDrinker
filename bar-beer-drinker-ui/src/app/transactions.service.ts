import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Transactions {
  name : string;
  TranscationID: string;
  BarLicense: string;
  CustomerID: string;
  ItemID: string;
  Quantity: string;
  total: string;

}
export interface Order {
  itemName : string;
  itemTotal: string;
  itemQuantity:string;

}


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
drinker:string;
  constructor(
    public http: HttpClient
  ) { }


  gettrans() {
    return this.http.get<any[]>('/api/get_TransTable');

  }
  getsells() {
    return this.http.get<any[]>('/api/get_SellsTable');

  }

  getworks() {
    return this.http.get<any[]>('/api/get_works');

  }

  getops() {
    return this.http.get<any[]>('/api/get_ops');

  }
  getLikes() {
    return this.http.get<any[]>('/api/get_Likes');

  }
  getFreq() {
    return this.http.get<any[]>('/api/get_Freq');

  }
  getBills() {
    return this.http.get<any[]>('/api/get_Bills');

  }
  getItems() {
    return this.http.get<any[]>('/api/get_Items');

  }

  getTransactions() {
    return this.http.get<Transactions[]>('/api/drinker_page');

  }
  getSpendings(drinker : string) {
    this.drinker=drinker;
    return this.http.get<Transactions[]>(`/api/drinker_page/${drinker}`);

  }
  getdrinkerPageGraph(drinker : string) {
    //this.drinker=drinker;
    return this.http.get<any[]>(`/api/drinker_pageGraph/${drinker}`);

  }
  //message: string, title?: string, autoHideAfter?: number
  getDrinkerOrders(tid : string) {
    return this.http.get<Order[]>('/api/transaction/'+this.drinker+'/'+tid);

  }
  getDrinkerPageQury3(barName:string) {
    return this.http.get<any[]>('/api/bar-spendings/'+this.drinker+'/'+barName);
  }
  getDrinkerPageQury3Weeks(barName:string) {
    return this.http.get<any[]>('/api/bar-spendingsWeeks/'+this.drinker+'/'+barName);
  }
  getDrinkerPageQury3Months(barName:string) {
    return this.http.get<any[]>('/api/bar-spendingsMonths/'+this.drinker+'/'+barName);
  }


}
