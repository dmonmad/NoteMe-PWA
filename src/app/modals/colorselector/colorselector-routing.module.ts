import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorselectorPage } from './colorselector.page';

const routes: Routes = [
  {
    path: '',
    component: ColorselectorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorselectorPageRoutingModule {}
