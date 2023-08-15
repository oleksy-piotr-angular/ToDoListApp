import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TasksState } from '../state/tasks.state';
import { setLoadingSpinner } from 'src/app/shared/shared.action';
import { changeTaskStatus } from '../state/tasks.actions';
import { Task } from 'src/app/models/task.model';
import { Subscription } from 'rxjs';
import { getTaskById } from '../state/tasks.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changing-status',
  templateUrl: './changing-status.component.html',
  styleUrls: ['./changing-status.component.css'],
})
export class ChangingStatusComponent implements OnDestroy {
  task: Task | undefined = undefined;

  taskSubscription: Subscription = new Subscription();

  constructor(private store: Store<TasksState>, private router: Router) {
    window.scrollTo(0, 0);
    this.taskSubscription = this.store.select(getTaskById).subscribe((task) => {
      if (task) {
        this.task = task;
      }
    });
  }

  onCompletedTask() {
    const task: Task = {
      id: this.task!.id,
      title: this.task!.title,
      description: this.task!.description,
      startDate: this.task!.startDate,
      isDone: true,
      doneDate: this.task!.startDate ? new Date() : undefined,
    };
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(changeTaskStatus({ task }));
    this.router.navigate(['todo-tasks']);
  }

  onRestoreCompleted() {
    const task: Task = {
      id: this.task!.id,
      title: this.task!.title,
      description: this.task!.description,
      startDate: this.task!.startDate,
      isDone: false,
      doneDate: undefined,
    };
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(changeTaskStatus({ task }));
    this.router.navigate(['done-tasks']);
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
