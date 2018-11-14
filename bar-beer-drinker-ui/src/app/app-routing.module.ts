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
import { ModificationPageComponent} from './modification-page/modification-page.component'; // modification page

const routes: Routes = [
  {
    path: '',
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
    path: 'bartender_page',
    pathMatch:  'full',
    component: BartenderPageComponent // drinker page component
  },
  {
    path: 'manufacturer_page',
    pathMatch:  'full',
    component: ManufacturerPageComponent // manufacturer page component
  },
  {
    path: 'modification_page',
    pathMatch: 'full',
    component: ModificationPageComponent // modification page component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
