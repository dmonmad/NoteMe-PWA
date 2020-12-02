import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ColorselectorPage } from 'src/app/modals/colorselector/colorselector.page';
import { Nota } from 'src/app/models/Nota';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { UiService } from 'src/app/services/ui.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit {

  public notas: Nota[] = [];
  public selected: Nota[] = [];

  public editMode: boolean = false;
  public isScrolling: boolean = false;
  public section: string;

  constructor(private activatedRoute: ActivatedRoute,
    private authSvc: AuthService,
    private dataSvc: DataService,
    private router: Router,
    private uiSvc: UiService) {

  }

  ngOnInit() {
    this.section = this.activatedRoute.snapshot.paramMap.get('id');

    this.dataSvc.read_notes().subscribe(data => {
      console.log(data);
      this.notas = data.map(e => {
        let n: Nota = {
          id: e.payload.doc.id,
          color: e.payload.doc.data()['color'],
          descripcion: e.payload.doc.data()['descripcion'],
          imagenes: e.payload.doc.data()['imagenes'],
          titulo: e.payload.doc.data()['titulo'],
          usuarios: e.payload.doc.data()['usuarios'],

        }
        return n;
      })

    });
  }

  onSearchChange(event) {
    console.log(event);
  }

  onLoginGoogle() {
    this.authSvc.loginGoogle()
      .then(() => {
        console.log("Google logged");
      })
      .catch(err => {
        this.uiSvc.presentToast("Hubo un error al intentar enlazar a su cuenta de Google. Pruebe otra vez.", 2000, "danger");
      })
  }

  onLogout() {
    this.authSvc.logOut()
      .then(() => {

        console.log("Google signed out");
      })
  }

  createNote() {
    let nota: Nota =
    {
      titulo: "Esto es una prueba ",
      color: "#fff",
      descripcion: "Desc de prueba",
      usuarios: [],
      imagenes: [],
    };
    this.dataSvc.addNote(nota);
  }

  deleteArrayOfNotes() {
    if (this.selected.length > 0) {
      console.log("Entra");
      for (let i = 0; i < this.selected.length; i++) {
        console.log("Entra nota");
        this.dataSvc.deleteNote(this.selected[i])
          .then(() => {
            console.log("Borrada then");
          })
          .catch(err => {
            console.log("NO BORRADA CATCH")
            console.log(err);
            this.uiSvc.presentToast("Error al eliminar la nota", 2000, "danger");
          })
      }
      this.editMode = false;
      this.selected = [];
    }
  }

  selectNote(item: Nota) {

    if (this.editMode) {

      if (this.isSelected(item)) {
        this.selected.splice(this.selected.indexOf(item), 1)

        if (this.selected.length == 0) {
          this.editMode = false;
        }

      }
      else {
        this.selected.push(item);
      }

    } else {

    }

  }

  startEditMode(item: Nota) {
    if (!this.isScrolling) {

      if (this.editMode == false) {
        this.selected.push(item);
        this.editMode = true;
      }

    }
  }

  isSelected(item: Nota) {
    return this.selected.includes(item);
  }

  openNoteModal(item?: Nota) {
    this.uiSvc.showPopover({
      component: ColorselectorPage,
      componentProps: {
        nota: item != null && item != undefined ? item : null
      }
    })
      .then(() => {
        this.editMode = false;
        this.selected = [];
      })
      .catch(error => console.error(error))
  }

  openColorPopover(ev, item?) {

    this.uiSvc.showPopover({
      component: ColorselectorPage,
      event: ev,
      componentProps: {
        nota: item != null && item != undefined ? item : this.selected,
        isArray: item != null && item != undefined ? false : true
      }
    }
    )
      .then(() => {
        this.editMode = false;
        this.selected = [];
      })
      .catch(error => console.error(error))
  }

}
