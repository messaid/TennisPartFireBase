import { IUserState } from './../store/state/user.state';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectUser } from '../store/selectors/user.selector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  private currentUser;
  constructor(private storeUser: Store<{ user: IUserState }>, private router: Router) {

    this.storeUser.pipe(select(selectUser)).subscribe(data => {
      this.currentUser = data;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.currentUser) {
      return true;
    }
  }
}
