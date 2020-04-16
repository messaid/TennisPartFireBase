import { UserDoc } from './../models/userDoc';
import { Collections } from './../constants/collections';
import { IUserState } from './../store/state/user.state';
import { UserDTO } from './../models/user';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/actions/user.action';
import { BehaviorSubject, Observable } from 'rxjs';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: any;
  private eventAuthErrorLogin = new BehaviorSubject<string>('');
  public eventAuthErrorLogin$ = this.eventAuthErrorLogin.asObservable();
  private eventAuthErrorRegister = new BehaviorSubject<string>('');
  public eventAuthErrorRegister$ = this.eventAuthErrorRegister.asObservable();

  constructor(private afAuth: AngularFireAuth,
              private spinnerService: SpinnerService,
              private ngZone: NgZone,
              private storeUser: Store<{ state: IUserState }>,
              private firestore: AngularFirestore,
              private router: Router) { }

  register(email: string, password: string, displayName: string, phoneNumber: string) {
    this.spinnerService.updateMessage('Registering...');
    this.spinnerService.start();
    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((userResponse) => {
        const currUser: UserDTO = {
          uid: userResponse.user.uid,
          email: userResponse.user.email,
          displayName,
          phoneNumber,
          ranking: null,
          postalCode: null
        };
        this.firestore.collection(Collections.USERS_COLLECTION()).add(currUser)
          .then(user => {
            user.get().then(x => {
              this.currentUser = x.data();
              this.eventAuthErrorRegister.next('');
              this.storeUser.dispatch(UserActions.setUser({ user: {doc: x.id, user: currUser} }));
              this.router.navigate(['/dashboard']);
            });
          }).catch(err => {
            this.eventAuthErrorRegister.next(err);
            this.spinnerService.stop();
          });

      })
      .catch((err) => {
        this.eventAuthErrorRegister.next(err);
        this.spinnerService.stop();
      });
  }

  login(email: string, password: string) {
    this.spinnerService.updateMessage('Connecting...');
    this.spinnerService.start();
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.firestore.collection(Collections.USERS_COLLECTION()).ref.where('email', '==', user.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            this.storeUser.dispatch(UserActions.setUser({
              user: {user:{ uid: this.currentUser.uid, displayName: this.currentUser.displayName, 
                            ranking: this.currentUser.ranking, postalCode: this.currentUser.postalCode,
                            email: this.currentUser.email, phoneNumber: this.currentUser.phoneNumber}, 
                    doc: userRef.id
              }
            }));
            this.eventAuthErrorLogin.next('');
            this.router.navigate(['/dashboard']);
            this.spinnerService.stop();
          });
        });
      }).catch(err => {
        this.eventAuthErrorLogin.next(err);
        this.spinnerService.stop();
      });
  }

  logOut() {
    this.spinnerService.updateMessage('Disconnecting...');
    this.spinnerService.start();
    this.afAuth.auth.signOut()
      .then(() => {
        this.currentUser = null;
        this.storeUser.dispatch(UserActions.resetUser());
        this.ngZone.run(() => this.router.navigate(['/authentication']));
        this.spinnerService.stop();
      }).catch((err) => {
        console.log(err);
        this.spinnerService.stop();
      });
  }

  userChanges() {
    this.afAuth.auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        this.firestore.collection(Collections.USERS_COLLECTION()).ref.where('email', '==', currentUser.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            this.ngZone.run(() => this.router.navigate(['/dashboard']));
            this.storeUser.dispatch(UserActions.setUser({
              user: {user: { uid: this.currentUser.uid, displayName: this.currentUser.displayName, 
                            ranking: this.currentUser.ranking, email: this.currentUser.email, 
                            postalCode: this.currentUser.postalCode, phoneNumber: this.currentUser.phoneNumber},
                    doc: userRef.id
              }
            }));
          });
        });
      } else {
        this.ngZone.run(() => this.router.navigate(['/authentication']));
      }
    });
  }

  updateUser(userDoc: string, displayName: string, phoneNumber: string, ranking?: string, postalCode?: string){
    return this.firestore.collection(Collections.USERS_COLLECTION()).doc(userDoc).update(
      { displayName, phoneNumber, ranking, postalCode});

      // this.firestore.collection(Collections.USERS_COLLECTION()).ref.where('email', '==', 'm-essaid@live.fr')
      // .get().then(data => console.log(data));
  }

}
