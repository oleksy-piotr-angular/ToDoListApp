import { createAction, props } from '@ngrx/store';
import { Task } from './../../../models/task.model';

export const ADD_TASK_ACTION = '[todo task page] add task';
export const UPDATE_TASK_ACTION = '[todo task page] update task';
export const DELETE_TASK_ACTION = '[todo task page] delete task';

export const addTask = createAction(ADD_TASK_ACTION, props<{ task: Task }>());
export const updateTask = createAction(
  UPDATE_TASK_ACTION,
  props<{ task: Task }>()
);
export const deleteTask = createAction(
  DELETE_TASK_ACTION,
  props<{ id: number }>()
);
