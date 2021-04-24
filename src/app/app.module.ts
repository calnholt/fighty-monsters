import { UtilitiesModule } from './modules/utilities/utilities.module';
import { TtsModule } from './modules/tts/tts.module';
import { MonsterEditorModule } from './modules/monster-editor/monster-editor.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { MonstersModule } from './modules/monster/monsters.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonComponentsModule, MaterialModule } from 'card-builder-framework';
import { ElectronService } from 'ngx-electron';

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
    UtilitiesModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
