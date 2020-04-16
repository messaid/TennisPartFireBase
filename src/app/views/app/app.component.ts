import { AuthService } from './../../service/auth.service';
import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectUserDisplayName, selectUser } from 'src/app/store/selectors/user.selector';
import { IUserState } from 'src/app/store/state/user.state';
import { isNullOrUndefined } from 'util';
import { ProfilComponent } from '../profil/profil.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TennisPart';
  public userDisplayName$: Observable<string>;
  private userInitial = new BehaviorSubject<string>('');
  public userInitial$ = this.userInitial.asObservable();

  constructor(private firebaseService: AuthService,
              public dialog: MatDialog,
              private authService: AuthService,
              private storeUser: Store<{ user: IUserState }>) {

    this.userDisplayName$ = this.storeUser.pipe(select(selectUserDisplayName));
    this.storeUser.pipe(select(selectUser)).subscribe(data => {
      if (!isNullOrUndefined(data.user.displayName)) {
        let initials = '';
        if (data.user.displayName.split(' ').length > 1) {
          initials = data.user.displayName.split(' ')[0].charAt(0) + data.user.displayName.split(' ')[1].charAt(0);
        } else {
          initials = data.user.displayName.split(' ')[0].charAt(0);
        }
        this.userInitial.next(initials.toUpperCase());
      }
    });
  }

  ngOnInit() {
    this.firebaseService.userChanges();
  }

  showProfil() {
    const dialogRef = this.dialog.open(ProfilComponent, {
      width: '500px',
      disableClose: true,
    });
  }

  logout() {
    this.authService.logOut();
  }

}
