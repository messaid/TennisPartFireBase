import { User } from './../../models/user';
import { selectUser, selectUserDisplayName } from './../../store/selectors/user.selector';
import { IUserState } from './../../store/state/user.state';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkMenuItem } from 'ngx-auth-firebaseui';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //public userStatus$ = this.authService.userStatusChanges.asObservable();
  public userStatus$: Observable<User>;
  public userDisplayName$: Observable<string>;
  constructor(private authService: AuthService,
              private storeUser: Store<{ user: IUserState }>) {
                this.userStatus$ = this.storeUser.pipe(select(selectUser));
                this.userDisplayName$ = this.storeUser.pipe(select(selectUserDisplayName));
  }

  ngOnInit() {
  }

  logout(){
    this.authService.logOut();
  }

}
