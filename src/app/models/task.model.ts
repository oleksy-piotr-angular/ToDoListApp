export interface Task {
  id?: number;
  title?: string;
  description?: string;
  startDate?: Date;
  doneDate?: Date;
  isDone?: false | true;
}
