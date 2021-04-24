import { ManageBackgroundsComponent } from './manage-backgrounds/manage-backgrounds.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilitiesComponent } from './utilities.component';
import { CommonComponentsModule, MaterialModule } from 'card-builder-framework';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CommonComponentsModule,
  ],
  declarations: [
    UtilitiesComponent,
    ManageBackgroundsComponent
  ]
})
export class UtilitiesModule { }
