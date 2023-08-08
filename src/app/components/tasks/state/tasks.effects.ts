import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/services/notification.service';
import { TasksService } from 'src/app/services/tasks.service';
import { AppState } from 'src/app/store/app.state';
import {
  addTask,
  addTaskSuccess,
  deleteTask,
  deleteTaskSuccess,
  loadTasks,
  loadTasksSuccess,
  updateTask,
  updateTaskSuccess,
} from './tasks.actions';
import { Task } from 'src/app/models/task.model';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private tasksService: TasksService,
    private router: Router
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
            this.router.navigate(['todo-tasks']);
            return addTaskSuccess({ task });
          })
        );
      })
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      switchMap((action) => {
        return this.tasksService.updateTask(action.task).pipe(
          map((data) => {
            this.router.navigate(['todo-tasks']);
            return updateTaskSuccess({ task: action.task });
          })
        );
      })
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      switchMap((action) => {
        return this.tasksService.deleteTask(action.id).pipe(
          map((data) => {
            return deleteTaskSuccess({ id: action.id });
          })
        );
      })
    );
  });
}
