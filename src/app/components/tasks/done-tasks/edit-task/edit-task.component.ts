import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Task } from './../../../../models/task.model';
import { AppState } from 'src/app/store/app.state';
import { getTaskById } from '../../state/tasks.selector';
import { Subscription } from 'rxjs';
import { updateTask } from '../../state/tasks.actions';
import { setLoadingSpinner } from 'src/app/shared/shared.action';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnDestroy, OnInit {
  task: Task | undefined = undefined;

  taskForm!: FormGroup<{
    title: FormControl<string | undefined>;
    description: FormControl<string | undefined>;
  }>;

  taskSubscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.taskSubscription = this.store.select(getTaskById).subscribe((task) => {
      if (task) {
        this.task = task;
        this.taskForm.patchValue({
          title: task?.title,
          description: task?.description,
        });
      }
    });
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: this.fb.nonNullable.control<string | undefined>(
        undefined,
        Validators.compose([Validators.required, Validators.minLength(5)])
      ),
      description: this.fb.nonNullable.control<string | undefined>(
        undefined,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
    });
  }

  ngOnDestroy(): void {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }

  get getTaskFormControl(): {
    title: FormControl<string | undefined>;
    description: FormControl<string | undefined>;
  } {
    return this.taskForm.controls;
  }

  get getTaskFormIsValid(): boolean {
    return this.taskForm.valid;
  }

  get getTitleIsNotValid(): boolean {
    return (
      this.getTaskFormControl['title'].touched &&
      !this.getTaskFormControl['title'].valid
    );
  }

  get getDescriptionIsNotValid(): boolean {
    return (
      this.getTaskFormControl['description'].touched &&
      !this.getTaskFormControl['description'].valid
    );
  }

  showTitleErrors(): string | void {
    const titleForm = this.getTaskFormControl['title'];
    if (this.getTitleIsNotValid) {
      if (titleForm.getError('required')) {
        return 'Title is required';
      }
      if (titleForm.getError('minlength')) {
        return 'Title should be minimum 5 characters';
      }
    }
  }
  showDescriptionErrors(): string | void {
    const descriptionForm = this.getTaskFormControl['description'];
    if (this.getDescriptionIsNotValid) {
      if (descriptionForm.getError('required')) {
        return 'Description is required';
      }
      if (descriptionForm.getError('minlength')) {
        return 'Description should be minimum 10 characters';
      }
    }
  }

  onEditTask() {
    if (this.taskForm.valid) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      const title = this.taskForm.value.title;
      const description = this.taskForm.value.description;

      const task: Task = {
        id: this.task!.id,
        title,
        description,
        startDate: this.task!.startDate,
        isDone: true,
        doneDate: this.task!.startDate ? new Date() : undefined,
      };

      this.store.dispatch(updateTask({ task }));
      this.router.navigate(['done-tasks']);
    }
  }
}
