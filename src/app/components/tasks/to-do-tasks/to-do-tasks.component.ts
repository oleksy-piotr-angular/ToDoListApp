import { Component, OnInit } from '@angular/core';
import { Task } from './../../../models/task.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTasksToDo } from '../state/tasks.selector';
import { AppState } from 'src/app/store/app.state';
import { deleteTask, loadTasks } from '../state/tasks.actions';
import { setLoadingSpinner } from 'src/app/shared/shared.action';

@Component({
  selector: 'app-to-do-tasks',
  templateUrl: './to-do-tasks.component.html',
  styleUrls: ['./to-do-tasks.component.css'],
})
export class ToDoTasksComponent implements OnInit {
  tasks$: Observable<Task[]> = new Observable<[]>();
  constructor(private store: Store<AppState>) {
    this.store.dispatch(setLoadingSpinner({ status: true }));
  }

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasksToDo);
    this.store.dispatch(loadTasks());
  }

  onDeleteTask(id: string | undefined) {
    if (confirm('This action will remove this Task Permanently. Continue?')) {
      if (id) {
        this.store.dispatch(setLoadingSpinner({ status: true }));
        this.store.dispatch(deleteTask({ id }));
      }
    }
  }
}
