import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarnotaPage } from './editarnota.page';

const routes: Routes = [
  {
    path: '',
    component: EditarnotaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarnotaPageRoutingModule {}
