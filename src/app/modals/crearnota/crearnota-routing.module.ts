import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearnotaPage } from './crearnota.page';

const routes: Routes = [
  {
    path: '',
    component: CrearnotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearnotaPageRoutingModule {}
