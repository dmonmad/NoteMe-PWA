import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import * as firebase from 'firebase'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private AFauth: AngularFireAuth,
     private google: GooglePlus) { }


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
