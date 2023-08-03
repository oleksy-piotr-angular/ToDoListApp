export interface TaskState {
  title: string;
  description: string;
  startDate?: Date;
  doneDate?: Date;
  isDone: boolean;
}
