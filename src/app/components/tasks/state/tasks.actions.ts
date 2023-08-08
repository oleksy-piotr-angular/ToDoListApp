import { createAction, props } from '@ngrx/store';
import { Task } from './../../../models/task.model';

export const ADD_TASK_ACTION = '[todo tasks page] add task';
export const ADD_TASK_SUCCESS = '[todo tasks page] add task success';
export const UPDATE_TASK_ACTION = '[todo tasks page] update task';
export const DELETE_TASK_ACTION = '[todo tasks page] delete task';
export const LOAD_TASKS = '[todo tasks page] load tasks';
export const LOAD_TASKS_SUCCESS = '[todo tasks page] load tasks success ';

export const addTask = createAction(ADD_TASK_ACTION, props<{ task: Task }>());
export const addTaskSuccess = createAction(
  ADD_TASK_SUCCESS,
  props<{ task: Task }>()
);
export const updateTask = createAction(
  UPDATE_TASK_ACTION,
  props<{ task: Task }>()
);
export const deleteTask = createAction(
  DELETE_TASK_ACTION,
  props<{ id: string }>()
);

export const loadTasks = createAction(LOAD_TASKS);
export const loadTasksSuccess = createAction(
  LOAD_TASKS_SUCCESS,
  props<{ tasks: Task[] }>()
);
