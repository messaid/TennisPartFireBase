import { IUserState } from './../store/state/user.state';
import { User } from './../models/user';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as UserActions from '../store/actions/user.action';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  constructor(private afAuth: AngularFireAuth,
              private ngZone: NgZone,
              private storeUser: Store<{ state: IUserState }>,
              private firestore: AngularFirestore,
              private router: Router) { }

  register(email: string, password: string, displayName: string, phoneNumber: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((userResponse) => {
       // add the user to the "users" database
       const currUser: User = {
        uid: userResponse.user.uid,
        email: userResponse.user.email,
        displayName,
        phoneNumber,
       };
       // add the user to the database
       this.firestore.collection('users').add(currUser)
       .then(user => {
        user.get().then(x => {
          // return the user data
          //console.log(x.data());
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
          this.storeUser.dispatch(UserActions.setUser({ user: currUser}));
          this.router.navigate(['/']);
        });
       }).catch(err => {
         console.log(err);
       });

     })
     .catch((err) => {
        console.log('An error ocurred: ', err);
     });
    }

    login(email: string, password: string) {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user)=>{
        this.firestore.collection('users').ref.where('email', '==', user.user.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            // setUserStatus
            this.setUserStatus(this.currentUser);
            console.log('userRef login', userRef.data());
            console.log('user.user login', user.user);
            this.storeUser.dispatch(UserActions.setUser({ user:{uid : this.currentUser.uid,
            displayName : this.currentUser.displayName ,
            email : this.currentUser.email, phoneNumber : this.currentUser.phoneNumber} }));
            this.router.navigate(['/']);
          })
        });
      }).catch(err => err);
  }

  logOut() {
    this.afAuth.auth.signOut()
    .then(() => {
      console.log('user signed Out successfully');
      // set current user to null to be logged out
      this.currentUser = null;
      // set the listenener to be null, for the UI to react
      this.setUserStatus(null);
      this.storeUser.dispatch(UserActions.resetUser);
      this.ngZone.run(() => this.router.navigate(['/login']));

    }).catch((err) => {
      console.log(err);
    });
  }

  userChanges(){
    this.afAuth.auth.onAuthStateChanged(currentUser => {
      console.log('je modifie le user');
      if(currentUser){
        this.firestore.collection('users').ref.where('email', '==', currentUser.email).onSnapshot(snap => {
          snap.forEach(userRef => {
            this.currentUser = userRef.data();
            // setUserStatus
            console.log('userRef usechanegs', currentUser);
            this.storeUser.dispatch(UserActions.setUser({ user:{uid : this.currentUser.uid,
            displayName : this.currentUser.displayName , email : this.currentUser.email, phoneNumber : this.currentUser.phoneNumber} }));
            this.setUserStatus(this.currentUser);
            console.log('je modifie le user');
            console.log('userstatus', this.userStatus);
          });
        });
      } else {
        // this is the error you where looking at the video that I wasn't able to fix
        // the function is running on refresh so its checking if the user is logged in or not
        // hence the redirect to the login
        this.ngZone.run(() => this.router.navigate(['/login']));
      }
    });
  }

    setUserStatus(userStatus: any): void {
      this.userStatus = userStatus;
      this.userStatusChanges.next(userStatus);
    }
}
