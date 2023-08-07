import { Task } from './../../../models/task.model';
import { TasksState } from './tasks.state';
import { createFeatureSelector, createSelector, props } from '@ngrx/store';

export const TASKS_STATE_NAME = 'tasks';

const getTasksState = createFeatureSelector<TasksState>(TASKS_STATE_NAME);

export const getTasksToDo = createSelector(getTasksState, (state) => {
  return state.tasks.filter((task) => task.isDone === false);
});

export const getTaskById = createSelector(
  getTasksState,
  (state: { tasks: Task[] }, props: { id: string }) => {
    const id = parseInt(props.id);
    return state.tasks.find((task) => task.id === id);
  }
);
