import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  dbName : string = "noteme.db"
  dbStructure : string = "create table Nota";

  constructor(private sqlite: SQLite) { }

  createDb() {


    this.sqlite.create({name: 'data.db', location: 'default'})
      .then((db: SQLiteObject) => {
        console.log(db);
        console.log("then");

        db.executeSql('drop table danceMoves', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => {
            console.log(e)
          });


      })
      .catch(e => {
        console.log(e)
        console.log("catch");
      });
  }
}
