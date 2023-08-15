import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { TasksState, tasksAdapter } from './tasks.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';
import { Task } from 'src/app/models/task.model';

export const TASKS_STATE_NAME = 'tasks';

const getTasksState = createFeatureSelector<TasksState>(TASKS_STATE_NAME);
export const { selectIds, selectEntities, selectAll, selectTotal } =
  tasksAdapter.getSelectors();

export const getTasks = createSelector(getTasksState, selectAll);
export const getTasksEntities = createSelector(getTasksState, selectEntities);

export const getTasksToDo = createSelector(getTasks, (tasks: Task[]) => {
  return tasks.filter((task) => task.isDone === false);
});

export const getTasksDone = createSelector(getTasks, (tasks: Task[]) => {
  return tasks.filter((task) => task.isDone === true);
});

export const getTaskById = createSelector(
  getTasksEntities,
  getCurrentRoute,
  (tasks, route: RouterStateUrl) => {
    return tasks ? tasks[route.params['id']] : undefined;
  }
);
