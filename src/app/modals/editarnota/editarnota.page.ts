import { Component, OnInit } from '@angular/core';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { PictureSourceType } from '@ionic-native/camera/ngx';
import { ModalController, NavParams, Platform, PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NoteactionsComponent } from 'src/app/component/noteactions/noteactions.component';
import { Nota } from 'src/app/models/Nota';
import { DataService } from 'src/app/services/data.service';
import { NotaService } from 'src/app/services/nota.service';
import { UiService } from 'src/app/services/ui.service';
import { ColorselectorPage } from '../colorselector/colorselector.page';

@Component({
  selector: 'app-editarnota',
  templateUrl: './editarnota.page.html',
  styleUrls: ['./editarnota.page.scss'],
})
export class EditarnotaPage implements OnInit {


  sub: Subscription;

  notaModal: Nota;

  constructor(private platform: Platform,
    private modalCtrl: ModalController,
    private popoverCtrl: PopoverController,
    private dataSvc: DataService,
    private storage: AngularFireStorage,
    private uiSvc: UiService,
    private navParams: NavParams) {
    this.sub = this.platform.backButton.subscribeWithPriority(102, () => {
      this.dismissModal();
    });

    this.notaModal = this.navParams.get('nota');

  }

  ngOnInit() {
    console.log(this.notaModal);
  }

  ionViewDidLeave() {
    console.log(this.notaModal);
    this.sub.unsubscribe();
  }

  dismissModal() {
    console.log(this.notaModal);
    this.modalCtrl.dismiss(this.notaModal);
  }

  async addImageToNota(event: FileList) {
    console.log(event);
    console.log(event.item(0));

    const file = event.item(0);
    console.log(file);
    console.log(file.type);
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    const path = NotaService.GenImageRef(file.name);

    const fileRef = this.storage.ref(NotaService.GenImageRef(file.name));

    const uploadTask = this.dataSvc.addImageToNota(path, file)
      .then(data => {
        console.log(data);
        fileRef.getDownloadURL()
          .subscribe(resp => {
            this.notaModal.imagenes.push(resp);
            console.log(resp);
          }, err => {
            console.log(err);
          })
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        console.log("FINALLY");
      })
  }

  async removeImageFromNota(foto: string) {

    this.dataSvc.removeImageFromNota(foto)
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err);
      })

  }

  openColorPopover(ev, item?) {

    this.uiSvc.showPopover({
      component: ColorselectorPage,
      event: ev,
      componentProps: {
        nota: this.notaModal,
        isArray: false
      }
    })
      .then(() => {

      })
      .catch(error => console.error(error))
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
    this.removeImageFromNota(foto);
    const index: number = this.notaModal.imagenes.indexOf(foto);
    if (index !== -1) {
      this.notaModal.imagenes.splice(index, 1);
    }
  }

}
