import { Component, OnInit } from '@angular/core';
import {BeerLocation, BeersService} from '../beers.service';
import {ActivatedRoute} from '@angular/router';
import {SelectItem} from 'primeng/api';
import {BarsService} from '../bars.service';
import {ButtonModule} from 'primeng/button';
import {TransactionsService} from '../transactions.service';
import {ToastModule} from 'primeng/toast';

import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {HttpResponse} from '@angular/common/http';
import {reject} from 'q';


@Component({
  selector: 'app-modification-page',
  templateUrl: './modification-page.component.html',
  styleUrls: ['./modification-page.component.css']
})
export class ModificationPageComponent implements OnInit {

  allBars:any[];
  allDrinkers:any[];
  allItems:any[];
  allBartenders:any[];
  allBills:any[];
  allFreq:any[]
  allLikes:any[];
  allops:any[];
  allworks:any[];
  allsells:any[];
  allTrans:any[];

  msgs:MessageModule[];



  allBeers:any[];

  constructor(private beerService: BeersService,
              private barService: BarsService,
              private transService:TransactionsService,
              private route: ActivatedRoute) {


    this.barService.getBars().subscribe(
      data => {
        this.allBars=data;
      },
      error => {
        alert('Could not retrieve a list of bars');
      }
    );
    this.transService.getTransactions().subscribe(
      data => {
        this.allDrinkers = data;

      }
    );
    this.transService.getItems().subscribe(
      data => {
        this.allItems = data;

      }
    );
    this.barService.getBartenders().subscribe(
      data => {
        this.allBartenders = data;

      }
    );
    this.transService.getBills().subscribe(
      data => {
        this.allBills= data;

      }
    );
    this.transService.getFreq().subscribe(
      data => {
        this.allFreq= data;

      }
    );
    this.transService.getLikes().subscribe(
      data => {
        this.allLikes= data;

      }
    );
    this.transService.getops().subscribe(
      data => {
        this.allops= data;

      }
    );
    this.transService.getworks().subscribe(
      data => {
        this.allworks= data;

      }
    );
    this.transService.getsells().subscribe(
      data => {
        this.allsells= data;

      }
    );
    this.transService.gettrans().subscribe(
      data => {
        this.allTrans= data;

      }
    );


  }

  ngOnInit() {
  }

  exeQuery(query:string){
    console.log(query);
    this.transService.postQuery(query).subscribe(
      data=>{
        var response:string=data.toString()
        if(response==='Change has been successful'){
          this.show();
        }
        else{
          this.msgs=[];
          var m:MessageModule={severity:'error', summary:'Error Message', detail:data.toString()}
          this.msgs.push(m);
        }

      }
    //  (error: HttpResponse<any>) => {
    //   if (error.status) {
    //
    //    // alert('Bar not found');
    //     this.reject()
    //   } else {
    //    // console.error(error.status + ' - ' + error.body);
    //    // alert('An error occurred on the server. Please check the browser console.');
    //     this.reject()
    //   }
    // }
    );
  }
  show() {
    this.msgs=[];
    var m:MessageModule={severity:'success', summary:'Service Message', detail:'Query has been accepted'}
    this.msgs.push(m);
  }
  reject() {
    this.msgs=[];
    var m:MessageModule={severity:'error', summary:'Error Message', detail:''}
    this.msgs.push(m);
  }



}
