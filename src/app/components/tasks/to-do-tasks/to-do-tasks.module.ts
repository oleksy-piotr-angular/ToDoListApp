import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoTasksRoutingModule } from './to-do-tasks-routing.module';
import { ToDoTasksComponent } from './to-do-tasks.component';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ToDoTasksComponent,
  },
];

@NgModule({
  declarations: [ToDoTasksComponent],
  imports: [CommonModule, ToDoTasksRoutingModule],
})
export class ToDoTasksModule {}
