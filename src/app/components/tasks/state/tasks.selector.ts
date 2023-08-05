import { TasksState } from './tasks.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

const getTasksState = createFeatureSelector<TasksState>('tasks');

export const getTasksToDo = createSelector(getTasksState, (state) => {
  return state.tasks.filter((task) => task.isDone === false);
});
