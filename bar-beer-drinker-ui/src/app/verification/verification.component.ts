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
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
  msgs:MessageModule[];

  constructor(private beerService: BeersService,
              private barService: BarsService,
              private transService:TransactionsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }
  verifyQuery(query:string){
    //console.log(query);
    this.transService.verifyQuery(query).subscribe(
      data=>{
        var response:string=data.toString()
        console.log(response)
        if(response==='1'){
          this.msgs=[];
          var m:MessageModule={severity:'success', summary:'Service Message', detail:'Pattern validation is true' }
          this.msgs.push(m);
        }
        else{
          this.msgs=[];
          var m:MessageModule={severity:'error', summary:'Error Message', detail:data.toString()}
          this.msgs.push(m);
        }

      }

    );
  }
  show() {
    this.msgs=[];
    var m:MessageModule={severity:'success', summary:'Service Message', detail:''}
    this.msgs.push(m);
  }
  reject() {
    this.msgs=[];
    var m:MessageModule={severity:'error', summary:'Error Message', detail:''}
    this.msgs.push(m);
  }

}
