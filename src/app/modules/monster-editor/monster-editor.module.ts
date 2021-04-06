import { MonsterEditorComponent } from './monster-editor.component';
import { MonstersModule } from './../monster/monsters.module';
import { NgModule } from '@angular/core';
import { MonsterEditorRoutes } from './monster-editor.routing';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common/common-components.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material-module';

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