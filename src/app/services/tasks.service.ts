import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task.model';
import { Store } from '@ngrx/store';
import { TasksState } from '../components/tasks/state/tasks.state';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient, private store: Store<TasksState>) {}

  getTasks(): Observable<Task[]> {
    return this.http
      .get<Task[]>(
        `https://todolistapp-797f3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`
      )
      .pipe(
        map((data) => {
          const tasks: Task[] = [];
          for (let key in data) {
            tasks.push({ ...data[key], id: key });
          }
          return tasks;
        })
      );
  }

  addTask(task: Task): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      `https://todolistapp-797f3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`,
      task
    );
  }

  updateTask(task: Task): Observable<Task> {
    const taskData = {
      [task.id!]: {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        doneDate: task.doneDate,
        isDone: task.isDone,
      },
    };
    return this.http.patch(
      `https://todolistapp-797f3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`,
      taskData
    );
  }

  deleteTask(id: string) {
    return this.http.delete(
      `https://todolistapp-797f3-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this.http.get(
      `https://todolistapp-797f3-default-rtdb.europe-west1.firebasedatabase.app/tasks/${id}.json`
    );
  }

  changeTaskStatus(task: Task) {
    const taskData = {
      [task.id!]: {
        title: task.title,
        description: task.description,
        startDate: task.startDate,
        doneDate: task.doneDate,
        isDone: task.isDone,
        endDate: task.isDone ? undefined : new Date(),
      },
    };
    return this.http.patch(
      `https://todolistapp-797f3-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`,
      taskData
    );
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'ERROR_TEST':
        return 'Error test..';
      default:
        return 'unknown error.';
    }
  }
}
