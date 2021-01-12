import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';
import * as firebase from 'Firebase';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nota } from '../models/Nota';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  conexionColeccion: AngularFirestoreCollection<Nota>;

  constructor(private firestore: AngularFirestore, private storage : AngularFireStorage) {
    this.conexionColeccion = this.firestore.collection(environment.dbName);
  }

  getFamilyMembers() {
    return firebase.default.firestore().collection('contacts').where("isFamily", "==", true).get();
  }

  addNote(note: Nota) : Promise<DocumentReference<Nota>> {
    return this.conexionColeccion.add(note);
  }

  editNote(note: Nota): Promise<void> {
    let updatedNota: Nota = {
      titulo: note.titulo,
      pinned: note.pinned,
      color: note.color,
      descripcion: note.descripcion,
      imagenes: note.imagenes,
      usuarios: note.usuarios
    }
    return this.conexionColeccion.doc(note.id).update(updatedNota);
  }

  getNoteById(note : Nota) : AngularFirestoreDocument<Nota> {
    return this.conexionColeccion.doc(note.id);
  }

  read_notes() : Observable<DocumentChangeAction<Nota>[]>{
    return this.conexionColeccion.snapshotChanges();
  }

  deleteNote(note: Nota): Promise<void> {
    return this.conexionColeccion.doc(note.id).delete();
  }

  addImageToNota(path, file) : AngularFireUploadTask {
    return this.storage.upload(path, file);
  }

  removeImageFromNota(foto: string) : Observable<any>{
    return this.storage.refFromURL(foto).delete();    
  }
}
