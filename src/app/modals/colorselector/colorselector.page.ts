import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { Nota } from 'src/app/models/Nota';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-colorselector',
  templateUrl: './colorselector.page.html',
  styleUrls: ['./colorselector.page.scss'],
})
export class ColorselectorPage implements OnInit {

  colors = ["#fff", "#f28b82", "#cbf0f8", "#a7ffeb", "#fff475", "#fdcfe8"]

  notaNuevoColor: Nota;
  notas: Nota[];

  constructor(private popCtrl: PopoverController,
    private navParams: NavParams,
    private dataSvc: DataService) {
    let isArray: boolean = this.navParams.get('isArray')
    let param = this.navParams.get('nota');

    if (isArray) {
      console.log("isarray true");
      this.notas = param;
    } else {
      console.log("isarray false");
      this.notaNuevoColor = param;
    }
    console.log(this.notaNuevoColor);
    console.log(this.notas);
  }

  ngOnInit() {
  }

  changeColor(color: string) {

    if (this.notaNuevoColor) {
      this.notaNuevoColor.color = color;
      this.dataSvc.editNote(this.notaNuevoColor);
    } else if (this.notas && this.notas.length > 0) {

      for (let i = 0; i < this.notas.length; i++) {
        this.notas[i].color = color;
        this.dataSvc.editNote(this.notas[i]);
      }

    }
    this.popCtrl.dismiss();

  }

}
