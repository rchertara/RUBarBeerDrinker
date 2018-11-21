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

  constructor(private beerService: BeersService,
              private barService: BarsService,
              private transService:TransactionsService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
