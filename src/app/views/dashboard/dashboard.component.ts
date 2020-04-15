import { SpinnerService } from './../../service/spinner.service';
import { ProfilComponent } from './../profil/profil.component';
import { User } from './../../models/user';
import { selectUser, selectUserDisplayName } from './../../store/selectors/user.selector';
import { IUserState } from './../../store/state/user.state';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { AuthService } from 'src/app/service/auth.service';
import { isNullOrUndefined } from 'util';
import { MatDialog } from '@angular/material';

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
              public dialog: MatDialog,
              private spinnerService: SpinnerService,
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

  showProfil(){
    const dialogRef = this.dialog.open(ProfilComponent, {
      width: '500px',
      disableClose: true,
    });
  }

}
