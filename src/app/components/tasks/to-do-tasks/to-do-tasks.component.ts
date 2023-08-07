import { Component, OnInit } from '@angular/core';
import { Task } from './../../../models/task.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTasksToDo } from '../state/tasks.selector';
import { AppState } from 'src/app/store/app.state';
import { deleteTask } from '../state/tasks.actions';

@Component({
  selector: 'app-to-do-tasks',
  templateUrl: './to-do-tasks.component.html',
  styleUrls: ['./to-do-tasks.component.css'],
})
export class ToDoTasksComponent implements OnInit {
  tasks$: Observable<Task[]> = new Observable<[]>();
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasksToDo);
  }

  onDeleteTask(id: number | undefined) {
    if (confirm('This action will remove this Task Permanently. Continue?')) {
      if (id) {
        this.store.dispatch(deleteTask({ id }));
      }
    }
  }
}
