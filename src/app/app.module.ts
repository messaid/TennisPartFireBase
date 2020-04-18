import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './views/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialFeaturesModule } from './material-features.module';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/reducers/app.reducer';
import { LoginComponent } from './views/authentication/login/login.component';
import { RegisterComponent } from './views/authentication/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { ProfilComponent } from './views/profil/profil.component';
import { RankingPipe } from './pipes/ranking.pipe';
import { SpinnerComponent } from './generic-components/spinner/spinner.component';
import { SpinnerService } from './service/spinner.service';
import { MatProgressSpinnerModule, MatDialogRef } from '@angular/material';
import { CustomSnackbarComponent } from './generic-components/custom-snackbar/custom-snackbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MarketListComponent } from './views/market-list/market-list.component';
import { SearchPlayerListComponent } from './views/search-player-list/search-player-list.component';
import { AwardsComponent } from './views/awards/awards.component';
import { MarketAddComponent } from './views/market-add/market-add.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent,
    ProfilComponent,
    RankingPipe,
    SpinnerComponent,
    CustomSnackbarComponent,
    MarketListComponent,
    SearchPlayerListComponent,
    AwardsComponent,
    MarketAddComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatProgressSpinnerModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    StoreModule.forRoot(appReducers),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialFeaturesModule
  ],
  entryComponents: [ProfilComponent, MarketAddComponent, CustomSnackbarComponent],
  providers: [SpinnerService, {
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
