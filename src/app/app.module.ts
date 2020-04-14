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

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AuthenticationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    StoreModule.forRoot(appReducers),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialFeaturesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
