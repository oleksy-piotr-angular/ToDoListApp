import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TasksState } from '../state/tasks.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getTasks } from '../state/tasks.selector';

@Component({
  selector: 'app-to-do-tasks',
  templateUrl: './to-do-tasks.component.html',
  styleUrls: ['./to-do-tasks.component.css'],
})
export class ToDoTasksComponent implements OnInit {
  tasks$: Observable<Task[]> = new Observable<[]>();
  constructor(private store: Store<{ tasks: TasksState }>) {}

  ngOnInit(): void {
    this.tasks$ = this.store.select(getTasks);
  }
}
