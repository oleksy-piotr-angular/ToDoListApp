import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoneTasksRoutingModule } from './done-tasks-routing.module';
import { DoneTasksComponent } from './done-tasks.component';

@NgModule({
  declarations: [DoneTasksComponent],
  imports: [CommonModule, DoneTasksRoutingModule],
})
export class DoneTasksModule {}
