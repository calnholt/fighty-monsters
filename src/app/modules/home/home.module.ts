import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home.routing';
import { MonstersModule } from '../monster/monsters.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MonstersModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
