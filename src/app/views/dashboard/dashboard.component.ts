import { User } from './../../models/user';
import { selectUser, selectUserDisplayName } from './../../store/selectors/user.selector';
import { IUserState } from './../../store/state/user.state';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkMenuItem } from 'ngx-auth-firebaseui';
import { Observable, BehaviorSubject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/service/auth.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public userStatus$: Observable<User>;
  private userInitial = new BehaviorSubject<string>('');
  public userInitial$ = this.userInitial.asObservable();
  public userDisplayName$: Observable<string>;
  constructor(private authService: AuthService,
              private storeUser: Store<{ user: IUserState }>) {
    this.userDisplayName$ = this.storeUser.pipe(select(selectUserDisplayName));
    this.userStatus$ = this.storeUser.pipe(select(selectUser));
    this.userDisplayName$.subscribe(data => {
      if (!isNullOrUndefined(data)) {
        let initials = '';
        if (data.split(' ').length > 1) {
          initials = data.split(' ')[0].charAt(0) + data.split(' ')[1].charAt(0);
        } else {
          initials = data.split(' ')[0].charAt(0);
        }
        this.userInitial.next(initials.toUpperCase());
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authService.logOut();
  }

}
