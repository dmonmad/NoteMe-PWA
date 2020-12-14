import { Component, OnInit } from '@angular/core';
import { PictureSourceType } from '@ionic-native/camera/ngx';
import { ModalController, NavParams, Platform, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NoteactionsComponent } from 'src/app/component/noteactions/noteactions.component';
import { Nota } from 'src/app/models/Nota';
import { NotePage } from 'src/app/pages/note/note.page';
import { NotaService } from 'src/app/services/nota.service';

@Component({
  selector: 'app-crearnota',
  templateUrl: './crearnota.page.html',
  styleUrls: ['./crearnota.page.scss'],
})
export class CrearnotaPage implements OnInit {

  sub: Subscription;

  notaModal: Nota;

  constructor(private platform: Platform,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private notaSvc: NotaService,
    private navParams: NavParams) {
    this.sub = this.platform.backButton.subscribeWithPriority(102, () => {
      this.modalCtrl.dismiss(this.notaModal);
    });

    let d = this.navParams.get('nota');
    console.log(this.notaModal);
    if (d != null && d != undefined) {
      console.log("D ES NULL Y ENTRA AHORA")
      console.log(d);
      this.notaModal = d;
      console.log(this.notaModal);
    }
    else {
      this.notaModal = {
        titulo: "",
        color: "#fff",
        descripcion: "",
        pinned: false,
        usuarios: [],
        imagenes: [],
      };
      console.log(this.notaModal);
    }
    console.log(this.notaModal);
  }

  ngOnInit() {
    console.log(this.notaModal);
  }

  ionViewDidLeave() {
    console.log(this.notaModal);
    this.sub.unsubscribe();
  }

  async addImageToNota() {
    console.log("ADDIMAGETONOTA")
    console.log(this.notaModal);
    this.notaSvc.getBase64Image(PictureSourceType.PHOTOLIBRARY)
      .then(data => {
        console.log(this.notaModal);
        this.notaModal.imagenes.push('data:image/jpeg;base64,' + data);
      })
      .catch(err => {
        console.log(this.notaModal);
        console.log(err);
      })
  }

  async openActions() {

    let actionSheet = await this.popoverCtrl.create({
      component: NoteactionsComponent,
      animated: true,
      backdropDismiss: true,
      showBackdrop: true,

    });
    console.log(this.notaModal);
    await actionSheet.present();
    console.log(this.notaModal);
  }

  public deletePic(foto: string) {
    console.log(this.notaModal);
    const index: number = this.notaModal.imagenes.indexOf(foto);
    if (index !== -1) {
      this.notaModal.imagenes.splice(index, 1);
    }
  }

  updateNota() {

  }

}
