import { NgModule } from '@angular/core';

import { ToDoTasksComponent } from './to-do-tasks.component';

import { AddTaskComponent } from './add-task/add-task.component';
import { ToDoTasksRoutingModule } from './to-do-tasks-routing.module';
import { StoreModule } from '@ngrx/store';
import { tasksReducer } from '../state/tasks.reducer';
import { TASKS_STATE_NAME } from '../state/tasks.selector';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from '../state/tasks.effects';
import { SharedModule } from '../../../shared/shared.module';
import { SharedComponentsModule } from '../shared-components.module';

@NgModule({
  declarations: [AddTaskComponent, ToDoTasksComponent],
  imports: [
    SharedModule,
    SharedComponentsModule,
    ToDoTasksRoutingModule,
    EffectsModule.forFeature([TasksEffects]),
    StoreModule.forFeature(TASKS_STATE_NAME, tasksReducer),
  ],
})
export class ToDoTasksModule {}
