import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { setLoadingSpinner } from 'src/app/shared/shared.action';
import { AppState } from 'src/app/store/app.state';
import { deleteTask, loadTasks } from '../state/tasks.actions';
import { getTasksDone } from '../state/tasks.selector';

@Component({
  selector: 'app-done-tasks',
  templateUrl: './done-tasks.component.html',
  styleUrls: ['./done-tasks.component.css'],
})
export class DoneTasksComponent {
  tasks$: Observable<Task[]> = new Observable<[]>();
  constructor(private store: Store<AppState>) {
    this.store.dispatch(setLoadingSpinner({ status: true }));
  }

  ngOnInit(): void {
    this.store.dispatch(loadTasks());
    this.tasks$ = this.store.select(getTasksDone);
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
