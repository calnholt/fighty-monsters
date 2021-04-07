import { TtsModule } from './modules/tts/tts.module';
import { MaterialModule } from './material-module';
import { MonsterEditorModule } from './modules/monster-editor/monster-editor.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MonstersModule } from './modules/monster/monsters.module';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from './modules/common/common-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [	
    AppComponent,
   ],
  imports: [
    RouterModule.forRoot(AppRoutingModule, {
      enableTracing: false
    }),
    BrowserModule,
    MonstersModule,
    MonsterEditorModule,
    CommonModule,
    MaterialModule,
    CommonComponentsModule,
    BrowserAnimationsModule,
    TtsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
