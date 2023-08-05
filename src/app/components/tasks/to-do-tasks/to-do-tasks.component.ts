import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksState } from '../state/tasks.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTasksToDo } from '../state/tasks.selector';
import { AppState } from 'src/app/store/app.state';

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

  onEdit() {}
}
