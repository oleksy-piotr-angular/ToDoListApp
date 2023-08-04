import { tasksReducer } from '../components/tasks/state/tasks.reducer';
import { TasksState } from '../components/tasks/state/tasks.state';

export interface AppState {
  tasks: TasksState;
}

export const appReducer = {
  tasks: tasksReducer,
};
