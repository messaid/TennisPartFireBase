import { AuthenticationComponent } from './views/authentication/authentication.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path : '', component: AuthenticationComponent},
  {path : 'dashboard', component: DashboardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
