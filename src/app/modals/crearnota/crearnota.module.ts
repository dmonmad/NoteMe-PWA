import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearnotaPageRoutingModule } from './crearnota-routing.module';

import { CrearnotaPage } from './crearnota.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearnotaPageRoutingModule
  ],
  declarations: [CrearnotaPage]
})
export class CrearnotaPageModule {}
