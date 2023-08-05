import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/models/task.model';

export const ADD_TASK_ACTION = '[task page] add task';

export const addTask = createAction(ADD_TASK_ACTION, props<{ task: Task }>());
