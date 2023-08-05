import { Task } from 'src/app/models/task.model';
import { TasksState } from './tasks.state';
import { createFeatureSelector, createSelector, props } from '@ngrx/store';

const getTasksState = createFeatureSelector<TasksState>('tasks');

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
