import { MonstersModule } from './../monster/monsters.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TtsComponent } from './tts.component';
import { TtsRoutes } from './tts.routing';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TtsRoutes),
    MonstersModule
  ],
  declarations: [
    TtsComponent
  ]
})
export class TtsModule { }
