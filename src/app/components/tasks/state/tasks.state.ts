import { Task } from 'src/app/models/task.model';

export interface TasksState {
  tasks: Task[];
}

export const initialState: TasksState = {
  tasks: [
    {
      id: '1',
      title: 'Task Title1 Not Done',
      description: 'Task description1',
      isDone: false,
    },
    {
      id: '2',
      title: 'Task Title2 Was Done',
      description: 'Task description2',
      isDone: true,
    },
  ],
};
