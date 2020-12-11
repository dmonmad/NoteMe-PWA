import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ModalController, PopoverController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  miLoading: any;
  miToast: any;

  constructor(public loading: LoadingController,
    public modal: ModalController,
    public toast: ToastController,
    public alertController: AlertController,
    public popover : PopoverController) { }

  async showLoading(msg?: string) {
    if (this.miLoading) {
      console.log("Ya hay un loading activo");
      return;
    }
    this.miLoading = await this.loading.create({
      message: msg ? msg : ''
    });
    await this.miLoading.present();
  }

  public hideLoad() {
    this.miLoading = null;
    this.loading.dismiss();
  }

  async presentToast(msg: string, dur: number = 2000, col: string = "danger"): Promise<void> {
    if (this.miToast) {
      this.toast.dismiss();
    }

    this.miToast = await this.toast.create({

      message: msg,
      duration: dur,
      color: col,
      translucent: true,
      position: "bottom",
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
          handler: () => {
            this.hideToast();
          }
        }
      ]
    });
    this.miToast.present();
  }

  public hideToast() {
    this.miToast = null;
    this.toast.dismiss();
  }

  async showModal(opts): Promise<any> {
    let obj: any;
    const modal = await this.modal.create(opts);
    modal.present();
    await modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      obj = dataReturned.data;

    });
    return obj;

  }

  async presentAlertMultipleButtons(header: string, message: string, opcionSi: string = 'Si', opcionNo: string = 'No') {
    let choice: boolean;
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: opcionSi,
          handler: () => {
            alert.dismiss(true);
            return true;
          }
        }, {
          text: opcionNo,
          handler: () => {
            alert.dismiss(false);
            return false;
          }
        }
      ],
    });

    await alert.present();
    await alert.onDidDismiss().then(data => {
      choice = data.data;
    });
    return choice;
  }

  async presentAlert(header: string, message: string, opcionSi: string = 'Aceptar') {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: opcionSi,
          handler: () => {
            alert.dismiss(true);
            return true;
          }
        }
      ],
    });
    await alert.present();
    return alert.onDidDismiss();
  }

  async showPopover(opts){
    let obj: any;
    const modal = await this.popover.create(opts);

    modal.present();
    await modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      obj = dataReturned.data;

    });
    return obj;
  }

}

