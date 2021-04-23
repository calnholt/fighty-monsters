import { MonsterEditorComponent } from './monster-editor.component';
import { MonstersModule } from './../monster/monsters.module';
import { NgModule } from '@angular/core';
import { MonsterEditorRoutes } from './monster-editor.routing';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonComponentsModule, MaterialModule } from 'card-builder-framework';

@NgModule({
    imports: [
      RouterModule.forChild(MonsterEditorRoutes), 
      CommonModule,
      MaterialModule,
      CommonComponentsModule,
      FormsModule,
      ReactiveFormsModule,
      MonstersModule
    ],
    declarations: [
      MonsterEditorComponent
    ],
    exports: [
      MonsterEditorComponent
    ]
  })
  export class MonsterEditorModule { }