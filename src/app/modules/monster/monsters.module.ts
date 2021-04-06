import { MonsterComponent } from './monster/monster.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonstersComponent } from './monsters.component';
import { MonsterRoutes } from './monsters.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MonsterRoutes),
  ],
  declarations: [
    MonstersComponent,
    MonsterComponent,
  ],
  exports: [
    MonstersComponent,
    MonsterComponent,
  ]
})
export class MonstersModule { }
