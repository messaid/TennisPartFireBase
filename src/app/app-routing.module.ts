import { AuthenticationComponent } from './views/authentication/authentication.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from 'ngx-auth-firebaseui';

const routes: Routes = [
  {path : '', component: AuthenticationComponent},
  {path : 'dashboard', component: DashboardComponent, canActivate : [LoggedInGuard]},
  {path : '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
