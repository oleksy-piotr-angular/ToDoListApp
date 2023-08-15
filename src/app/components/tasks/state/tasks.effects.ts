import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
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
  catchError,
  filter,
  map,
  mergeMap,
  repeat,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  setLoadingSpinner,
  setErrorMessage,
} from 'src/app/shared/shared.action';
import { RouterNavigatedAction, ROUTER_NAVIGATION } from '@ngrx/router-store';

import { getRouterState } from 'src/app/store/router/router.selector';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/services/notification.service';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private tasksService: TasksService,
    private router: Router,
    private notification: NotificationService
  ) {}

  loadTasks = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadTasks),
      mergeMap((action) => {
        return this.tasksService.getTasks().pipe(
          map((tasks) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            this.notification.showSuccess(
              'The Tasks have been Loaded from DB',
              'SUCCESS'
            );
            return loadTasksSuccess({ tasks });
          })
        );
      }),
      catchError((errResp: HttpErrorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        const errorMessage = this.tasksService.getErrorMessage(
          errResp.statusText
        );
        console.log(errResp.statusText);

        return of(setErrorMessage({ message: errorMessage }));
      }),
      repeat()
    );
  });

  addTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTask),
      mergeMap((action: { task: Task }) => {
        return this.tasksService.addTask(action.task).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const task = { ...action.task, id: data.name };
            this.router.navigate(['todo-tasks']);
            this.notification.showSuccess(
              'The Task has been Created',
              'SUCCESS'
            );
            return addTaskSuccess({ task });
          })
        );
      }),
      catchError((errResp: HttpErrorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        const errorMessage = this.tasksService.getErrorMessage(
          errResp.statusText
        );
        console.log(errResp.statusText);

        this.router.navigate(['todo-tasks']);
        return of(setErrorMessage({ message: errorMessage }));
      }),
      repeat()
    );
  });

  updateTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateTask),
      switchMap((action) => {
        return this.tasksService.updateTask(action.task).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            this.notification.showSuccess(
              'The Task has been Updated',
              'SUCCESS'
            );
            return updateTaskSuccess({ task: action.task });
          })
        );
      }),
      catchError((errResp: HttpErrorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        const errorMessage = this.tasksService.getErrorMessage(
          errResp.statusText
        );
        console.log(errResp.statusText);

        return of(setErrorMessage({ message: errorMessage }));
      }),
      repeat()
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteTask),
      switchMap((action) => {
        return this.tasksService.deleteTask(action.id).pipe(
          map(() => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            this.notification.showSuccess(
              'The Task has been Deleted',
              'SUCCESS'
            );
            return deleteTaskSuccess({ id: action.id });
          })
        );
      }),
      catchError((errResp: HttpErrorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        const errorMessage = this.tasksService.getErrorMessage(
          errResp.statusText
        );
        console.log(errResp.statusText);
        return of(setErrorMessage({ message: errorMessage }));
      }),
      repeat()
    );
  });

  changeTaskStatus$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(changeTaskStatus),
      switchMap((action) => {
        return this.tasksService.changeTaskStatus(action.task).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            this.notification.showSuccess(
              'The Task Status has been Changed',
              'SUCCESS'
            );
            return changeTaskStatusSuccess({ task: action.task });
          })
        );
      }),
      catchError((errResp: HttpErrorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        const errorMessage = this.tasksService.getErrorMessage(
          errResp.statusText
        );
        console.log(errResp.statusText);
        return of(setErrorMessage({ message: errorMessage }));
      }),
      repeat()
    );
  });

  getSingleTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        if (r.payload.routerState.url.startsWith('/done-tasks/details')) {
          return r.payload.routerState.url.startsWith('/done-tasks/details');
        }

        return r.payload.routerState.url.startsWith('/todo-tasks/details');
      }),
      withLatestFrom(this.store.select(getRouterState), (action, router) => {
        return router.state.params['id'];
      }),
      switchMap((id) => {
        return this.tasksService.getTaskById(id).pipe(
          map((task) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));
            const taskData = [{ ...task, id }];
            return loadTasksSuccess({ tasks: taskData });
          })
        );
      }),
      catchError((errResp: HttpErrorResponse) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        const errorMessage = this.tasksService.getErrorMessage(
          errResp.statusText
        );
        console.log(errResp.statusText);
        return of(setErrorMessage({ message: errorMessage }));
      }),
      repeat()
    );
  });
}
