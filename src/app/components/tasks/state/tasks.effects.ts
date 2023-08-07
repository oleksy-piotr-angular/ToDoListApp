import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotificationService } from 'src/app/services/notification.service';
import { TasksService } from 'src/app/services/tasks.service';
import { AppState } from 'src/app/store/app.state';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private tasksService: TasksService,
    private notification: NotificationService
  ) {}
}
