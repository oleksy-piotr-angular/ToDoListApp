import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDoTasksComponent } from './to-do-tasks.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AddTaskComponent } from './add-task/add-task.component';
import { ToDoTasksRoutingModule } from './to-do-tasks-routing.module';
import { AppMaterialModule } from 'src/app/AngularMaterial/material-module';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from '../state/tasks.reducer';
import { TASKS_STATE_NAME } from '../state/tasks.selector';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from '../state/tasks.effects';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EditTaskComponent, AddTaskComponent, ToDoTasksComponent],
  imports: [
    AppMaterialModule,
    CommonModule,
    ToDoTasksRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([TasksEffects]),
    StoreModule.forFeature(TASKS_STATE_NAME, tasksReducer),
  ],
})
export class ToDoTasksModule {}
