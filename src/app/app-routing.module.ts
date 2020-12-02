import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main/0',
    pathMatch: 'full'
  },
  {
    path: 'main/:noteid',
    loadChildren: () => import('./pages/main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'note',
    loadChildren: () => import('./pages/note/note.module').then( m => m.NotePageModule)
  },
  {
    path: 'colorselector',
    loadChildren: () => import('./modals/colorselector/colorselector.module').then( m => m.ColorselectorPageModule)
  },
  {
    path: 'crearnota',
    loadChildren: () => import('./modals/crearnota/crearnota.module').then( m => m.CrearnotaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
