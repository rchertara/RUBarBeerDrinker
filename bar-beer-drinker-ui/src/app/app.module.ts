import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';

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
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component';


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

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    DropdownModule,
    TableModule,
    AppRoutingModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
