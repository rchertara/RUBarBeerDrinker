import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { BeersComponent } from './beers/beers.component';
import { InsightComponent } from './insight/insight.component';

import { BarPageComponent } from './bar-page/bar-page.component'; // bar page
import { DrinkerPageComponent} from './drinker-page/drinker-page.component'; // drinker page
import { BartenderPageComponent} from './bartender-page/bartender-page.component'; // bartender page
import { ManufacturerPageComponent} from './manufacturer-page/manufacturer-page.component'; // manufacturer page
import { ManufacturerDetailComponent } from './manufacturer-detail/manufacturer-detail.component'; // manufacturer detail page link
import { ModificationPageComponent} from './modification-page/modification-page.component'; // modification page
import { DrinkerDetailsComponent } from './drinker-details/drinker-details.component';
import { TransactionsDetailsComponent } from './transactions-details/transactions-details.component';
import { BarSpendingsComponent } from './bar-spendings/bar-spendings.component';
import { BartenderDetailsComponent } from './bartender-details/bartender-details.component';
import { VerificationComponent } from './verification/verification.component';



const routes: Routes = [
  {
     path: '',
    //path: 'static',
    pathMatch: 'full',
    redirectTo: 'bars'
  },
  {
   // path: '',
    path: 'static',
    pathMatch: 'full',
    redirectTo: 'bars'
  },
  {
    path: 'bars',
    pathMatch: 'full',
    component: WelcomeComponent
  },
  {
    path: 'bars/:bar',
    pathMatch: 'full',
    component: BarDetailsComponent
  },
  {
    path: 'beers',
    pathMatch: 'full',
    component: BeersComponent
  },
  {
    path: 'beers/:beer',
    pathMatch: 'full',
    component: BeerDetailsComponent
  },
  {
    path: 'insight',
    pathMatch: 'full',
    component: InsightComponent
  },
  {
    path: 'bar_page',
    pathMatch:  'full',
    component: BarPageComponent // bar page component
  },
  {
    path: 'drinker_page',
    pathMatch:  'full',
    component: DrinkerPageComponent // drinker page component
  },
  {
    path: 'drinker_page/:drinker',
    pathMatch:  'full',
    component: DrinkerDetailsComponent// drinker details component
  },
  {
    path: 'transaction/:tid', //trans
    pathMatch:  'full',
    component: TransactionsDetailsComponent //details of a Transactions for a drinker from a drinker in drinker details page
  },
  {
    path: 'bar-spendings/:barName', //trans
    pathMatch:  'full',
    component: BarSpendingsComponent //details of a Transactions for a drinker from a drinker in drinker details page
  },
  {
    path: 'bar-spendings/:drinkerName', //trans
    pathMatch:  'full',
    component: BarSpendingsComponent //details of a Transactions for a drinker from a drinker in drinker details page
  },
  {
    path: 'bartender_page',
    pathMatch:  'full',
    component: BartenderPageComponent //
  },
  {
    path: 'bartender_page/:bartender',
    pathMatch:  'full',
    component: BartenderDetailsComponent //
  },
  {
    path: 'manufacturer_page',
    pathMatch:  'full',
    component: ManufacturerPageComponent // manufacturer page component
  },
  {
    path: 'manufacturer_page/:manufacturer',
    pathMatch:  'full',
    component: ManufacturerDetailComponent // details of manufacturer
  },

  {
    path: 'modification_page',
    pathMatch: 'full',
    component: ModificationPageComponent // modification page component
  },
  {
    path: 'verification',
    pathMatch: 'full',
    component: VerificationComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
