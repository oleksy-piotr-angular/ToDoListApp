import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { TasksState } from './tasks.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';

export const TASKS_STATE_NAME = 'tasks';

const getTasksState = createFeatureSelector<TasksState>(TASKS_STATE_NAME);

export const getTasks = createSelector(getTasksState, (state) => {
  return state.tasks;
});

export const getTasksToDo = createSelector(getTasksState, (state) => {
  return state.tasks.filter((task) => task.isDone === false);
});

export const getTasksDone = createSelector(getTasksState, (state) => {
  return state.tasks.filter((task) => task.isDone === true);
});

export const getTaskById = createSelector(
  getTasks,
  getCurrentRoute,
  (tasks, route: RouterStateUrl) => {
    return tasks
      ? tasks.find((task) => task.id === route.params['id'])
      : undefined;
  }
);
