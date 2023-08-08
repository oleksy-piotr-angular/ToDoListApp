import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

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

  getErrorMessage(message: string) {
    switch (message) {
      case 'ERROR_TEST':
        return 'Error test..';
      default:
        return 'unknown error.';
    }
  }
}
