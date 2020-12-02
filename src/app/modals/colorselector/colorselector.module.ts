import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColorselectorPageRoutingModule } from './colorselector-routing.module';

import { ColorselectorPage } from './colorselector.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColorselectorPageRoutingModule
  ],
  declarations: [ColorselectorPage]
})
export class ColorselectorPageModule {}
