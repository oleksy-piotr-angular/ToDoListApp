import { createReducer, on } from '@ngrx/store';
import { initialState, tasksAdapter } from './tasks.state';
import {
  addTaskSuccess,
  deleteTaskSuccess,
  loadTasksSuccess,
  updateTaskSuccess,
  changeTaskStatusSuccess,
} from './tasks.actions';

const _tasksReducer = createReducer(
  initialState,
  on(addTaskSuccess, (state, action) => {
    return tasksAdapter.addOne(action.task, state);
  }),
  on(updateTaskSuccess, (state, action) => {
    return tasksAdapter.updateOne(action.task, state);
  }),
  on(deleteTaskSuccess, (state, { id }) => {
    return tasksAdapter.removeOne(id, state);
  }),
  on(loadTasksSuccess, (state, action) => {
    return tasksAdapter.setAll(action.tasks, state);
  }),
  on(changeTaskStatusSuccess, (state, action) => {
    return tasksAdapter.updateOne(action.task, state);
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
