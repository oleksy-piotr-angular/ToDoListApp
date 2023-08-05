import { createReducer, on } from '@ngrx/store';
import { initialState } from './tasks.state';
import { addTask, updateTask } from './tasks.actions';

const _tasksReducer = createReducer(
  initialState,
  on(addTask, (state, action) => {
    let task = { ...action.task };

    task.id = state.tasks.length + 1;
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
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
