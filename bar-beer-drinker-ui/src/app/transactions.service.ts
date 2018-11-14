import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

export interface Transactions {
  TranscationID:string;
  BarLicense:string;
  CustomerID:string;
  ItemID:string;
  Quantity:string;
  total:string


}


@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  constructor(
    public http: HttpClient
  ) { }

  getTransactions() {
    return this.http.get<Transactions[]>('/api/transaction');
  }


}