import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainPageRoutingModule } from './main-routing.module';

import { MainPage } from './main.page';
import { ScrollVanishDirective } from 'src/app/directives/scroll-vanish.directive';
import { LongPressDirective } from 'src/app/directives/long-press.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainPageRoutingModule
  ],
  declarations: [MainPage, ScrollVanishDirective, LongPressDirective]
})
export class MainPageModule {}
