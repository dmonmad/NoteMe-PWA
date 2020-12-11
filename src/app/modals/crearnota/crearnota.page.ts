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

  nota: Nota;

  constructor(private platform: Platform,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private notaSvc: NotaService,
    private navParams: NavParams) {
    this.sub = this.platform.backButton.subscribeWithPriority(102, () => {
      this.modalCtrl.dismiss();
    });

    let d = this.navParams.get('nota');
    console.log(d);
    if (d != null) {
      this.nota = d;
    }
    else {
      this.nota = {
        titulo: "",
        color: "#fff",
        descripcion: "",
        pinned: false,
        usuarios: [],
        imagenes: [],
      };
    }
  }

  ngOnInit() {
  }

  ionViewDidLeave() {
    this.sub.unsubscribe();
  }

  async addImageToNota() {
    console.log("ADDIMAGETONOTA")
    this.notaSvc.getBase64Image(PictureSourceType.PHOTOLIBRARY)
      .then(data => {
        this.nota.imagenes.push('data:image/jpeg;base64,'+data);
      })
      .catch(err => {
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
    await actionSheet.present();
  }

  updateNota() {

  }

}
