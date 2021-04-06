import { MonsterEditorComponent } from './monster-editor.component';
import { Routes } from '@angular/router';

export const MonsterEditorRoutes: Routes = [
  {
    path: 'editor/:name', component: MonsterEditorComponent
  },
];