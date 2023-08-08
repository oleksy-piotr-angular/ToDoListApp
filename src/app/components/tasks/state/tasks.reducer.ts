import { createReducer, on } from '@ngrx/store';
import { initialState } from './tasks.state';
import {
  addTaskSuccess,
  deleteTask,
  loadTasksSuccess,
  updateTask,
} from './tasks.actions';

const _tasksReducer = createReducer(
  initialState,
  on(addTaskSuccess, (state, action) => {
    let task = { ...action.task };

    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  }),
  on(updateTask, (state, action) => {
    const updatedTask = state.tasks.map((task) => {
      return task.id === action.task.id ? action.task : task;
    });
    return {
      ...state,
      tasks: updatedTask,
    };
  }),
  on(deleteTask, (state, { id }) => {
    const updatedTask = state.tasks.filter((task) => {
      return task.id !== id;
    });
    return {
      ...state,
      tasks: updatedTask,
    };
  }),
  on(loadTasksSuccess, (state, action) => {
    return {
      ...state,
      tasks: action.tasks,
    };
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
