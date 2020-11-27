import { Injectable } from '@angular/core';
import * as firebase from 'Firebase';
import { Nota } from '../models/Nota';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  notas: Nota[] = [];
  id : number = 0;
  ref;

  constructor() {
    this.ref = firebase.default.database().ref('notas/');
    this.ref.on('value', resp => {
      this.notas = this.snapshotToArray(resp);
    });
  }

  addNote(note?: Nota) {
    let newInfo = firebase.default.database().ref('notas/').push();
    let nota: Nota = { titulo: "Esto es una prueba "+this.id.toString(),
     usuarios: ["me"] 
    };
    newInfo.set(nota);
    this.id++;
  }

  snapshotToArray(resp) {
    let returnArr = [];

    resp.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
    });

    return returnArr;
  }
}
