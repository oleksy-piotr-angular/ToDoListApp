import { createReducer, on } from '@ngrx/store';
import { initialState } from './tasks.state';
import { addTask } from './tasks.actions';

const _tasksReducer = createReducer(
  initialState,
  on(addTask, (state, action) => {
    let task = { ...action.task };

    task.id = (state.tasks.length + 1).toString();
    return {
      ...state,
      tasks: [...state.tasks, task],
    };
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
