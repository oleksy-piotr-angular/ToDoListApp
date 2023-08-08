export interface Task {
  id?: string;
  title?: string;
  description?: string;
  startDate?: Date;
  doneDate?: Date;
  isDone?: false | true;
}
