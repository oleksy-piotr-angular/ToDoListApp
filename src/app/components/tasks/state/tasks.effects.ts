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
  changeTaskStatus,
  changeTaskStatusSuccess,
} from './tasks.actions';
import { Task } from 'src/app/models/task.model';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { setLoadingSpinner } from 'src/app/shared/shared.action';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';

import { getRouterState } from 'src/app/store/router/router.selector';

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
            this.store.dispatch(setLoadingSpinner({ status: false }));
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
            this.store.dispatch(setLoadingSpinner({ status: false }));
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
            this.store.dispatch(setLoadingSpinner({ status: false }));

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
          map(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return deleteTaskSuccess({ id: action.id });
          })
        );
      })
    );
  });

  changeTaskStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeTaskStatus),
      switchMap((action) => {
        return this.tasksService.changeTaskStatus(action.task).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return changeTaskStatusSuccess({ task: action.task });
          })
        );
      })
    );
  });

  getSingleTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('/todo-tasks/details');
      }),
      withLatestFrom(this.store.select(getRouterState), (action, router) => {
        return router.state.params['id'];
      }),
      switchMap((id) => {
        return this.tasksService.getTaskById(id).pipe(
          map((task) => {
            const taskData = [{ ...task, id }];
            return loadTasksSuccess({ tasks: taskData });
          })
        );
      })
    );
  });
}
