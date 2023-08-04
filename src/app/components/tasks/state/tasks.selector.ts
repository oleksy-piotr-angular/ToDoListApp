import { TasksState } from './tasks.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getTasksState = createFeatureSelector<TasksState>('tasks');

export const getTasks = createSelector(getTasksState, (state) => {
  return state.tasks;
});
