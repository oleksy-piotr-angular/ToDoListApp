import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from 'src/app/AngularMaterial/material-module';
import { LatestOrderPipe } from './pipes/latest-order.pipe';

@NgModule({
  declarations: [LatestOrderPipe],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AppMaterialModule,
    LatestOrderPipe,
  ],
})
export class SharedModule {}
