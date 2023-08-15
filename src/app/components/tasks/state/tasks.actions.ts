import { createAction, props } from '@ngrx/store';
import { Task } from './../../../models/task.model';
import { Update } from '@ngrx/entity';

export const ADD_TASK_ACTION = '[todo tasks page] add task';
export const ADD_TASK_SUCCESS = '[todo tasks page] add task success';
export const UPDATE_TASK_ACTION = '[tasks page] update task';
export const UPDATE_TASK_SUCCESS = '[tasks page] update task success';
export const DELETE_TASK_ACTION = '[tasks page] delete task';
export const DELETE_TASK_SUCCESS = '[tasks page] delete task success';
export const LOAD_TASKS = '[tasks page] load tasks';
export const LOAD_TASKS_SUCCESS = '[tasks page] load tasks success ';
export const TASK_STATUS_CHANGE = '[tasks page] change task status';
export const TASK_STATUS_SUCCESS = '[tasks page] change task status success';

export const addTask = createAction(ADD_TASK_ACTION, props<{ task: Task }>());
export const addTaskSuccess = createAction(
  ADD_TASK_SUCCESS,
  props<{ task: Task }>()
);
export const updateTask = createAction(
  UPDATE_TASK_ACTION,
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
  UPDATE_TASK_SUCCESS,
  props<{ task: Update<Task> }>()
);

export const deleteTask = createAction(
  DELETE_TASK_ACTION,
  props<{ id: string }>()
);

export const deleteTaskSuccess = createAction(
  DELETE_TASK_SUCCESS,
  props<{ id: string }>()
);

export const changeTaskStatus = createAction(
  TASK_STATUS_CHANGE,
  props<{ task: Task }>()
);

export const changeTaskStatusSuccess = createAction(
  TASK_STATUS_SUCCESS,
  props<{ task: Update<Task> }>()
);

export const loadTasks = createAction(LOAD_TASKS);
export const loadTasksSuccess = createAction(
  LOAD_TASKS_SUCCESS,
  props<{ tasks: Task[] }>()
);
