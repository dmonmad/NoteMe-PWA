import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  static isLoggedIn: boolean = false;

  constructor(private AFauth: AngularFireAuth,
    private google: GooglePlus) {

    this.AFauth.authState.subscribe(res => {
      if (res && res.uid)
        AuthService.isLoggedIn = true;
      else
        AuthService.isLoggedIn = false;
    },
      err => {
        console.log(err)
      })

  }


  loginGoogle() {
    return this.google.login({})
      .then(data => {
        return this.AFauth.signInWithCredential(firebase.default.auth.GoogleAuthProvider.credential(null, data.accessToken));
      })
  }

  logOut() {
    return this.AFauth.signOut().then(() => {
      this.google.disconnect();
    })
  }
}
