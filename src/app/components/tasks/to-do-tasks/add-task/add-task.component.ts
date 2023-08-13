import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Task } from './../../../../models/task.model';
import { AppState } from 'src/app/store/app.state';
import { Router } from '@angular/router';
import { addTask } from '../../state/tasks.actions';
import { setLoadingSpinner } from 'src/app/shared/shared.action';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent {
  addDate: boolean;
  taskForm: FormGroup<{
    title: FormControl<string | undefined>;
    description: FormControl<string | undefined>;
  }>;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.addDate = true;
    this.taskForm = this.fb.group({
      title: this.fb.nonNullable.control<string | undefined>(
        undefined,
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(40),
        ])
      ),
      description: this.fb.nonNullable.control<string | undefined>(
        undefined,
        Validators.compose([Validators.required, Validators.minLength(10)])
      ),
    });
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
      if (titleForm.getError('maxlength')) {
        return 'Title should be minimum 40 characters';
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

  onAddTask() {
    if (this.taskForm.valid) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      const task: Task = {
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        isDone: false,
        startDate: this.addDate ? new Date() : undefined,
      };
      this.store.dispatch(addTask({ task }));
    }
  }
}
