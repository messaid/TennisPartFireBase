import { IUserState } from './../store/state/user.state';
import { User } from './../models/user';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/actions/user.action';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: any;
  private eventAuthError = new BehaviorSubject<string>('') ;
  public errorMatcher$ = this.eventAuthError.asObservable();

  constructor(private afAuth: AngularFireAuth,
              private ngZone: NgZone,
              private storeUser: Store<{ state: IUserState }>,
              private firestore: AngularFirestore,
              private router: Router) { }

  register(email: string, password: string, displayName: string, phoneNumber: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((userResponse) => {
       const currUser: User = {
        uid: userResponse.user.uid,
        email: userResponse.user.email,
        displayName,
        phoneNumber,
       };
       this.firestore.collection('users').add(currUser)
       .then(user => {
        user.get().then(x => {
          this.currentUser = x.data();
          this.storeUser.dispatch(UserActions.setUser({ user: currUser}));
          this.router.navigate(['/dashboard']);
        });
       }).catch(err => {
        this.eventAuthError.next(err);
       });

     })
     .catch((err) => {
        console.log('An error ocurred: ', err);
     });
    }

    login(email: string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.firestore.collection('users').ref.where('email', '==', user.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            this.storeUser.dispatch(UserActions.setUser({ user: { uid : this.currentUser.uid,
            displayName : this.currentUser.displayName ,
            email : this.currentUser.email, phoneNumber : this.currentUser.phoneNumber} }));
            this.router.navigate(['/dashboard']);
          });
        });
      }).catch(err => {
        this.eventAuthError.next(err);
       });
  }

  logOut() {
    this.afAuth.auth.signOut()
    .then(() => {
      this.currentUser = null;
      this.storeUser.dispatch(UserActions.resetUser);
      this.ngZone.run(() => this.router.navigate(['/authentication']));

    }).catch((err) => {
      console.log(err);
    });
  }

  userChanges() {
    this.afAuth.auth.onAuthStateChanged(currentUser => {
      if(currentUser) {
        this.firestore.collection('users').ref.where('email', '==', currentUser.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            this.ngZone.run(() => this.router.navigate(['/dashboard']));
            this.storeUser.dispatch(UserActions.setUser({ user: {uid : this.currentUser.uid,
            displayName : this.currentUser.displayName,
            email : this.currentUser.email,
            phoneNumber : this.currentUser.phoneNumber} }));
          });
        });
      } else {
        this.ngZone.run(() => this.router.navigate(['/authentication']));
      }
    });
  }
 }
