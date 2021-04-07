import { Routes } from '@angular/router';

export const AppRoutingModule: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/monster/monsters.module').then(m => m.MonstersModule),
  },
];
