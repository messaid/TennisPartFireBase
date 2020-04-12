import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: any;
  public userStatus: string;
  public userStatusChanges: BehaviorSubject<string> = new BehaviorSubject<string>(this.userStatus);

  constructor(private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private router: Router) { }

  register(email: string, password: string, displayName: string, phoneNumber: string) {

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     .then((userResponse) => {
       // add the user to the "users" database
       const user: User = {
        uid: userResponse.user.uid,
        email: userResponse.user.email,
        displayName,
        phoneNumber,
       };
       // add the user to the database
       this.firestore.collection('users').add(user)
       .then(user => {
        user.get().then(x => {
          // return the user data
          //console.log(x.data());
          this.currentUser = x.data();
          this.setUserStatus(this.currentUser);
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
            //console.log("userRef", userRef.data());
            this.router.navigate(['/']);
          })
        });
      }).catch(err => err);
  }

    setUserStatus(userStatus: any): void {
      this.userStatus = userStatus;
      this.userStatusChanges.next(userStatus);
    }
}
