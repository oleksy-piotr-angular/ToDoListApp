import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { AppState } from 'src/app/store/app.state';
import { getTaskById } from '../state/tasks.selector';

@Component({
  selector: 'app-single-task',
  templateUrl: './single-task.component.html',
  styleUrls: ['./single-task.component.css'],
})
export class SingleTaskComponent implements OnInit {
  task!: Observable<Task | undefined>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.task = this.store.select(getTaskById);
  }
}
