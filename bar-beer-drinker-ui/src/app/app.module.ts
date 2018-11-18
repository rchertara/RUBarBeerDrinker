import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeersComponent } from './beers/beers.component';
import { InsightComponent } from './insight/insight.component';
import { BarPageComponent } from './bar-page/bar-page.component';
import { DrinkerPageComponent } from './drinker-page/drinker-page.component';
import { BartenderPageComponent } from './bartender-page/bartender-page.component';
import { ManufacturerPageComponent } from './manufacturer-page/manufacturer-page.component';
import { ModificationPageComponent } from './modification-page/modification-page.component';
import { DrinkerDetailsComponent } from './drinker-details/drinker-details.component';
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';
import { TransactionsDetailsComponent } from './transactions-details/transactions-details.component';
import { BarSpendingsComponent } from './bar-spendings/bar-spendings.component';
import { BartenderDetailsComponent } from './bartender-details/bartender-details.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    BarDetailsComponent,
    BeerDetailsComponent,
    BeersComponent,
    InsightComponent,
    BarPageComponent,
    DrinkerPageComponent,
    BartenderPageComponent,
    ManufacturerPageComponent,
    ModificationPageComponent,
    ManufacturerDetailComponent,
    DrinkerDetailsComponent,
    TransactionsDetailsComponent,
    BarSpendingsComponent,
    BartenderDetailsComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    AppRoutingModule,
    InputTextModule,
    InputTextareaModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
