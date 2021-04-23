import { Routes } from '@angular/router';
import { UtilitiesComponent } from 'card-builder-framework';

export const AppRoutingModule: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/monster/monsters.module').then(m => m.MonstersModule),
  },
  {
    path: 'utilities', component: UtilitiesComponent
  }
];
