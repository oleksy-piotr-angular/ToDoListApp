import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/services/notification.service';
import { TasksService } from 'src/app/services/tasks.service';
import { AppState } from 'src/app/store/app.state';
import {
  addTask,
  addTaskSuccess,
  loadTasks,
  loadTasksSuccess,
} from './tasks.actions';
import { Task } from 'src/app/models/task.model';
import { map, mergeMap } from 'rxjs/operators';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private tasksService: TasksService,
    private notification: NotificationService
  ) {}

  loadTasks = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      mergeMap((action) => {
        return this.tasksService.getTasks().pipe(
          map((tasks) => {
            return loadTasksSuccess({ tasks });
          })
        );
      })
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      mergeMap((action: { task: Task }) => {
        return this.tasksService.addTask(action.task).pipe(
          map((data) => {
            const task = { ...action.task, id: data.name };
            return addTaskSuccess({ task });
          })
        );
      })
    );
  });
}
