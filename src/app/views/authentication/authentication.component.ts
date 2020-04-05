import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import * as UserActions from '../../store/actions/user.action';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {

  constructor(private router: Router,
              private storeGlobal: Store<{ state: IAppState }>) {
   }

  ngOnInit() {
  }

  saveUser($event) {
    console.log($event.displayName);
    this.storeGlobal.dispatch(UserActions.setDisplayName({ userName: $event.displayName }));
    this.router.navigate(['dashboard']);
  }

}
