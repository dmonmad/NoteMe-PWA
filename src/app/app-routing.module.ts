import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'colorselector',
    loadChildren: () => import('./modals/colorselector/colorselector.module').then( m => m.ColorselectorPageModule)
  },
  {
    path: 'crearnota',
    loadChildren: () => import('./modals/crearnota/crearnota.module').then( m => m.CrearnotaPageModule)
  },
  {
    path: 'editarnota',
    loadChildren: () => import('./modals/editarnota/editarnota.module').then( m => m.EditarnotaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
