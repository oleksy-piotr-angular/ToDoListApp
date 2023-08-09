import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoneTasksComponent } from './done-tasks.component';

import { AppMaterialModule } from 'src/app/AngularMaterial/material-module';
import { DoneTasksRoutingModule } from './done-tasks-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from '../state/tasks.effects';
import { StoreModule } from '@ngrx/store';
import { TASKS_STATE_NAME } from '../state/tasks.selector';
import { tasksReducer } from '../state/tasks.reducer';
import { EditTaskComponent } from './edit-task/edit-task.component';

@NgModule({
  declarations: [DoneTasksComponent, EditTaskComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    DoneTasksRoutingModule,
    AppMaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([TasksEffects]),
    StoreModule.forFeature(TASKS_STATE_NAME, tasksReducer),
  ],
})
export class DoneTasksModule {}
