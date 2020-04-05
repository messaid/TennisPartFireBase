import { selectUserDisplayName } from './../../store/selectors/user.selector';
import { IUserState } from './../../store/state/user.state';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkMenuItem } from 'ngx-auth-firebaseui';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public displayNameUser$: Observable<string>;
  public links: LinkMenuItem[];
  constructor(private router: Router,
              private storeDisplay: Store<{ user: IUserState }>) {

  }

  ngOnInit() {
    this.displayNameUser$ = this.storeDisplay.pipe(select(selectUserDisplayName));
    this.links = [
      { icon: 'home', text: 'Home' },
      { icon: 'favorite', text: 'Favorite' },
      { icon: 'add', text: 'Add' },
    ];
  }

  logedOut($event) {
    this.router.navigate(['authenticate']);
  }

}
