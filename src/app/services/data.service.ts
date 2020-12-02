import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'Firebase';
import { environment } from 'src/environments/environment';
import { Nota } from '../models/Nota';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  conexionColeccion: AngularFirestoreCollection<Nota>;

  constructor(private firestore: AngularFirestore) {
    this.conexionColeccion = this.firestore.collection(environment.dbName);
  }

  getFamilyMembers() {
    return firebase.default.firestore().collection('contacts').where("isFamily", "==", true).get();
  }

  async addNote(note: Nota) : Promise<any> {

    return this.conexionColeccion.add(note);
    /*     firebase.default.database().ref(environment.dbName).push(nota); */
  }

  async editNote(note: Nota): Promise<any> {
    let updatedNota: Nota = {
      titulo: note.titulo,
      color: note.color,
      descripcion: note.descripcion,
      imagenes: note.imagenes,
      usuarios: note.usuarios
    }
    return this.conexionColeccion.doc(note.id).update(updatedNota);
  }

  read_notes() {
    return this.conexionColeccion.snapshotChanges();
  }

  async deleteNote(note: Nota): Promise<any> {
    console.log(note);
    let removed: any = false;
    console.log(note.id);
    await this.conexionColeccion.doc(note.id).delete()
      .then(result => {
        removed = true;
      })
      .catch(err => {
        console.log(err);
        removed = err;
      })
    return removed;
  }


}
