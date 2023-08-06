import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoneTasksComponent } from './done-tasks.component';

import { AppMaterialModule } from 'src/app/AngularMaterial/material-module';
import { DoneTasksRoutingModule } from './done-tasks-routing.module';

@NgModule({
  declarations: [DoneTasksComponent],
  imports: [CommonModule, AppMaterialModule, DoneTasksRoutingModule],
})
export class DoneTasksModule {}
