import { createReducer, on } from '@ngrx/store';
import { initialState } from './tasks.state';
import { addTask } from './tasks.actions';

const _tasksReducer = createReducer(
  initialState,
  on(addTask, (state) => {
    return {
      ...state,
      newState: state,
    };
  })
);

export function tasksReducer(state: any, action: any) {
  return _tasksReducer(state, action);
}
