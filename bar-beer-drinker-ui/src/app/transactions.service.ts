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


}
