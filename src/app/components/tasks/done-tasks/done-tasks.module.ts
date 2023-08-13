import { NgModule } from '@angular/core';
import { DoneTasksComponent } from './done-tasks.component';
import { DoneTasksRoutingModule } from './done-tasks-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { TasksEffects } from '../state/tasks.effects';
import { StoreModule } from '@ngrx/store';
import { TASKS_STATE_NAME } from '../state/tasks.selector';
import { tasksReducer } from '../state/tasks.reducer';
import { SharedModule } from '../../../shared/shared.module';
import { SharedComponentsModule } from '../shared-components.module';

@NgModule({
  declarations: [DoneTasksComponent],
  imports: [
    SharedComponentsModule,
    DoneTasksRoutingModule,
    SharedModule,
    EffectsModule.forFeature([TasksEffects]),
    StoreModule.forFeature(TASKS_STATE_NAME, tasksReducer),
  ],
})
export class DoneTasksModule {}
