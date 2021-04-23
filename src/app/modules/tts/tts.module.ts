import { MonstersModule } from './../monster/monsters.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TtsComponent } from './tts.component';
import { TtsRoutes } from './tts.routing';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from 'card-builder-framework';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TtsRoutes),
    MonstersModule,
    CommonComponentsModule
  ],
  declarations: [
    TtsComponent
  ]
})
export class TtsModule { }
