import { SearchPlayerListComponent } from './views/search-player-list/search-player-list.component';
import { AwardsComponent } from './views/awards/awards.component';
import { MarketListComponent } from './views/market-list/market-list.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'authentication', component: AuthenticationComponent},
  { path: 'market', component: MarketListComponent},
  { path: 'search-player', component: SearchPlayerListComponent},
  { path: 'awards', component: AwardsComponent},
  { path : '', redirectTo: '/dashboard', pathMatch : 'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
