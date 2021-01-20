import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as firebase from 'firebase'
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$ : Observable<User>;

  static isLoggedIn: boolean = false;

  constructor(private AFauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private google: GooglePlus) {
      this.user$ = this.AFauth.authState.pipe(
        switchMap((user)=>{
          if(user){
            return this.firestore.doc<User>('users/'+user.uid).valueChanges();
          }
          return of(null);
        })
      );

  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.AFauth.sendPasswordResetEmail(email);
    } catch (err) {
      console.log(err);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.AFauth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      this.updateUserData(user);
      console.log(user);
      return user;
    }
    catch (err) {
      console.log(err);
    }
  }

  async register(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.AFauth.createUserWithEmailAndPassword(email, password);
      await this.sendVerificationEmail();
      return user;
    }
    catch (error) {
      console.log(error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    try {
      const { user } = await this.AFauth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    }
    catch (err) {
      console.log(err);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      return (await this.AFauth.currentUser).sendEmailVerification();
    }
    catch (err) {
      console.log(err);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.AFauth.signOut();
    }
    catch (error) {
      console.log(error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc('users/' + user.uid);
    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName
    };

    return userRef.set(data, { merge: true });
  }
}
