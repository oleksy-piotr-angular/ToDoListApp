import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoTasksComponent } from './to-do-tasks.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { ToDoTasksRoutingModule } from './to-do-tasks-routing.module';
import { AppMaterialModule } from 'src/app/AngularMaterial/material-module';

@NgModule({
  declarations: [EditTaskComponent, AddTaskComponent, ToDoTasksComponent],
  imports: [
    AppMaterialModule,
    CommonModule,
    ToDoTasksRoutingModule,
    ReactiveFormsModule,
  ],
})
export class ToDoTasksModule {}
